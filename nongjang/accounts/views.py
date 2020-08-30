# Create your views here.
from django.db import IntegrityError
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


class AccountsViewSet(viewsets.GenericViewSet):
    pass