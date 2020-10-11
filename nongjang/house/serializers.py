from rest_framework import serializers

from house.models import House
from necessity.serializers import NecessityOfHouseSerializer


class SimpleHouseSerializer(serializers.ModelSerializer):

    class Meta:
        model = House
        fields = (
            'id',
            'name',
            'introduction',
         ) 


class HouseSerializer(serializers.ModelSerializer):
    necessities = serializers.SerializerMethodField()

    class Meta:
        model = House
        fields = (
            'id',
            'name',
            'introduction',
            'necessities',
        )

    def get_necessities(self, house):
        necessity_houses = house.necessity_houses.filter(count__gt=0).select_related('necessity')
        return NecessityOfHouseSerializer(necessity_houses, many=True, context=self.context).data
