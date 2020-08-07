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
        name = request.data.get('name')
        option = request.data.get('option')
        description = request.data.get('description')
        price = request.data.get('price')

        if not name:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # if price == "":
        #     return Response(status=status.HTTP_400_BAD_REQUEST)
        
        necessity, new = Necessity.objects.get_or_create(name=name, option=option, description=description, price=price)
        
        if not new:
            return Response(status=status.HTTP_409_CONFLICT)

        else:
            new_necessity = Necessity.objects.get(name=name, option=option, description=description, price=price)



        # if name, obtion in  # 생필품 이름과 옵션(사이즈)가 같으면 중복 에러
        #     return Response(status=status.HTTP_409_CONFLICT)
        
        return Response(self.get_serializer(new_necessity).data, status=status.HTTP_201_CREATED)
        
        # content = {"name" : "건전지", "price" : "24000"}
        # return Response(content)

    # GET /api/v1/necessity/
    # @action(detail=False, methods=['GET'])
    # def search(self, request):



    # DELETE /api/v1/necessity/
    # @action(detail=False, methods=['DELETE'])
    # def remove(self, request):
    #     name = request.data.get('name')