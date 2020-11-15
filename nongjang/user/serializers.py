from rest_framework import serializers

from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'last_login',
            'date_joined',
        )

    def validate(self, data):
        username = data.get('username')
        email = data.get('email')
        if not username or not email:
            raise serializers.ValidationError("Email 또는 사용자명을 입력하세요.")

        return data

    # def create(self, validated_data):


class SimpleUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id',
            'username',
        )
