from rest_framework import serializers
from django.contrib.auth.models import User

from necessity.models import Necessity, NecessityUser, NecessityUserLog


class NecessitySerializer(serializers.ModelSerializer):
    necessity_user = serializers.SerializerMethodField()

    class Meta:
        model = Necessity
        fields = (
            'id',
            'name',             # 상품명
            'option',           # size
            'description',      # 상품 설명
            'price',            # 개당 가격
            'necessity_user',   # 해당 사용자의 생필품
         )

    def get_necessity_user(self, necessity):
        try:
            necessity_user = NecessityUser.objects.get(necessity=necessity, user=self.context['request'].user)
        except NecessityUser.DoesNotExist:
            raise Exception("no necessity user")
        return {
            "id": necessity_user.id,
            "count": necessity_user.count,
        }
    

class NecessityUserLogSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    necessity = serializers.SerializerMethodField()
    
    class Meta:
        model = NecessityUserLog
        fields = (
            'id',
            'user',
            'necessity',
            'activity_category',
            'created_at',
        )

    def get_user(self, log):
        user = log.user
        if not user:
            raise Exception("no user")
        return {
            "id": user.id,
            "username": user.username,
        }

    def get_necessity(self, log):
        necessity = log.necessity
        if not necessity:
            raise Exception("no necessity")
        return {
            "id": necessity.id,
            "name": necessity.name
        }
