from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.sites.shortcuts import get_current_site
from django.core import mail
from django.core.mail import EmailMessage
from django.db import IntegrityError, transaction
from django.shortcuts import redirect
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from smtplib import SMTPException

from house.models import House, Place, UserHouse
from house.serializers import HouseSerializer, PlaceSerializer, SimpleHouseSerializer, UserOfHouseSerializer
from necessity.models import Necessity, NecessityPlace, NecessityLog
from necessity.serializers import NecessitySerializer, NecessityLogSerializer, NecessityOfPlaceWriteSerializer
from house.text import house_invite_message
from user.token import user_activation_token


class HouseViewSet(viewsets.GenericViewSet):
    queryset = House.objects.filter(is_hidden=False)
    serializer_class = HouseSerializer
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        # 집에 join하는 경우에는 소속되지 않은 집도 조회되어야 함
        if self.action == 'user' and self.request.method == 'POST':
            return self.queryset
        return self.queryset.filter(user_houses__user=self.request.user)

    def get_serializer_class(self, *args, **kwargs):
        if self.action == 'place':
            return PlaceSerializer
        if self.action in ['list', 'destroy']:
            return SimpleHouseSerializer
        if self.action == 'user' and self.request.method in ['GET', 'DELETE']:
            return UserOfHouseSerializer
        if self.action == 'necessity_log':
            return NecessityLogSerializer
        return self.serializer_class

    def create(self, request):
        user = request.user

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        with transaction.atomic():
            house = serializer.save()
            UserHouse.objects.create(user=user, house=house, is_leader=True)

        return Response(self.get_serializer(house).data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        """자신이 소속된 집을 열람하는 API"""
        house = self.get_object()
        return Response(self.get_serializer(house).data)

    def list(self, request):
        """자신이 소속된 집들을 열람하는 API"""
        houses = self.get_queryset()
        return Response(self.get_serializer(houses, many=True).data)

    def update(self, request, pk=None):
        """leader가 집 정보를 수정하는 API"""
        user = request.user
        house = self.get_object()

        user_house = user.user_houses.filter(house=house).last()
        if not user_house.is_leader:
            return Response({'error': "leader만 집을 수정할 수 있습니다."}, status=status.HTTP_403_FORBIDDEN)

        # 현재 name과 같은 경우 serializer의 validate_name에서 error가 발생하지 않도록 함
        data = request.data.copy()
        if house.name == data.get('name'):
            data.pop('name')

        serializer = self.get_serializer(house, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.update(house, serializer.validated_data)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        """leader가 집을 삭제하는 API"""
        user = request.user
        house = self.get_object()

        user_house = user.user_houses.filter(house=house).last()
        if not user_house.is_leader:
            return Response({'error': "leader만 집을 삭제할 수 있습니다."}, status=status.HTTP_403_FORBIDDEN)

        house.is_hidden = True
        house.save()

        houses = self.get_queryset()
        return Response(self.get_serializer(houses, many=True).data)

    # /api/v1/house/{house_id}/invitation/
    @action(detail=True, methods=['POST'])
    def invitation(self, request, pk=None):
        """leader가 새로운 member를 초대하는 API - email 발송"""
        user = request.user
        house = self.get_object()

        user_house = user.user_houses.filter(house=house).last()
        if not user_house.is_leader:
            return Response({'error': "leader만 초대장을 전송할 수 있습니다."}, status=status.HTTP_403_FORBIDDEN)

        email = request.data.get('email')
        if not email:
            return Response({'error': "Email 주소를 입력해주세요."}, status=status.HTTP_400_BAD_REQUEST)

        invited_user = User.objects.filter(email=email).last()
        if not invited_user:
            return Response({'error': "등록되지 않은 Email입니다."}, status=status.HTTP_404_NOT_FOUND)
        elif not invited_user.is_active:
            return Response({'error': "초대장을 받을 유저가 우선 회원 인증을 완료해야 합니다."}, status=status.HTTP_401_UNAUTHORIZED)

        if UserHouse.objects.filter(house=house, user=invited_user).exists():
            return Response({'error': "이미 House에 등록된 멤버입니다."}, status=status.HTTP_409_CONFLICT)

        with mail.get_connection() as connection:
            subject = "오렌지농장 House에 초대합니다."
            domain = get_current_site(request).domain
            user_uidb64 = urlsafe_base64_encode(force_bytes(invited_user.id))
            house_uidb64 = urlsafe_base64_encode(force_bytes(house.id))
            token = user_activation_token.make_token(invited_user)
            message = house_invite_message(domain, house_uidb64, user_uidb64, token, user, house, invited_user)
            try:
                EmailMessage(subject, message, to=[email], connection=connection).send()
            except SMTPException:
                return Response({'error': "Email 발송에 문제가 있습니다."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
            return Response({'message': "입력하신 이메일로 초대장이 전송되었습니다."})

    @action(detail=True, methods=['GET', 'DELETE'])
    def user(self, request, pk=None):
        house = self.get_object()
        if self.request.method == 'GET':
            return self._get_members(house)
        else:
            return self._leave_house(house)

    def _get_members(self, house):
        members = house.user_houses.all()
        return Response(self.get_serializer(members, many=True).data)

    def _leave_house(self, house):
        user = self.request.user
        user_house = user.user_houses.filter(house=house).last()
        if user_house.is_leader:
            return Response({'error': "leader이므로 집을 떠날 수 없습니다. leader를 다른 유저에게 양도한 뒤 다시 시도해 주세요"},
                            status=status.HTTP_400_BAD_REQUEST)
        user_house.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['POST', 'GET'])
    def place(self, request, pk=None):
        house = self.get_object()
        user = self.request.user
        user_house = user.user_houses.filter(house=house).last()
        if not user_house:
            return Response({'error': "소속되어 있지 않은 집입니다."}, status=status.HTTP_403_FORBIDDEN)

        if self.request.method == 'POST':
            return self._create_place(house)
        else:
            return self._get_places(house)

    def _create_place(self, house):
        name = self.request.data.get('name')
        if not name:
            return Response({'error': "name은 필수 항목입니다."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            place = Place.objects.create(house=house, name=name)
        except IntegrityError:
            return Response({'error': "같은 name의 공간을 이 집에가지고 있습니다."}, status=status.HTTP_409_CONFLICT)
        return Response(self.get_serializer(place).data, status=status.HTTP_201_CREATED)

    def _get_places(self, house):
        return Response(self.get_serializer(house.places, many=True).data)

    @action(detail=True, methods=['GET'])
    def necessity_log(self, request, pk=None):
        log_order = self.request.query_params.get('necessity_order')
        house = self.get_object()
        user_house = request.user.user_houses.filter(house=house).last()
        if not user_house:
            return Response({'error': "소속되어 있지 않은 집입니다."}, status=status.HTTP_403_FORBIDDEN)

        queryset = NecessityLog.objects.filter(house=house).select_related('necessity_place')
        if log_order == 'earliest':
            logs = queryset.order_by('created_at')
        else:
            logs = queryset.order_by('-created_at')
        return Response(self.get_serializer(logs, many=True).data)


class PlaceViewSet(viewsets.GenericViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
        return self.queryset.filter(house__user_houses__user=self.request.user)

    def retrieve(self, request, pk=None):
        place = self.get_object()
        return Response(self.get_serializer(place).data)

    @action(detail=True, methods=['POST'])
    def necessity(self, request, pk=None):
        place = self.get_object()

        user = request.user
        data = request.data

        necessity_id = data.get('necessity_id')
        name = data.get('name')
        if not (bool(necessity_id) ^ bool(name)):
            return Response({'error': "necessity_id 또는 name이 요청에 포함되어야 합니다."}, status=status.HTTP_400_BAD_REQUEST)
        option = data.get('option', '')
        description = data.get('description', '')
        price = data.get('price')
        count = data.get('count')

        if necessity_id:
            # GET /api/v1/necessity/ 등을 이용해 frontend가 이미 존재하는 Necessity들을 제시하고, 유저가 그것을 택했을 때 해당 id를 보내는 경우
            try:
                necessity = Necessity.objects.get(id=necessity_id, is_hidden=False)
            except Necessity.DoesNotExist:
                return Response({'error': "해당하는 Necessity가 존재하지 않습니다."}, status=status.HTTP_404_NOT_FOUND)

        else:
            # DB에 기존에 존재하지 않던 새로운 Necessity를 생성하는 경우
            # FIXME: 아래 두 줄은 front에서 기 존재하는 Necessity를 갖고 생성하고 싶을 때는 id를 보내야 함.(ON-25) 그 전까지의 임시 방편.
            necessity = Necessity.objects.filter(name=name, option=option).last()
            if not necessity:
                necessity_serializer = NecessitySerializer(data=data)
                necessity_serializer.is_valid(raise_exception=True)
                necessity = necessity_serializer.save()

        # use serializer only for validation
        serializer = NecessityOfPlaceWriteSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        with transaction.atomic():
            if NecessityPlace.objects.select_for_update().filter(
                    place=place, necessity=necessity, is_hidden=False).exists():
                return Response({'error': "집에 이미 존재하는 Necessity 정보입니다."}, status=status.HTTP_409_CONFLICT)

            necessity_place = NecessityPlace.objects.create(place=place, necessity=necessity,
                                                            description=description, price=price, count=count)

        NecessityLog.objects.create(house=place.house, necessity_place=necessity_place, user=user,
                                    action=NecessityLog.CREATE)
        return Response(self.get_serializer(place).data, status=status.HTTP_201_CREATED)


class PlaceNecessityView(APIView):
    permission_classes = (IsAuthenticated, )

    def put(self, request, *args, **kwargs):
        place_id = kwargs['place_id']
        necessity_id = kwargs['necessity_id']

        user = request.user

        try:
            necessity_place = NecessityPlace.objects.get(place_id=place_id, necessity_id=necessity_id, is_hidden=False)
        except NecessityPlace.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if not user.user_houses.filter(house=necessity_place.place.house).exists():
            return Response({'error': "소속되어 있지 않은 집의 Necessity입니다."}, status=status.HTTP_403_FORBIDDEN)

        serializer = NecessityOfPlaceWriteSerializer(necessity_place, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.update(necessity_place, serializer.validated_data)

        NecessityLog.objects.create(house=necessity_place.place.house, necessity_place=necessity_place, user=user,
                                    action=NecessityLog.UPDATE)

        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        place_id = kwargs['place_id']
        necessity_id = kwargs['necessity_id']

        user = request.user

        try:
            necessity_place = NecessityPlace.objects.get(place_id=place_id, necessity_id=necessity_id, is_hidden=False)
        except NecessityPlace.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if not user.user_houses.filter(house=necessity_place.place.house).exists():
            return Response({'error': "소속되어 있지 않은 집의 Necessity입니다."}, status=status.HTTP_403_FORBIDDEN)

        NecessityLog.objects.create(house=necessity_place.place.house, necessity_place=necessity_place, user=user,
                                    action=NecessityLog.DELETE)
        necessity_place.is_hidden = True
        necessity_place.save()

        return Response(PlaceSerializer(necessity_place.place).data)


class PlaceNecessityCountView(APIView):
    permission_classes = (IsAuthenticated, )

    def put(self, request, *args, **kwargs):
        place_id = kwargs['place_id']
        necessity_id = kwargs['necessity_id']

        user = request.user

        try:
            necessity_place = NecessityPlace.objects.get(place_id=place_id, necessity_id=necessity_id, is_hidden=False)
        except NecessityPlace.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if not user.user_houses.filter(house=necessity_place.place.house).exists():
            return Response({'error': "소속되어 있지 않은 집의 Necessity입니다."}, status=status.HTTP_403_FORBIDDEN)

        serializer = NecessityOfPlaceWriteSerializer(necessity_place, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.update(necessity_place, serializer.validated_data)

        NecessityLog.objects.create(house=necessity_place.place.house, necessity_place=necessity_place, user=user,
                                    action=NecessityLog.COUNT)

        return Response(NecessityOfPlaceWriteSerializer(necessity_place).data)


class HousePlaceView(APIView):
    permission_classes = (IsAuthenticated, )

    def delete(self, request, *args, **kwargs):
        house_id = kwargs['house_id']
        place_id = kwargs['place_id']

        user = self.request.user
        user_house = user.user_houses.filter(house_id=house_id).last()
        if not user_house:
            return Response({'error': "소속되어 있지 않은 집입니다."}, status=status.HTTP_403_FORBIDDEN)

        try:
            place = Place.objects.get(id=place_id, house_id=house_id)
        except Place.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        place.delete()

        places = Place.objects.filter(house_id=house_id)
        return Response(PlaceSerializer(places, many=True))


class HouseUserLeaderView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        house_id = kwargs['house_id']
        user_id = kwargs['user_id']

        user = self.request.user
        if user.id == user_id:
            return Response({'error': "자기 자신에게는 양도할 수 없습니다."}, status=status.HTTP_400_BAD_REQUEST)

        user_houses = UserHouse.objects.filter(house_id=house_id)
        from_user_house = user_houses.filter(user=user).last()
        if not from_user_house:
            return Response({'error': "소속되어 있지 않은 집입니다."}, status=status.HTTP_403_FORBIDDEN)
        if not from_user_house.is_leader:
            return Response({'error': "leader만 leader 권한을 양도할 수 있습니다."}, status=status.HTTP_403_FORBIDDEN)

        to_user_house = user_houses.filter(user_id=user_id).last()
        if not to_user_house:
            return Response({'error': "집에 소속되어 있지 않은 User입니다."}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            from_user_house.is_leader = False
            from_user_house.save()
            to_user_house.is_leader = True
            to_user_house.save()
        return Response(UserOfHouseSerializer(user_houses, many=True).data)


class HouseUserActivateView(viewsets.GenericViewSet):
    queryset = User.objects.all()

    # GET /api/v1/house/{house_uidb64}/user/{user_uidb64}/activate/{token}/
    @action(detail=False, methods=['GET'])
    def activate(self, request, *args, **kwargs):
        house_uidb64 = kwargs['house_uidb64']
        user_uidb64 = kwargs['user_uidb64']
        token = kwargs['token']

        try:
            house_id = force_text(urlsafe_base64_decode(house_uidb64))
            user_id = force_text(urlsafe_base64_decode(user_uidb64))
            house = House.objects.filter(id=house_id).last()
            user = User.objects.filter(id=user_id).last()
        except (UnicodeDecodeError, ValueError):
            return Response({'error': "잘못된 접근입니다."}, status=status.HTTP_400_BAD_REQUEST)
        if not house or not user:
            return Response({'error': "잘못된 접근입니다."}, status=status.HTTP_400_BAD_REQUEST)

        if user_activation_token.check_token(user, token):
            try:
                UserHouse.objects.create(user=user, house=house)
            except IntegrityError:
                return Response({'error': "이미 House에 등록된 멤버입니다."}, status=status.HTTP_409_CONFLICT)
        else:
            return Response({'error': "유효하지 않은 키입니다."}, status=status.HTTP_400_BAD_REQUEST)
        return redirect(settings.REDIRECT_PAGE)
