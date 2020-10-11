from rest_framework import serializers

from necessity.models import Necessity, NecessityHouse, NecessityLog
from user.serializers import SimpleUserSerializer


class NecessitySerializer(serializers.ModelSerializer):
    necessity_user = serializers.SerializerMethodField()

    class Meta:
        model = Necessity
        fields = (
            'id',
            'name',
            'option',
            'description',
            'price',
         )


class NecessityOfHouseSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    option = serializers.CharField(source='necessity.option')
    description = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()

    class Meta:
        model = NecessityHouse
        fields = (
            'id',
            'name',
            'option',
            'description',
            'price',
            'count',
        )

    def get_name(self, necessity_house):
        return necessity_house.name if necessity_house.name else necessity_house.necessity.name

    def get_description(self, necessity_house):
        return necessity_house.description if necessity_house.description else necessity_house.necessity.description

    def get_price(self, necessity_house):
        return necessity_house.price if necessity_house.price else necessity_house.necessity.price


class NecessityLogSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    necessity = serializers.SerializerMethodField()

    class Meta:
        model = NecessityLog
        fields = (
            'id',
            'action',
            'user'
            'necessity',
            'created_at',
        )

    def get_user(self, log):
        return SimpleUserSerializer(log.necessity_house.user, context=self.context).data

    def get_necessity(self, log):
        return NecessityOfHouseSerializer(log.necessity_house, context=self.context).data
