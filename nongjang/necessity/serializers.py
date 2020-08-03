from rest_framework import serializers
from django.contrib.auth.models import User

from necessity.models import Necessity


class NecessitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Necessity
        fields = (
            'name',         # 상품명
            'option',       # size
            'description',  # 상품 설명
            'price'         # 개당 가격
        )
