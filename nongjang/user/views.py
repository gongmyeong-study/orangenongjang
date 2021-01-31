from django.conf import settings
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.sites.shortcuts import get_current_site
from django.core import mail
from django.core.mail import EmailMessage
from django.db import IntegrityError
from django.shortcuts import redirect
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from smtplib import SMTPException

from user.serializers import UserSerializer
from user.text import user_invite_message
from user.token import user_activation_token


class UserViewSet(viewsets.GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = request.data.get('email')
        if User.objects.filter(email=email).exists():
            return Response({'error': "이미 존재하는 Email입니다."}, status=status.HTTP_409_CONFLICT)

        try:
            user = serializer.save()
        except IntegrityError:
            return Response({'error': "같은 정보의 사용자가 이미 존재합니다."}, status=status.HTTP_400_BAD_REQUEST)

        with mail.get_connection():
            domain = request.build_absolute_uri('/api/v1/user')
            uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
            token = user_activation_token.make_token(user)
            message = user_invite_message(domain, uidb64, token, user)
            try:
                EmailMessage("오렌지농장에 초대합니다.", message, to=[email]).send()
            except SMTPException:
                return Response({'error': "Email 발송에 문제가 있습니다. 다시 시도해주세요."},
                                status=status.HTTP_503_SERVICE_UNAVAILABLE)
        return Response({'message': "회원 인증 메일이 전송되었습니다!"}, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['PUT'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if not user:
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                return Response(status=status.HTTP_403_FORBIDDEN)
            if not user.is_active:
                return Response({'error': "회원가입 인증이 완료되지 않았습니다."}, status=status.HTTP_401_UNAUTHORIZED)
            return Response(status=status.HTTP_403_FORBIDDEN)
        login(request, user)
        return Response(self.get_serializer(user).data)

    @action(detail=False, methods=['GET'])
    def logout(self, request):
        if request.user.is_authenticated:
            logout(request)
            return Response()
        return Response(status=status.HTTP_400_BAD_REQUEST)

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

    @action(detail=False, methods=['GET'])
    def activate(self, request, *args, **kwargs):
        """회원가입 메일 인증 API"""
        uidb64 = kwargs['uidb64']
        token = kwargs['token']
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.filter(id=uid).last()
        except (UnicodeDecodeError, ValueError):
            return Response({'error': "잘못된 접근입니다."}, status=status.HTTP_400_BAD_REQUEST)
        if user is None:
            return Response({'error': "잘못된 접근입니다."}, status=status.HTTP_400_BAD_REQUEST)
        if user.is_active:
            return Response({'error': "이미 인증된 회원입니다."}, status=status.HTTP_409_CONFLICT)

        if user_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
        else:
            return Response({'error': "유효하지 않은 키입니다."}, status=status.HTTP_400_BAD_REQUEST)
        return redirect(settings.REDIRECT_PAGE)
