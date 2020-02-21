from rest_framework import routers

from .views import ListItemViewSet, ListViewSet

router = routers.DefaultRouter()
router.register('lists', ListViewSet)
router.register('list-items', ListItemViewSet)
urlpatterns = router.urls
