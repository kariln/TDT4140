from rest_framework import routers
from .views import ListViewSet
router = routers.DefaultRouter()
router.register(r'lists', ListViewSet)

urlpatterns = router.urls
