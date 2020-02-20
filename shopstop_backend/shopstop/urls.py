from rest_framework import routers

from .views import ListItemViewSet, ListViewSet

router = routers.DefaultRouter()
router.register(r'lists', ListViewSet)
router.register('listItems', ListItemViewSet)
urlpatterns = router.urls
