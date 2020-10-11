from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from necessity.serializers import NecessitySerializer, NecessityOfHouseSerializer
from necessity.models import Necessity, NecessityHouse, NecessityLog


class NecessityViewSet(viewsets.GenericViewSet):
    queryset = Necessity.objects.all()
    serializer_class = NecessitySerializer
    permission_classes = (IsAuthenticated,)

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
        option = data.get('option')
        description = data.get('description')
        price = data.get('price')
        if price:
            try:
                price = int(price)
            except ValueError:
                return Response({'error': "price는 0 이상의 정수여야 합니다."}, status=status.HTTP_400_BAD_REQUEST)
            if price < 0:
                return Response({'error': "price는 0 이상의 정수여야 합니다."}, status=status.HTTP_400_BAD_REQUEST)
        necessity = Necessity.objects.create(name=name, option=option, description=description, price=price)
        return Response(self.get_serializer(necessity).data, status=status.HTTP_201_CREATED)

    # GET /api/v1/necessity/
    def list(self, request):
        return Response(self.get_serializer(self.queryset, many=True).data)


class NecessityHouseViewSet(viewsets.GenericViewSet):
    queryset = NecessityHouse.objects.all()
    serializer_class = NecessityOfHouseSerializer
    permission_classes = (IsAuthenticated,)

    # PUT /api/v1/necessity_house/{necessity_house_id}/
    def update(self, request, pk=None):
        user = request.user

        necessity_house = self.get_object()
        if not user.user_houses.filter(house=necessity_house.house).exists():
            return Response(status=status.HTTP_403_FORBIDDEN)

        data = request.data
        name = data.get('name')
        description = data.get('description')
        price = data.get('price')
        if name is not None or description is not None or price is not None:
            necessity_house.name = name
            necessity_house.description = description
            necessity_house.price = price
            necessity_house.save()

        NecessityLog.objects.create(necessity_house=necessity_house, user=user, activity_category=NecessityLog.UPDATE)

        return Response(self.get_serializer(necessity_house).data)

    # PUT /api/v1/necessity_house/{necessity_house_id}/count/
    @action(detail=True, methods=['PUT'])
    def count(self, request, pk=None):
        user = request.user

        try:
            count = int(request.data.get('count'))
            if count < 0:
                return Response({'error': "0 이상의 정수를 입력하세요."}, status=status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response({'error': "0 이상의 정수를 입력하세요."}, status=status.HTTP_400_BAD_REQUEST)

        necessity_house = self.get_object()
        if not user.user_houses.filter(house=necessity_house.house).exists():
            return Response(status=status.HTTP_403_FORBIDDEN)

        necessity_house.count = count
        necessity_house.save()

        return Response(self.get_serializer(necessity_house).data)

    # DELETE /api/v1/necessity_house/{necessity_house_id}/
    def destroy(self, request, pk=None):
        user = request.user

        necessity_house = self.get_object()
        if not user.user_houses.filter(house=necessity_house.house).exists():
            return Response(status=status.HTTP_403_FORBIDDEN)

        NecessityLog.objects.create(necessity_house=necessity_house, user=user, activity_category=NecessityLog.DELETE)
        necessity_house.count = 0
        necessity_house.save()

        return Response(self.get_serializer(necessity_house).data)
