from django.urls import include, path
from rest_framework.routers import SimpleRouter
from accounts.views import AccountsViewSet

app_name = 'accounts'

router = SimpleRouter()
router.register('house', AccountsViewSet, basename='house')  # /api/v1/house/

urlpatterns = [
    path('', include((router.urls))),
]
