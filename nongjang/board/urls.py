from django.urls import include, path
from rest_framework.routers import SimpleRouter
from board.views import UserViewSet

app_name = 'board'

router = SimpleRouter()
router.register('user', UserViewSet, basename='user')

urlpatterns = [
    path('', include((router.urls))),
]
