from django.urls import include, path
from rest_framework.routers import SimpleRouter
from user.views import UserViewSet, UserActivateView

app_name = 'user'

router = SimpleRouter()
router.register('user', UserViewSet, basename='user')  # /api/v1/user/

urlpatterns = [
    path('', include((router.urls))),
    path('user/<str:uidb64>/activate/<str:token>/', UserActivateView.as_view()),
]
