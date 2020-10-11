from django.db import IntegrityError, transaction
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from house.models import House, UserHouse
from house.serializers import HouseSerializer, SimpleHouseSerializer
from necessity.models import Necessity, NecessityHouse, NecessityLog
from necessity.serializers import NecessityLogSerializer


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
    def create(self, request, *args, **kwargs):
        user = request.user

        name = request.data.get('name')
        introduction = request.data.get('introduction')

        if not name:
            return Response({'error': "집의 이름을 입력하세요."}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            house = House.objects.create(name=name, introduction=introduction)
            UserHouse.objects.create(user=user, house=house, leader=True)

        return Response(self.get_serializer(house).data, status=status.HTTP_201_CREATED)

    # DELETE /api/v1/house/{house_id}/
    def destroy(self, request, pk=None):
        user = request.user
        house = self.get_object()

        user_house = user.user_houses.filter(house=house).last()
        if not user_house:
            return Response({'error': "자신의 집만 삭제할 수 있습니다."}, status=status.HTTP_403_FORBIDDEN)

        if not user_house.leader:
            return Response({'error': "leader만 집을 삭제할 수 있습니다"}, status=status.HTTP_403_FORBIDDEN)

        if house.is_hidden:
            return Response({'error': "이미 삭제된 집입니다."}, status=status.HTTP_403_FORBIDDEN)

        house.is_hidden = True
        house.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

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
            return Response({'error': "소속되어 있지 않은 집입니다."}, status=status.HTTP_404_NOT_FOUND)
        
        if user_house.leader:
            return Response({'error': 'leader이므로 집을 떠날 수 없습니다. leader를 다른 유저에게 양도한 뒤 다시 시도해 주세요'},
                            status=status.HTTP_400_BAD_REQUEST)

        user_house.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # GET /api/v1/house/
    def list(self, request):
        user = request.user
        houses = House.objects.filter(users__user=user, is_hidden=False)
        return Response(self.get_serializer(houses, many=True).data)

    # /api/v1/house/{house_id}/necessity/
    @action(detail=True, methods=['POST', 'GET'])
    def necessity(self, request, pk=None):
        house = self.get_object()
        if self.request.method == 'POST':
            return self._create_necessity(house)
        return self._get_necessity(house)

    def _create_necessity(self, house):
        user = self.request.user

        data = self.request.data
        name = data.get('name')
        option = data.get('option')
        description = data.get('description')
        price = data.get('price')

        if not name:
            return Response({'error': "생필품 이름을 입력하세요."}, status=status.HTTP_400_BAD_REQUEST)

        necessity, created = Necessity.objects.get_or_create(name=name, option=option,
                                                             description=description, price=price)

        try:
            necessity_house = NecessityHouse.objects.create(house=house, necessity=necessity,
                                                            description=description, price=price)
        except IntegrityError:
            return Response(status=status.HTTP_409_CONFLICT)

        NecessityLog.objects.create(necessity_house=necessity_house, user=user, activity_category=NecessityLog.CREATE)

        return Response(self.get_serializer(house).datta, status=status.HTTP_201_CREATED)

    def _get_necessity(self, house):
        return Response(self.get_serializer(house).data)

    # GET /api/v1/house/{house_id}/necessity_log/
    @action(detail=False, methods=['GET'])
    def necessity_log(self, request, pk=None):
        house = self.get_object()

        logs = house.necessity_houses.necessity_logs.all().select_related('necessity_house')
        return Response(self.get_serializer(logs, many=True).data)
