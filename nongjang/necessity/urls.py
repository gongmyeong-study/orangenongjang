from django.urls import include, path
from rest_framework.routers import SimpleRouter
from necessity.views import NecessityHouseViewSet

app_name = 'necessity'

router = SimpleRouter()
router.register('necessity_house', NecessityHouseViewSet, basename='necessity-house')  # /api/v1/necessity_house/

urlpatterns = [
    path('', include((router.urls))),
]
