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

        try:
            necessity_user = NecessityUser.objects.get(pk=pk)

        except NecessityUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        name = request.data.get('name')

        if not name:
            return Response({'error': "생필품 이름을 입력하세요."}, status=status.HTTP_400_BAD_REQUEST)

        option = request.data.get('option')
        description = request.data.get('description')
        price = request.data.get('price')

        necessity_old = necessity_user.necessity
        necessity_new, created = Necessity.objects.get_or_create(name=name, option=option,
                                                                 description=description, price=price)

        NecessityUser.objects.filter(pk=pk).update(user=user, necessity=necessity_new)

        # create log when user update necessity
        NecessityUserLog.objects.create(user=user, necessity=necessity_old, activity_category=NecessityUserLog.UPDATE)

        necessity_user = NecessityUser.objects.get(pk=pk)
        return Response(self.get_serializer(necessity_user.necessity, many=False).data)

    # DELETE /api/v1/necessity/{necessity_id}/
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
