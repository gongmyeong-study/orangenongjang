from django.db import IntegrityError
from rest_framework import status, viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from necessity.models import Necessity
from necessity.serializers import NecessitySerializer


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
            if isinstance(price, str):
                if not price.isnumeric() or int(price) < 0:
                    return Response({'error': "price는 0 이상의 정수여야 합니다."}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    price = int(price)
            elif not isinstance(price, int) or price < 0:
                return Response({'error': "price는 0 이상의 정수여야 합니다."}, status=status.HTTP_400_BAD_REQUEST)
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
