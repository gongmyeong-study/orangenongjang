from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from necessity.serializers import NecessitySerializer
from necessity.models import Necessity, NecessityUser, NecessityCounter

from user.serializers import UserSerializer


class NecessityViewSet(viewsets.GenericViewSet):
    queryset = Necessity.objects.all()
    serializer_class = NecessitySerializer

    # POST /api/v1/necessity/
    def create(self, request, *args, **kwargs):
        user = request.user

        if not user.is_authenticated:
            return Response(status=status.HTTP_403_FORBIDDEN)

        name = request.data.get('name')
        option = request.data.get('option')
        description = request.data.get('description')
        price = request.data.get('price')

        if not name:
            return Response(status=status.HTTP_400_BAD_REQUEST)
            print("생필품 이름을 입력하세요.")

        necessity, created = Necessity.objects.get_or_create(name=name, option=option, description=description, price=price)


        # necessity = Necessity.objects.get(name=name, option=option, description=description, price=price)
        # necessity, new = Necessity.objects.get_or_create(name=name, option=option, description=description, price=price)

        try:
            NecessityUser.objects.create(user=user, necessity=necessity)
        except IntegrityError:
            return Response(status=status.HTTP_409_CONFLICT)

        # if name, obtion in  # 생필품 이름과 옵션(사이즈)가 같으면 중복 에러
        #     return Response(status=status.HTTP_409_CONFLICT)

        necessities = Necessity.objects.filter(users__user=user)
        # SELECT necessity.* FROM necessity INNER JOIN necessityuser ON (necessity.id = necessityuser.necessity_id)
        #          WHERE necessityuser.user_id = {login한 이 유저의 id}

        return Response(self.get_serializer(necessities, many=True).data, status=status.HTTP_201_CREATED)
        
        # content = {"name" : "건전지", "price" : "24000"}
        # return Response(content)

    # PUT /api/v1/necessity/
    # @action(detail=False, methods=['PUT'])
    # def update(self, request):



    # DELETE /api/v1/necessity/{necessity_id}/
    def destroy(self, request, pk=None):
        try:
            necessity = Necessity.objects.get(pk=pk)
            necessity.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

        except Necessity.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

