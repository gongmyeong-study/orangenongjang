from django.contrib import auth
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.sites.shortcuts import get_current_site
from django.core import mail
from django.core.mail import EmailMessage
from django.db import IntegrityError
from django.shortcuts import redirect
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.views import View
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from smtplib import SMTPException

from nongjang.settings import REDIRECT_PAGE
from user.serializers import UserSerializer
from .token import user_activation_token
from user.text import user_invite_message


class UserViewSet(viewsets.GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    # POST /api/v1/user/
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = request.data.get('email')
        if User.objects.filter(email=email).exists():
            return Response({'error': "이미 존재하는 Email입니다."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = serializer.save()
        except IntegrityError:
            return Response({'error': "같은 정보의 사용자가 이미 존재합니다."}, status=status.HTTP_400_BAD_REQUEST)

        with mail.get_connection():
            domain = get_current_site(request).domain
            uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
            token = user_activation_token.make_token(user)
            message = user_invite_message(domain, uidb64, token)
            try:
                EmailMessage("오렌지농장에 초대합니다.", message, to=[email]).send()
                redirect(REDIRECT_PAGE)
                return Response({'message': "회원가입 인증 메일이 전송되었습니다"})
            except SMTPException:
                return Response({'error': "Email 발송에 문제가 있습니다. 다시 시도해주세요."},
                                status=status.HTTP_503_SERVICE_UNAVAILABLE)
        return Response(self.get_serializer(user).data, status=status.HTTP_201_CREATED)

    # PUT /api/v1/user/login/
    @action(detail=False, methods=['PUT'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # authenticate라는 함수는 username, password가 올바르면 해당 user를, 그렇지 않으면 None을 return
        user = authenticate(request, username=username, password=password)
        if user.is_active:
            login(request, user)
            # login을 하면 Response의 Cookies에 csrftoken이 발급됨 (반복 로그인 시 매번 값이 달라짐)
            # 이후 요청을 보낼 때 이 csrftoken을 Headers의 X-CSRFToken의 값으로 사용해야 POST, PUT 등의 method 사용 가능
            return Response(self.get_serializer(user).data)
        else:
            return Response({'error': "회원가입 인증이 완료되지 않았습니다."}, status=status.HTTP_401_UNAUTHORIZED)
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


class UserActivateView(viewsets.GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    # GET /api/v1/user/{uidb64}/activate/{token}/
    @action(detail=False, methods=['GET'])
    def activate(self, request, *args, **kwargs):
        uidb64 = kwargs['uidb64']
        token = kwargs['token']
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(id=uid)
        if user is None:
            return Response({'error': "잘못된 접근입니다."}, status=status.HTTP_401_UNAUTHORIZED)
        if user.is_active:
            return Response({'error': "이미 인증된 회원입니다."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            if user_activation_token.check_token(user, token):
                user.is_active = True
                user.save()
                return redirect(REDIRECT_PAGE)
        except KeyError:
            return Response({'error': "인증 키에 문제가 생겼습니다. 다시 시도해주세요."}, status=status.HTTP_400_BAD_REQUEST)
