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

    def validate(self, data):
        username = data.get('username')
        email = data.get('email')
        if not username or not email:
            raise serializers.ValidationError("Email 또는 사용자명을 입력하세요.")
        return data

    def create(self, validated_data):
        user = super(UserSerializer, self).create(validated_data)
        user.is_active = False
        return user


class SimpleUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id',
            'username',
        )
