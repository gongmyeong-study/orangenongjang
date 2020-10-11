from django.urls import include, path
from rest_framework.routers import SimpleRouter
from accounts.views import HouseViewSet

app_name = 'accounts'

router = SimpleRouter()
router.register('house', HouseViewSet, basename='house')  # /api/v1/house/

urlpatterns = [
    path('', include((router.urls))),
]
