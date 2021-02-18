from rest_framework import serializers

from house.models import House, Place, UserHouse
from necessity.serializers import NecessityOfPlaceSerializer


class SimpleHouseSerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField()
    places = serializers.SerializerMethodField()

    class Meta:
        model = House
        fields = (
            'id',
            'name',
            'introduction',
            'created_at',
            'updated_at',
            'users',
            'places'
        )

    def get_users(self, house):
        user_houses = house.user_houses.all().select_related('user')
        return UserOfHouseSerializer(user_houses, many=True, context=self.context).data

    def get_places(self, house):
        return SimplePlaceSerializer(house.places.filter(is_hidden=False), many=True).data

    def validate_name(self, name):
        user = self.context['request'].user
        if UserHouse.objects.filter(user=user, house__name=name, house__is_hidden=False).exists():
            raise serializers.ValidationError("같은 name의 집을 가지고 있습니다.")
        return name


class HouseSerializer(SimpleHouseSerializer):

    class Meta:
        model = House
        fields = SimpleHouseSerializer.Meta.fields

    def get_places(self, house):
        return PlaceSerializer(house.places.filter(is_hidden=False), many=True).data


class UserOfHouseSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='user.id')
    username = serializers.CharField(source='user.username')
    joined_at = serializers.DateTimeField(source='created_at')

    class Meta:
        model = UserHouse
        fields = (
            'id',
            'username',
            'is_leader',
            'joined_at',
        )


class SimplePlaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Place
        fields = (
            'id',
            'name',
            'house_id',
            'created_at',
            'updated_at',
        )


class PlaceSerializer(SimplePlaceSerializer):
    necessities = serializers.SerializerMethodField()

    class Meta:
        model = Place
        fields = SimplePlaceSerializer.Meta.fields + ('necessities', )

    def get_necessities(self, place):
        queryset = place.necessity_places.filter(is_hidden=False).select_related('necessity')

        necessity_order = None
        if self.context.get('request'):
            necessity_order = self.context['request'].query_params.get('necessity_order')

        if necessity_order == 'name':
            necessity_places = queryset.order_by('necessity__name', '-created_at')
        else:
            necessity_places = queryset.order_by('-created_at')

        return NecessityOfPlaceSerializer(necessity_places, many=True, context=self.context).data
