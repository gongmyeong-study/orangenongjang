from django.urls import include, path
from rest_framework.routers import SimpleRouter
from accounts.views import AccountsViewSet

app_name = 'accounts'

router = SimpleRouter()
router.register('accounts', AccountsViewSet, basename='accounts')  # /api/v1/accounts/

urlpatterns = [
    path('', include((router.urls))),
]
