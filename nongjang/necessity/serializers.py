from rest_framework import serializers

from necessity.models import Necessity, NecessityLog, NecessityPlace
from user.serializers import SimpleUserSerializer


class NecessitySerializer(serializers.ModelSerializer):
    option = serializers.CharField(required=False, allow_blank=True, default='')

    class Meta:
        model = Necessity
        fields = (
            'id',
            'name',
            'option',
            'description',
            'price',
         )


class NecessityOfPlaceWriteSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='necessity.id', read_only=True)
    place_id = serializers.IntegerField(source='place.id', read_only=True)
    place_name = serializers.CharField(source='place.name', read_only=True)
    name = serializers.CharField(source='necessity.name', read_only=True)
    option = serializers.CharField(source='necessity.option', read_only=True)

    class Meta:
        model = NecessityPlace
        fields = (
            'id',
            'place_id',
            'place_name',
            'name',
            'option',
            'description',
            'price',
            'count',
        )


class NecessityOfPlaceSerializer(NecessityOfPlaceWriteSerializer):
    description = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()

    def get_description(self, necessity_place):
        return necessity_place.description if necessity_place.description else necessity_place.necessity.description

    def get_price(self, necessity_place):
        return necessity_place.price if necessity_place.price else necessity_place.necessity.price


class NecessityLogSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    necessity = serializers.SerializerMethodField()

    class Meta:
        model = NecessityLog
        fields = (
            'id',
            'action',
            'user',
            'necessity',
            'created_at',
        )

    def get_user(self, log):
        return SimpleUserSerializer(log.user, context=self.context).data

    def get_necessity(self, log):
        if log.necessity_place:
            return NecessityOfPlaceSerializer(log.necessity_place, context=self.context).data
        return None
