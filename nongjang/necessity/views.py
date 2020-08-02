from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from necessity.serializers import NecessitySerializer
from necessity.models import Necessity


class NecessityViewSet(viewsets.GenericViewSet):
    serializer_class = NecessitySerializer
