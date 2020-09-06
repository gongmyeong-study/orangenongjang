from django.db import IntegrityError
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from necessity.serializers import NecessitySerializer, NecessityUserLogSerializer
from necessity.models import Necessity, NecessityUser, NecessityUserLog


class NecessityViewSet(viewsets.GenericViewSet):
    queryset = Necessity.objects.all()
    serializer_class = NecessitySerializer

    def get_serializer_class(self, *args, **kwargs):
        if self.action == 'log':
            return NecessityUserLogSerializer
        return self.serializer_class

    # POST /api/v1/necessity/
    def create(self, request, *args, **kwargs):
        user = request.user
        if not user.is_authenticated:
            return Response(status=status.HTTP_403_FORBIDDEN)

        name = request.data.get('name')
        option = request.data.get('option')
        description = request.data.get('description')
        price = request.data.get('price')

        if not name:
            return Response({'error': "생필품 이름을 입력하세요."}, status=status.HTTP_400_BAD_REQUEST)

        necessity, created = Necessity.objects.get_or_create(name=name, option=option,
                                                             description=description, price=price)

        try:
            NecessityUser.objects.create(user=user, necessity=necessity)
        except IntegrityError:
            return Response(status=status.HTTP_409_CONFLICT)

        # create log when user create necessity
        NecessityUserLog.objects.create(user=user, necessity=necessity, activity_category=NecessityUserLog.CREATE)

        necessities = Necessity.objects.filter(users__user=user)
        return Response(self.get_serializer(necessities, many=True).data, status=status.HTTP_201_CREATED)

    # GET /api/v1/necessity/
    def list(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response(status=status.HTTP_403_FORBIDDEN)

        necessities = Necessity.objects.filter(users__user=user)

        return Response(self.get_serializer(necessities, many=True).data)

    # PUT /api/v1/necessity/{necessity_user_id}/
    def update(self, request, pk=None, **kwargs):
        user = request.user
        name = request.data.get('name')
        if not name:
            return Response({'error': "생필품 이름을 입력하세요."}, status=status.HTTP_400_BAD_REQUEST)

        option = request.data.get('option')
        description = request.data.get('description')
        price = request.data.get('price')

        try:
            necessity_user = NecessityUser.objects.get(pk=pk)
        except NecessityUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        necessity_new, created = Necessity.objects.get_or_create(name=name, option=option,
                                                                 description=description, price=price)

        if created or necessity_user.necessity_id != necessity_new.id:
            # create log when user newly update necessity
            NecessityUserLog.objects.create(user=user, necessity=necessity_user.necessity,
                                            activity_category=NecessityUserLog.UPDATE)
        else:
            return Response({'error': "수정된 사항이 없습니다."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            necessity_user.user = user
            necessity_user.necessity = necessity_new
            necessity_user.save()
        except IntegrityError:
            return Response({'error': "이미 존재하는 생필품입니다."}, status=status.HTTP_409_CONFLICT)

        return Response(self.get_serializer(necessity_user.necessity).data)

    # PUT /api/v1/necessity/{necessity_user_id}/count/
    @action(detail=True, methods=['PUT'])
    def count(self, request, pk=None):
        try:
            count = int(request.data.get('count'))
            if count < 0:
                return Response({'error': "0 이상의 정수를 입력하세요."}, status=status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response({'error': "0 이상의 정수를 입력하세요."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            necessity_user = NecessityUser.objects.get(pk=pk)
        except NecessityUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        necessity_user.count = count
        necessity_user.save()

        return Response(self.get_serializer(necessity_user.necessity).data)

    # DELETE /api/v1/necessity/{necessity_user_id}/
    def destroy(self, request, pk=None):
        user = request.user

        try:
            necessity_user = NecessityUser.objects.get(pk=pk)

        except NecessityUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        NecessityUserLog.objects.create(user=necessity_user.user, necessity=necessity_user.necessity,
                                        activity_category=NecessityUserLog.DELETE)
        necessity_user.delete()
        necessities = Necessity.objects.filter(users__user=user)
        return Response(self.get_serializer(necessities, many=True).data)

    # GET /api/v1/necessity/log/
    @action(methods=['get'], detail=False)
    def log(self, request):
        logs = NecessityUserLog.objects.all()

        if not logs.exists():
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(self.get_serializer(logs, many=True).data)
