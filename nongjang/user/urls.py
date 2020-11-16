from django.urls import include, path
from rest_framework.routers import SimpleRouter
from user.views import UserViewSet, UserActivate

app_name = 'user'

router = SimpleRouter()
router.register('user', UserViewSet, basename='user')

urlpatterns = [
    path('', include((router.urls))),
    path('user/activate/<str:uibd64>/<str:token>', UserActivate.as_view())
]
