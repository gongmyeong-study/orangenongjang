from django.contrib.auth.models import User
from django.core import mail
from django.core.mail import EmailMessage
from django.db import IntegrityError, transaction
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


class HouseViewSet(viewsets.GenericViewSet):
    queryset = House.objects.filter(is_hidden=False)
    serializer_class = HouseSerializer
    permission_classes = (IsAuthenticated, )

    def get_queryset(self):
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

    # POST /api/v1/house/
    def create(self, request):
        user = request.user

        name = request.data.get('name')
        introduction = request.data.get('introduction')

        if not name or not introduction:
            return Response({'error': "name과 introduction은 필수 항목입니다."}, status=status.HTTP_400_BAD_REQUEST)

        if UserHouse.objects.filter(user=user, house__name=name, house__is_hidden=False).exists():
            return Response({'error': "같은 name의 집을 가지고 있습니다."}, status=status.HTTP_409_CONFLICT)

        with transaction.atomic():
            house = House.objects.create(name=name, introduction=introduction)
            UserHouse.objects.create(user=user, house=house, is_leader=True)

        return Response(self.get_serializer(house).data, status=status.HTTP_201_CREATED)

    # GET /api/v1/house/{house_id}/
    def retrieve(self, request, pk=None):
        """자신이 소속된 집을 열람하는 API"""
        house = self.get_object()
        return Response(self.get_serializer(house).data)

    # GET /api/v1/house/
    def list(self, request):
        """자신이 소속된 집들을 열람하는 API"""
        houses = self.get_queryset()
        return Response(self.get_serializer(houses, many=True).data)

    # DELETE /api/v1/house/{house_id}/
    def destroy(self, request, pk=None):
        user = request.user
        house = self.get_object()

        user_house = user.user_houses.filter(house=house).last()
        if not user_house.is_leader:
            return Response({'error': "leader만 집을 삭제할 수 있습니다"}, status=status.HTTP_403_FORBIDDEN)

        house.is_hidden = True
        house.save()

        houses = self.get_queryset()
        return Response(self.get_serializer(houses, many=True).data)

    # /api/v1/house/{house_id}/invitation/
    @action(detail=True, methods=['POST'])
    def invitation(self, request, pk=None):
        user = request.user
        house = self.get_object()

        user_house = user.user_houses.filter(house=house).last()
        if not user_house.is_leader:
            return Response({'error': "leader만 초대장을 전송할 수 있습니다."}, status=status.HTTP_403_FORBIDDEN)

        email = request.data.get('email')
        if not email:
            return Response({'error': "Email 주소를 입력해주세요."}, status=status.HTTP_400_BAD_REQUEST)
        if not User.objects.filter(email=email, is_active=True).exists():
            return Response({'error': "등록되지 않은 Email입니다."}, status=status.HTTP_404_NOT_FOUND)
        # FIXME: Serializer를 통해 올바른 email 형식인지 검증할 필요가 있음. 현재 user에 대한 validation이 없어 리팩토링해야 함.(ON-35)

        subject = "오렌지농장 House에 초대합니다."
        message = f"{user.username}님께서 {house.name} 초대장을 보내셨습니다. 아래 링크를 클릭하여 초대를 수락하세요."
        with mail.get_connection() as connection:
            try:
                EmailMessage(subject, message, to=[email], connection=connection).send()
            except SMTPException:
                return Response({'error': "Email 발송에 문제가 있습니다."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        return Response({'message': "입력하신 이메일로 초대장이 전송되었습니다."})

    # /api/v1/house/{house_id}/user/
    @action(detail=True, methods=['POST', 'GET', 'DELETE'])
    def user(self, request, pk=None):
        house = self.get_object()
        if self.request.method == 'POST':
            return self._join_house(house)
        elif self.request.method == 'GET':
            return self._get_members(house)
        else:
            return self._leave_house(house)

    def _join_house(self, house):
        user = self.request.user
        user_house = user.user_houses.filter(house=house).last()
        if user_house:
            return Response({'error': "이미 소속되어 있는 집입니다."}, status=status.HTTP_409_CONFLICT)

        UserHouse.objects.create(user=user, house=house)
        return Response(self.get_serializer(house).data, status=status.HTTP_201_CREATED)

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

    # /api/v1/house/{house_id}/place/
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

    # GET /api/v1/house/{house_id}/necessity_log/
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

    # POST /api/v1/place/{place_id}/necessity/
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
                necessity = Necessity.objects.get(id=necessity_id)
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

        try:
            necessity_place = NecessityPlace.objects.create(place=place, necessity=necessity,
                                                            description=description, price=price, count=count)
        except IntegrityError:
            return Response({'error': "집에 이미 존재하는 Necessity 정보입니다."}, status=status.HTTP_409_CONFLICT)

        NecessityLog.objects.create(house=place.house, necessity_place=necessity_place, user=user,
                                    action=NecessityLog.CREATE)
        return Response(self.get_serializer(place).data, status=status.HTTP_201_CREATED)


class PlaceNecessityView(APIView):
    permission_classes = (IsAuthenticated, )

    # PUT /api/v1/place/{place_id}/necessity/{necessity_id}/
    def put(self, request, *args, **kwargs):
        place_id = kwargs['place_id']
        necessity_id = kwargs['necessity_id']

        user = request.user

        try:
            necessity_place = NecessityPlace.objects.get(place_id=place_id, necessity_id=necessity_id)
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

    # DELETE /api/v1/place/{place_id}/necessity/{necessity_id}/
    def delete(self, request, *args, **kwargs):
        place_id = kwargs['place_id']
        necessity_id = kwargs['necessity_id']

        user = request.user

        try:
            necessity_place = NecessityPlace.objects.get(place_id=place_id, necessity_id=necessity_id)
        except NecessityPlace.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if not user.user_houses.filter(house=necessity_place.place.house).exists():
            return Response({'error': "소속되어 있지 않은 집의 Necessity입니다."}, status=status.HTTP_403_FORBIDDEN)

        NecessityLog.objects.create(house=necessity_place.place.house, necessity_place=necessity_place, user=user,
                                    action=NecessityLog.DELETE)
        necessity_place.delete()

        return Response(PlaceSerializer(necessity_place.place).data)


class PlaceNecessityCountView(APIView):
    permission_classes = (IsAuthenticated, )

    # PUT /api/v1/place/{place_id}/necessity/{necessity_id}/count/
    def put(self, request, *args, **kwargs):
        place_id = kwargs['place_id']
        necessity_id = kwargs['necessity_id']

        user = request.user

        try:
            necessity_place = NecessityPlace.objects.get(place_id=place_id, necessity_id=necessity_id)
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

    # DELETE /api/v1/house/{house_id}/place/{place_id}/
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

    # POST /api/v1/house/{house_id}/user/{user_id}/leader/
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
