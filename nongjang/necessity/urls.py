from django.urls import include, path
from rest_framework.routers import SimpleRouter
from necessity.views import NecessityViewSet

app_name = 'necessity'

router = SimpleRouter()
router.register('necessity', NecessityViewSet, basename='necessity')  # /api/v1/necessity/

urlpatterns = [
    path('', include((router.urls))),
]
