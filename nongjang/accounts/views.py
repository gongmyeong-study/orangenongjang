from django.db import IntegrityError
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from accounts.models import House, UserHouse
from accounts.serializers import HouseSerializer

class AccountsViewSet(viewsets.GenericViewSet):
    serializer_class = HouseSerializer

    def get_serializer_class(self, *args, **kwargs):
        return self.serializer_class

    # POST /api/v1/house/
    def create(self, request, *args, **kwargs):
        user = request.user
        if not user.is_authenticated:
            return Response(status=status.HTTP_403_FORBIDDEN)

        name = request.data.get('name')
        introduction = request.data.get('introduction')

        if not name:
            return Response({'error': "House 이름을 입력하세요."}, status=status.HTTP_400_BAD_REQUEST)
        
        if not House.objects.filter(name=name, is_hidden=False).exists():
            house = House.objects.create(name=name, introduction=introduction)
        else:
            return Response(status=status.HTTP_409_CONFLICT)
        
        UserHouse.objects.create(user=user, house=house, leader=True)

        return Response(self.get_serializer(house).data, status=status.HTTP_201_CREATED)

    # DELETE /api/v1/house/{house_id}/
    def destroy(self, request, pk=None):
        user = request.user
        if not user.is_authenticated:
            return Response(status=status.HTTP_403_FORBIDDEN)

        try:
            house = House.objects.get(pk=pk, is_hidden=False)
            user_house = UserHouse.objects.get(user=user, house=house)
        except House.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except UserHouse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        if user_house.leader:
           house.is_hidden = True
           house.save()
           return Response(status=status.HTTP_204_NO_CONTENT)

        else:
          return Response({'error': 'Leader 유저만 House를 삭제할 수 있습니다'}, status=status.HTTP_400_BAD_REQUEST)
    
    # JOIN /api/v1/house/{house_id}/join/
    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        user = request.user
        if not user.is_authenticated:
            return Response(status=status.HTTP_403_FORBIDDEN)

        try:
            house = House.objects.get(id=pk, is_hidden=False)
            user_house = UserHouse.objects.create(user=user, house=house)
        except House.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except IntegrityError:
            return Response(status=status.HTTP_409_CONFLICT)
        
        return Response(self.get_serializer(house).data)

    # DELETE /api/v1/house/{house_id}/leave/
    @action(detail=True, methods=['delete'])
    def leave(self, request, pk=None):
        user = request.user
        if not user.is_authenticated:
            return Response(status=status.HTTP_403_FORBIDDEN)

        try:
            user_house = UserHouse.objects.get(user=user, house_id=pk)
        except UserHouse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        if not user_house.leader:
            user_house.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        else:
            return Response({'error': 'Leader 유저이므로 House를 떠날 수 없습니다. Leader를 다른 User에게 양도한 뒤 다시 시도해 주세요'}, status=status.HTTP_400_BAD_REQUEST)

    # GET /api/v1/house/
    def list(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response(status=status.HTTP_403_FORBIDDEN)

        houses = House.objects.filter(users__user=user, is_hidden=False)

        return Response(self.get_serializer(houses, many=True).data)
