from django.contrib.auth.models import Group, User
from django.shortcuts import get_object_or_404
from guardian.shortcuts import assign_perm, remove_perm
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import (AllowAny, DjangoModelPermissions,
                                        IsAdminUser)
from rest_framework.response import Response
from rest_framework_guardian import filters

from .models import List, ListItem
from .permissions import CustomObjectPermissions
from .serializers import (GroupSerializer, ListItemSerializer, ListSerializer,
                          UserSerializer)


class ListViewSet(viewsets.ModelViewSet):
    serializer_class = ListSerializer
    queryset = List.objects.all()
    permission_classes = [DjangoModelPermissions, CustomObjectPermissions]
    filter_backends = [filters.ObjectPermissionsFilter]

    @action(detail=False, methods=["get"])
    def list_by_group(self, request):
        """
        Endpoint needs a query parameter called group.
        It should have the id of the group you want to query in.\n
        The endpoint return lists that are connected to the group
        """
        group = request.query_params.get("group", None)
        self.queryset = self.queryset.filter(group=group)
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)


class ListItemViewSet(viewsets.ModelViewSet):
    queryset = ListItem.objects.all()
    serializer_class = ListItemSerializer
    permission_classes = [DjangoModelPermissions, CustomObjectPermissions]
    filter_backends = [filters.ObjectPermissionsFilter]

    @action(detail=False, methods=["get"])
    def list_items_by_list(self, request):
        """
        Endpoint needs a query parameter called list.
        It should have the id of the list you want to query in.\n
        The endpoint return listsitems that are connected to the lists
        """
        list = request.query_params.get("list", None)
        self.queryset = self.queryset.filter(list=list)
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)


class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [DjangoModelPermissions]
    filter_backends = [filters.ObjectPermissionsFilter]

    def get_serializer_context(self):
        return {"user": self.request.user}

    @action(detail=False, methods=["get"])
    def current_user_groups(self, request):
        """
            List all the groups of the currently logged in user.
        """
        return Response(self.get_serializer(request.user.groups, many=True).data)

    @action(detail=False, methods=["get"])
    def current_invited_user_groups(self, request):
        """
            List all the groups the currently invited user has been invited to.
        """
        groups = Group.objects.exclude(
            id__in=request.user.groups.all().values_list("id", flat=True)
        )
        result = []
        user = request.user
        # Not the best practice, but it works
        for group in groups.all():
            if user.has_perm("view_group", group):
                result.append(group)

        return Response(self.get_serializer(result, many=True).data)

    @action(detail=True, methods=["post"])
    def decline_group_invitation(self, request, pk):
        """
            Decline the invitation to selected group
        """
        user = request.user
        group = self.get_object()

        if user.has_perm("view_group", group):
            remove_perm("view_group", user, group)
        if user.has_perm("change_group", group):
            remove_perm("change_group", user, group)
        if user.has_perm("delete_group", group):
            remove_perm("delete_group", user, group)
        if user.has_perm("add _group", group):
            remove_perm("add_group", user, group)
        user.save()
        return Response({"status": "Invitation declined"})

    @action(detail=True, methods=["post"])
    def add_current_user_to_group(self, request, pk):
        """
            Join the group. The joining user needs to be invited by someone already in the group.
        """
        group = self.get_object()
        user = request.user
        user.groups.add(group)
        user.save()
        return Response({"status": "Added to group"})

    @action(detail=True, methods=["post"])
    def remove_current_user_from_group(self, request, pk):
        """
            Leave group. The currrently logged in user is removed from the group.
        """
        group = self.get_object()
        user = request.user
        user.groups.remove(group)
        user.save()
        return Response({"status": "Removed from group"})

    @action(detail=True, methods=["post"])
    def invite_user_to_group(self, request, pk):
        """
        Invite a user to the group. The user's username needs to be posted.
        """
        user = get_object_or_404(User, username=request.data.get("username"))
        group = self.get_object()

        if not user.has_perm("view_group", group):
            assign_perm("view_group", user, group)
        if not user.has_perm("change_group", group):
            assign_perm("change_group", user, group)
        if not user.has_perm("delete_group", group):
            assign_perm("delete_group", user, group)
        if not user.has_perm("add _group", group):
            assign_perm("add_group", user, group)
        return Response({"status": "User invited"})


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        """
        Give the necessary permissions to the user, If the user is not created allow it to be so
        """
        permission_classes = []
        if self.action == "create":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]
