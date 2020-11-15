from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from user.serializers import UserSerializer


class UserViewSet(viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated, )
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_permissions(self):
        return self.permission_classes

    # POST /api/v1/user/
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # username = request.data.get('username')
        # email = request.data.get('email')
        # password = request.data.get('password')
        #
        # if not username or not email or not password:
        #     return Response({'error': "정보를 모두 입력해주세요."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Django 내부에 기본으로 정의된 User에 대해서는 create가 아닌 create_user를 사용
            # password가 자동으로 암호화되어 저장됨. database를 직접 조회해도 알 수 없는 형태로 저장됨.
            # user = User.objects.create_user(username, email, password)
            user = serializer.save()
        except IntegrityError:  # 중복된 username
            return Response({'error': "Email 또는 사용자명이 이미 존재합니다."}, status=status.HTTP_409_CONFLICT)

        # 가입했으니 바로 로그인 시켜주기
        login(request, user)
        # login을 하면 Response의 Cookies에 csrftoken이 발급됨
        # 이후 요청을 보낼 때 이 csrftoken을 Headers의 X-CSRFToken의 값으로 사용해야 POST, PUT 등의 method 사용 가능
        return Response(self.get_serializer(user).data, status=status.HTTP_201_CREATED)

    # PUT /api/v1/user/login/
    @action(detail=False, methods=['PUT'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # authenticate라는 함수는 username, password가 올바르면 해당 user를, 그렇지 않으면 None을 return
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            # login을 하면 Response의 Cookies에 csrftoken이 발급됨 (반복 로그인 시 매번 값이 달라짐)
            # 이후 요청을 보낼 때 이 csrftoken을 Headers의 X-CSRFToken의 값으로 사용해야 POST, PUT 등의 method 사용 가능
            return Response(self.get_serializer(user).data)
        # 존재하지 않는 사용자이거나 비밀번호가 틀린 경우
        return Response(status=status.HTTP_403_FORBIDDEN)

    # GET /api/v1/user/logout/
    @action(detail=False, methods=['GET'])
    def logout(self, request):
        if request.user.is_authenticated:
            logout(request)
            return Response()
        return Response(status=status.HTTP_400_BAD_REQUEST)

    # GET /api/v1/user/{pk}/
    def retrieve(self, request, pk=None):
        if pk == 'me':
            user = request.user
            if not request.user.is_authenticated:
                return Response(status=status.HTTP_403_FORBIDDEN)
        else:
            try:
                user = User.objects.get(id=pk)
            except User.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(self.get_serializer(user).data)
