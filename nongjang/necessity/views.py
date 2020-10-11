from django.db import IntegrityError
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from necessity.serializers import NecessitySerializer, NecessityOfHouseSerializer
from necessity.models import Necessity, NecessityHouse, NecessityLog


class NecessityViewSet(viewsets.GenericViewSet):
    queryset = Necessity.objects.all()
    serializer_class = NecessitySerializer
    permission_classes = (IsAuthenticated, )

    def get_permissions(self):
        if self.action == 'create':
            return IsAdminUser(),
        return super(NecessityViewSet, self).get_permissions()

    # POST /api/v1/necessity/
    def create(self, request):
        """
        일반 유저용의 API가 아님.
        유저가 Necessity를 생성하는 것은 POST /api/v1/house/{house_id}/necessity/ 에서 necessity_id를 포함해 요청하는 경우.
        """
        data = request.data

        name = data.get('name')
        if not name:
            return Response({'error': "name은 필수 항목입니다."}, status=status.HTTP_400_BAD_REQUEST)
        option = data.get('option', '')
        description = data.get('description', '')
        price = data.get('price')
        if price:
            if not price.isnumeric() or int(price) < 0:
                return Response({'error': "price는 0 이상의 정수여야 합니다."}, status=status.HTTP_400_BAD_REQUEST)
            price = int(price)
        else:
            price = None

        try:
            necessity = Necessity.objects.create(name=name, option=option, description=description, price=price)
        except IntegrityError:
            return Response({'error': "이미 존재하는 Necessity 정보입니다."}, status=status.HTTP_409_CONFLICT)
        return Response(self.get_serializer(necessity).data, status=status.HTTP_201_CREATED)

    # GET /api/v1/necessity/{necessity_id}/
    def retrieve(self, request, pk=None):
        return Response(self.get_serializer(self.get_object()).data)

    # GET /api/v1/necessity/
    def list(self, request):
        return Response(self.get_serializer(self.get_queryset(), many=True).data)


class NecessityHouseViewSet(viewsets.GenericViewSet):
    queryset = NecessityHouse.objects.all()
    serializer_class = NecessityOfHouseSerializer
    permission_classes = (IsAuthenticated,)

    # PUT /api/v1/necessity_house/{necessity_house_id}/
    def update(self, request, pk=None):
        user = request.user

        necessity_house = self.get_object()
        if not user.user_houses.filter(house=necessity_house.house).exists():
            return Response({'error': "소속되어 있지 않은 집의 Necessity입니다."}, status=status.HTTP_403_FORBIDDEN)

        data = request.data
        name = data.get('name')
        description = data.get('description', '')
        price = data.get('price')
        if name is not None or description is not None or price is not None:
            necessity_house.name = name
            necessity_house.description = description
            necessity_house.price = price
            necessity_house.save()

        NecessityLog.objects.create(necessity_house=necessity_house, user=user, action=NecessityLog.UPDATE)

        return Response(self.get_serializer(necessity_house).data)

    # PUT /api/v1/necessity_house/{necessity_house_id}/count/
    @action(detail=True, methods=['PUT'])
    def count(self, request, pk=None):
        user = request.user

        count = request.data.get('count')
        if not count or not count.isnumeric() or int(count) < 0:
            return Response({'error': "count는 필수 항목이며 0 이상의 정수여야 합니다."}, status=status.HTTP_400_BAD_REQUEST)
        count = int(count)

        necessity_house = self.get_object()
        if not user.user_houses.filter(house=necessity_house.house).exists():
            return Response({'error': "소속되어 있지 않은 집의 Necessity입니다."}, status=status.HTTP_403_FORBIDDEN)

        necessity_house.count = count
        necessity_house.save()

        return Response(self.get_serializer(necessity_house).data)

    # DELETE /api/v1/necessity_house/{necessity_house_id}/
    def destroy(self, request, pk=None):
        user = request.user

        necessity_house = self.get_object()
        if not user.user_houses.filter(house=necessity_house.house).exists():
            return Response({'error': "소속되어 있지 않은 집의 Necessity입니다."}, status=status.HTTP_403_FORBIDDEN)

        NecessityLog.objects.create(necessity_house=necessity_house, user=user, action=NecessityLog.DELETE)
        necessity_house.count = 0
        necessity_house.save()

        return Response(self.get_serializer(necessity_house).data)
