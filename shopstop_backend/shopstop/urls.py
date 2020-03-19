from rest_framework import routers

from .views import GroupViewSet, ListItemViewSet, ListViewSet, UserViewSet

router = routers.DefaultRouter()
router.register("lists", ListViewSet)
router.register("list-items", ListItemViewSet)
router.register("groups", GroupViewSet)
router.register("users", UserViewSet)
urlpatterns = router.urls
