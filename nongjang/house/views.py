from django.contrib.auth.models import User
from django.core.mail import EmailMessage
from django.db import IntegrityError, transaction
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from house.models import House, UserHouse
from house.serializers import HouseSerializer, SimpleHouseSerializer
from necessity.models import Necessity, NecessityHouse, NecessityLog
from necessity.serializers import NecessityLogSerializer, NecessityOfHouseSerializer


class HouseViewSet(viewsets.GenericViewSet):
    queryset = House.objects.filter(is_hidden=False)
    serializer_class = SimpleHouseSerializer
    permission_classes = (IsAuthenticated, )

    def get_serializer_class(self, *args, **kwargs):
        if self.action == 'necessity':
            return HouseSerializer
        if self.action == 'necessity_log':
            return NecessityLogSerializer
        return self.serializer_class

    # POST /api/v1/house/
    def create(self, request):
        user = request.user

        name = request.data.get('name')
        introduction = request.data.get('introduction')

        if not name:
            return Response({'error': "집의 이름을 입력하세요."}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            house = House.objects.create(name=name, introduction=introduction)
            UserHouse.objects.create(user=user, house=house, is_leader=True)

        return Response(self.get_serializer(house).data, status=status.HTTP_201_CREATED)

    # DELETE /api/v1/house/{house_id}/
    def destroy(self, request, pk=None):
        user = request.user
        house = self.get_object()

        user_house = user.user_houses.filter(house=house).last()
        if not user_house:
            return Response({'error': "자신의 집만 삭제할 수 있습니다."}, status=status.HTTP_403_FORBIDDEN)

        if not user_house.is_leader:
            return Response({'error': "leader만 집을 삭제할 수 있습니다"}, status=status.HTTP_403_FORBIDDEN)

        house.is_hidden = True
        house.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # /api/v1/house/{house_id}/invitation/
    @action(detail=True, methods=['POST'])
    def invitation(self, request, pk=None):
        user = request.user
        print(1)
        house = self.get_object()
        user_house = user.user_houses.filter(house=house).last()
        if not user_house:
            return Response({'error': "초대할 집이 존재하지 않습니다."}, status=status.HTTP_403_FORBIDDEN)
        if not user_house.is_leader:
            return Response({'error': "leader만 초대장을 전송할 수 있습니다."}, status=status.HTTP_403_FORBIDDEN)

        email = request.data.get('email')
        if not User.objects.filter(email=email).exists():
            return Response({'error': "등록되지 않은 Email입니다."}, status=status.HTTP_400_BAD_REQUEST)
        # Serializer를 통해 올바른 email 형식인지 검증할 필요가 있음. 현재 user에 대한 validation(email 형식 등) 로직이 없어 리팩토링해야 함.

        if email is None:
            return Response({'error': "Email 주소를 입력해주세요."}, status=status.HTTP_404_NOT_FOUND)
        subject = '오렌지농장 House에 초대합니다.'
        message = '{}님께서 {} 초대장을 보내셨습니다. 아래 링크를 클릭하여 초대를 수락하세요.'.format(user.username, house.name)
        EmailMessage(subject, message, to=[email]).send()
        return Response({'입력하신 이메일로 초대장이 전송되었습니다.'})

    # /api/v1/house/{house_id}/user/
    @action(detail=True, methods=['POST', 'DELETE'])
    def user(self, request, pk=None):
        house = self.get_object()
        if self.request.method == 'POST':
            return self._join_house(house)
        else:
            return self._leave_house(house)

    def _join_house(self, house):
        user = self.request.user
        user_house = user.user_houses.filter(house=house).last()
        if user_house:
            return Response({'error': "이미 소속되어 있는 집입니다."}, status=status.HTTP_409_CONFLICT)

        UserHouse.objects.create(user=user, house=house)
        return Response(self.get_serializer(house).data)

    def _leave_house(self, house):
        user = self.request.user
        user_house = user.user_houses.filter(house=house).last()
        if not user_house:
            return Response({'error': "소속되어 있지 않은 집입니다."}, status=status.HTTP_403_FORBIDDEN)

        if user_house.is_leader:
            return Response({'error': "leader이므로 집을 떠날 수 없습니다. leader를 다른 유저에게 양도한 뒤 다시 시도해 주세요"},
                            status=status.HTTP_400_BAD_REQUEST)

        user_house.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # GET /api/v1/house/{house_id}/
    def retrieve(self, request, pk=None):
        """자신이 소속된 집을 열람하는 API"""
        user = self.request.user
        house = self.get_object()
        user_house = user.user_houses.filter(house=house).last()
        if not user_house:
            return Response({'error': "소속되어 있지 않은 집입니다."}, status=status.HTTP_403_FORBIDDEN)
        return Response(self.get_serializer(house).data)

    # GET /api/v1/house/
    def list(self, request):
        """자신이 소속된 집들을 열람하는 API"""
        user = request.user
        houses = self.queryset.filter(user_houses__user=user)
        return Response(self.get_serializer(houses, many=True).data)

    # /api/v1/house/{house_id}/necessity/
    @action(detail=True, methods=['POST', 'GET'])
    def necessity(self, request, pk=None):
        house = self.get_object()
        user_house = request.user.user_houses.filter(house=house).last()
        if not user_house:
            return Response({'error': "소속되어 있지 않은 집입니다."}, status=status.HTTP_403_FORBIDDEN)
        if self.request.method == 'POST':
            return self._create_necessity(house)
        return self._get_necessity(house)

    def _create_necessity(self, house):
        user = self.request.user

        data = self.request.data

        necessity_id = data.get('necessity_id')
        name = data.get('name')
        if not (bool(necessity_id) ^ bool(name)):
            return Response({'error': "necessity_id 또는 name이 요청에 포함되어야 합니다."}, status=status.HTTP_400_BAD_REQUEST)
        option = data.get('option', '')
        description = data.get('description', '')
        price = data.get('price')
        count = data.get('count')

        if isinstance(count, str):
            if not count.isnumeric() or int(count) < 0:
                return Response({'error': "count는 필수 항목이며 0 이상의 정수여야 합니다."}, status=status.HTTP_400_BAD_REQUEST)
            else:
                count = int(count)
        elif not isinstance(count, int) or count < 0:
            return Response({'error': "count는 필수 항목이며 0 이상의 정수여야 합니다."}, status=status.HTTP_400_BAD_REQUEST)

        if price:
            if isinstance(price, str):
                if not price.isnumeric() or int(price) < 0:
                    return Response({'error': "price는 0 이상의 정수여야 합니다."}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    price = int(price)
            elif not isinstance(price, int) or price < 0:
                return Response({'error': "price는 0 이상의 정수여야 합니다."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            price = None

        if necessity_id:
            # GET /api/v1/necessity/ 등을 이용해 frontend가 이미 존재하는 Necessity들을 제시하고, 유저가 그것을 택했을 때 해당 id를 보내는 경우
            try:
                necessity = Necessity.objects.get(id=necessity_id)
            except Necessity.DoesNotExist:
                return Response({'error': "해당하는 Necessity가 존재하지 않습니다."}, status=status.HTTP_404_NOT_FOUND)

        else:
            # DB에 기존에 존재하지 않던 새로운 Necessity를 생성하는 경우
            try:
                necessity = Necessity.objects.create(name=name, option=option, description=description, price=price)
            except IntegrityError:
                # return Response({'error': "이미 존재하는 Necessity 정보입니다."}, status=status.HTTP_409_CONFLICT)
                # FIXME: front에서 기 존재하는 Necessity를 갖고 생성하고 싶을 때는 id를 보내야 함.(ON-25) 그 전까지의 임시 방편.
                necessity = Necessity.objects.filter(name=name).last()

        try:
            necessity_house = NecessityHouse.objects.create(house=house, necessity=necessity,
                                                            description=description, price=price, count=count)
        except IntegrityError:
            return Response({'error': "집에 이미 존재하는 Necessity 정보입니다."}, status=status.HTTP_409_CONFLICT)

        NecessityLog.objects.create(necessity_house=necessity_house, user=user, action=NecessityLog.CREATE)
        return Response(self.get_serializer(house).data, status=status.HTTP_201_CREATED)

    def _get_necessity(self, house):
        return Response(self.get_serializer(house).data)

    # GET /api/v1/house/{house_id}/necessity_log/
    @action(detail=True, methods=['GET'])
    def necessity_log(self, request, pk=None):
        log_order = self.request.query_params.get('necessity_order')
        house = self.get_object()
        user_house = request.user.user_houses.filter(house=house).last()
        if not user_house:
            return Response({'error': "소속되어 있지 않은 집입니다."}, status=status.HTTP_403_FORBIDDEN)

        queryset = NecessityLog.objects.filter(necessity_house__house=house).select_related('necessity_house')
        if log_order == 'earliest':
            logs = queryset.order_by('created_at')
        else:
            logs = queryset.order_by('-created_at')
        return Response(self.get_serializer(logs, many=True).data)


class HouseNecessityView(APIView):
    permission_classes = (IsAuthenticated, )

    # PUT /api/v1/house/{house_id}/necessity/{necessity_id}/
    def put(self, request, *args, **kwargs):
        house_id = kwargs['house_id']
        necessity_id = kwargs['necessity_id']

        user = request.user

        try:
            necessity_house = NecessityHouse.objects.get(house_id=house_id, necessity_id=necessity_id)
        except NecessityHouse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if not user.user_houses.filter(house=necessity_house.house).exists():
            return Response({'error': "소속되어 있지 않은 집의 Necessity입니다."}, status=status.HTTP_403_FORBIDDEN)

        data = request.data
        name = data.get('name')
        description = data.get('description')
        price = data.get('price')
        updated = False

        if price:
            if isinstance(price, str):
                if not price.isnumeric() or int(price) < 0:
                    return Response({'error': "price는 0 이상의 정수여야 합니다."}, status=status.HTTP_400_BAD_REQUEST)
            elif not isinstance(price, int) or price < 0:
                return Response({'error': "price는 0 이상의 정수여야 합니다."}, status=status.HTTP_400_BAD_REQUEST)
            else:
                necessity_house.price = int(price)
                updated = True
        else:
            necessity_house.price = None
            updated = True

        if name:
            necessity_house.name = name
            updated = True

        if description is not None:
            necessity_house.description = description
            updated = True

        if updated:
            necessity_house.save()

        NecessityLog.objects.create(necessity_house=necessity_house, user=user, action=NecessityLog.UPDATE)

        return Response(NecessityOfHouseSerializer(necessity_house).data)

    # DELETE /api/v1/house/{house_id}/necessity/{necessity_id}/
    def delete(self, request, *args, **kwargs):
        house_id = kwargs['house_id']
        necessity_id = kwargs['necessity_id']

        user = request.user

        try:
            necessity_house = NecessityHouse.objects.get(house_id=house_id, necessity_id=necessity_id)
        except NecessityHouse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if not user.user_houses.filter(house=necessity_house.house).exists():
            return Response({'error': "소속되어 있지 않은 집의 Necessity입니다."}, status=status.HTTP_403_FORBIDDEN)

        NecessityLog.objects.create(necessity_house=necessity_house, user=user, action=NecessityLog.DELETE)
        necessity_house.delete()

        return Response(HouseSerializer(necessity_house.house).data)


class HouseNecessityCountView(APIView):
    permission_classes = (IsAuthenticated, )

    # PUT /api/v1/house/{house_id}/necessity/{necessity_id}/count/
    def put(self, request, *args, **kwargs):
        house_id = kwargs['house_id']
        necessity_id = kwargs['necessity_id']

        user = request.user

        count = request.data.get('count')
        if isinstance(count, str):
            if not count.isnumeric() or int(count) < 0:
                return Response({'error': "count는 필수 항목이며 0 이상의 정수여야 합니다."}, status=status.HTTP_400_BAD_REQUEST)
            else:
                count = int(count)
        elif not isinstance(count, int) or count < 0:
            return Response({'error': "count는 필수 항목이며 0 이상의 정수여야 합니다."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            necessity_house = NecessityHouse.objects.get(house_id=house_id, necessity_id=necessity_id)
        except NecessityHouse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if not user.user_houses.filter(house=necessity_house.house).exists():
            return Response({'error': "소속되어 있지 않은 집의 Necessity입니다."}, status=status.HTTP_403_FORBIDDEN)

        necessity_house.count = count
        necessity_house.save()
        NecessityLog.objects.create(necessity_house=necessity_house, user=user, action=NecessityLog.COUNT)

        return Response(NecessityOfHouseSerializer(necessity_house).data)
