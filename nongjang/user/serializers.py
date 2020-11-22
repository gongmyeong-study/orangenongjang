from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    is_active = serializers.BooleanField(default=False)

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'password',
            'email',
            'is_active',
            'last_login',
            'date_joined',
        )

    def validate_password(self, password):
        return make_password(password)


class SimpleUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id',
            'username',
        )
