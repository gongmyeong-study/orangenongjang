from rest_framework import serializers

from house.models import House, UserHouse
from necessity.serializers import NecessityOfHouseSerializer


class SimpleHouseSerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField()

    class Meta:
        model = House
        fields = (
            'id',
            'name',
            'introduction',
            'users',
        )

    def get_users(self, house):
        user_houses = house.user_houses.all().select_related('user')
        return UserOfHouseSerializer(user_houses, many=True, context=self.context).data


class HouseSerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField()
    necessities = serializers.SerializerMethodField()

    class Meta:
        model = House
        fields = (
            'id',
            'name',
            'introduction',
            'users',
            'necessities',
        )

    def get_users(self, house):
        user_houses = house.user_houses.all().select_related('user')
        return UserOfHouseSerializer(user_houses, many=True, context=self.context).data

    def get_necessities(self, house):
        necessity_order = self.context['request'].query_params.get('necessity_order')
        queryset = house.necessity_houses.filter(count__gt=0)
        if necessity_order == 'name':
            necessity_houses = queryset.order_by('necessity__name', '-created_at').select_related('necessity')
        else:
            necessity_houses = queryset.order_by('-created_at').select_related('necessity')

        return NecessityOfHouseSerializer(necessity_houses, many=True, context=self.context).data


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
