from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from necessity.serializers import NecessityOfHouseSerializer
from necessity.models import NecessityHouse, NecessityLog


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
