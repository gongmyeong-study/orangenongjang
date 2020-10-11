from django.db import IntegrityError
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.models import House, UserHouse
from accounts.serializers import HouseSerializer, SimpleHouseSerializer
from necessity.models import Necessity, NecessityHouse, NecessityLog
from necessity.serializers import NecessityLogSerializer


class HouseViewSet(viewsets.GenericViewSet):
    queryset = House.objects.all()
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
            return Response({'error': "House 이름을 입력하세요."}, status=status.HTTP_400_BAD_REQUEST)
        
        if not House.objects.filter(name=name, is_hidden=False).exists():
            house = House.objects.create(name=name, introduction=introduction)
        else:
            return Response(status=status.HTTP_409_CONFLICT)
        
        UserHouse.objects.create(user=user, house=house, leader=True)

        return Response(self.get_serializer(house).data, status=status.HTTP_201_CREATED)

    # DELETE /api/v1/house/{house_id}/
    def destroy(self, request, pk=None):
        user = request.user

        try:
            house = House.objects.get(pk=pk, is_hidden=False)
            user_house = UserHouse.objects.get(user=user, house=house)
        except House.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except UserHouse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        if user_house.leader:
           house.is_hidden = True
           house.save()
           return Response(status=status.HTTP_204_NO_CONTENT)

        else:
          return Response({'error': 'Leader 유저만 House를 삭제할 수 있습니다'}, status=status.HTTP_400_BAD_REQUEST)
    
    # POST /api/v1/house/{house_id}/join/
    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        user = request.user

        try:
            house = House.objects.get(id=pk, is_hidden=False)
            UserHouse.objects.create(user=user, house=house)
        except House.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except IntegrityError:
            return Response(status=status.HTTP_409_CONFLICT)
        
        return Response(self.get_serializer(house).data)

    # DELETE /api/v1/house/{house_id}/leave/
    @action(detail=True, methods=['delete'])
    def leave(self, request, pk=None):
        user = request.user

        try:
            user_house = UserHouse.objects.get(user=user, house_id=pk)
        except UserHouse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        if not user_house.leader:
            user_house.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        else:
            return Response({'error': 'Leader 유저이므로 House를 떠날 수 없습니다. Leader를 다른 User에게 양도한 뒤 다시 시도해 주세요'}, status=status.HTTP_400_BAD_REQUEST)

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

    # POST /api/v1/house/{house_id}/necessity/
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

    # GET /api/v1/house/{house_id}/necessity/
    def _get_necessity(self, house):
        return Response(self.get_serializer(house).data)

    # GET /api/v1/house/{house_id}/necessity_log/
    @action(detail=False, methods=['GET'])
    def necessity_log(self, request, pk=None):
        house = self.get_object()

        logs = house.necessity_houses.necessity_logs.all().select_related('necessity_house')
        return Response(self.get_serializer(logs, many=True).data)
