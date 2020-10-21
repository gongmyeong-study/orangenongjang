from django.urls import include, path
from rest_framework.routers import SimpleRouter
from house.views import HouseViewSet, HouseNecessityView, HouseNecessityCountView

app_name = 'house'

router = SimpleRouter()
router.register('house', HouseViewSet, basename='house')  # /api/v1/house/

urlpatterns = [
    path('', include((router.urls))),
    path('house/<int:house_id>/necessity/<int:necessity_id>/', HouseNecessityView.as_view()),
    path('house/<int:house_id>/necessity/<int:necessity_id>/count/', HouseNecessityCountView.as_view()),
]
