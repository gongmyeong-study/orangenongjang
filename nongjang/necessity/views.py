from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from necessity.serializers import NecessitySerializer
from necessity.models import Necessity, NecessityUser

from user.serializers import UserSerializer


class NecessityViewSet(viewsets.GenericViewSet):
    serializer_class = NecessitySerializer
    queryset = Necessity.objects.all()
    user = NecessityUser.objects.all()

    # POST /api/v1/necessity/
    def create(self, request, *args, **kwargs):
        name = request.data.get('name')
        option = request.data.get('option')
        description = request.data.get('description')
        price = request.data.get('price')
        user = Necessity

        print(user)
        print(name)

        if not name:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:


    # GET /api/v1/necessity/
    @action(detail=False, methods=['GET'])
    def remove(self, request):
        name = request.data.get('name')



