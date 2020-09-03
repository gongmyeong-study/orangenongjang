from rest_framework import serializers

from accounts.models import House


class HouseSerializer(serializers.ModelSerializer):

    class Meta:
        model = House
        fields = (
            'id',
            'name',
            'introduction',
         ) 
