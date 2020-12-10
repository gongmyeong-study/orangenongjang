from rest_framework import status, viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from necessity.models import Necessity
from necessity.serializers import NecessitySerializer


class NecessityViewSet(viewsets.GenericViewSet):
    queryset = Necessity.objects.all()
    serializer_class = NecessitySerializer
    permission_classes = (IsAuthenticated, )

    def get_permissions(self):
        if self.action == 'create':
            return IsAdminUser(),
        return super(NecessityViewSet, self).get_permissions()

    def create(self, request):
        """
        일반 유저용의 API가 아님.
        유저가 Necessity를 생성하는 것은 POST /api/v1/house/{house_id}/necessity/ 에서 necessity_id를 포함해 요청하는 경우.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        return Response(self.get_serializer(self.get_object()).data)

    def list(self, request):
        return Response(self.get_serializer(self.get_queryset(), many=True).data)

    def destroy(self, request, pk=None):
        necessity = self.get_object()
        necessity.is_hidden = True
        necessity.save()
        return Response(self.get_serializer(necessity).data)
