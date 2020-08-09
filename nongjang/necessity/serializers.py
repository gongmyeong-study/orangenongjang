from rest_framework import serializers
from django.contrib.auth.models import User

from necessity.models import Necessity, NecessityUser


class NecessitySerializer(serializers.ModelSerializer):
    count = serializers.SerializerMethodField()

    class Meta:
        model = Necessity
        fields = (
            'id',
            'name',         # 상품명
            'option',       # size
            'description',  # 상품 설명
            'price',         # 개당 가격
            'count'
        )

    def get_count(self, necessity):
        try:
            necessity_user = NecessityUser.objects.get(necessity=necessity, user=self.context['request'].user)
        except NecessityUser.DoesNotExist:
            return 0
        return necessity_user.count
