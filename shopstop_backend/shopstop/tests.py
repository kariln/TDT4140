import datetime
from unittest import mock

from django.contrib.auth.models import Group, Permission, User
from django.test import TestCase
from guardian.shortcuts import assign_perm, get_perms
from pytz import timezone
from rest_framework.test import APIRequestFactory, force_authenticate

from shopstop.serializers import GroupSerializer
from shopstop.views import GroupViewSet

from .models import List, ListItem


class ListModelTest(TestCase):
    mocked_time = datetime.datetime(2020, 2, 12, 0, 0, 0, 0, tzinfo=timezone("UTC"))
    mocked_time2 = datetime.datetime(2020, 2, 13, 0, 0, 0, 0, tzinfo=timezone("UTC"))

    def setUp(self):
        Group.objects.create(name="Group 1")
        with mock.patch("django.utils.timezone.now", return_value=self.mocked_time):
            List.objects.create(name="list 1", group=Group.objects.get(name="Group 1"))

    # Test the automatically set created_at field
    def test_create_new_object(self):

        with mock.patch("django.utils.timezone.now", return_value=self.mocked_time):
            instance = List.objects.create(
                name="list 2", group=Group.objects.get(name="Group 1")
            )

            # Check permissions
            group = Group.objects.get(name="Group 1")
            self.assertIn("view_list", get_perms(group, instance))
            self.assertIn("change_list", get_perms(group, instance))
            self.assertIn("add_list", get_perms(group, instance))
            self.assertIn("delete_list", get_perms(group, instance))

            # CHeck created_at
            self.assertEqual(instance.created_at.date(), self.mocked_time.date())

    # Test the automatically set modified_at and created_at field
    def test_save_existing_object(self):
        with mock.patch("django.utils.timezone.now", return_value=self.mocked_time2):
            instance = List.objects.get(name="list 1")
            instance.name = "List 1 updated"
            instance.save()
            instance = List.objects.get(name="List 1 updated")
            self.assertEqual(instance.created_at.date(), self.mocked_time.date())
            self.assertEqual(instance.modified_at.date(), self.mocked_time2.date())


class ListItemModelTest(TestCase):
    mocked_time = datetime.datetime(2020, 2, 12, 0, 0, 0, 0)
    mocked_time2 = datetime.datetime(2020, 2, 13, 0, 0, 0, 0)

    def setUp(self):
        test_group = Group.objects.create(name="Group 1")

        with mock.patch(
            "django.utils.timezone.now", mock.Mock(return_value=self.mocked_time)
        ):
            List.objects.create(name="list 1", group=test_group)

    def test_save(self):
        with mock.patch(
            "django.utils.timezone.now", mock.Mock(return_value=self.mocked_time2)
        ):
            instance = ListItem.objects.create(
                name="test_item", list=List.objects.get(name="list 1")
            )

            group = Group.objects.get(name="Group 1")
            self.assertIn("view_listitem", get_perms(group, instance))
            self.assertIn("change_listitem", get_perms(group, instance))
            self.assertIn("add_listitem", get_perms(group, instance))
            self.assertIn("delete_listitem", get_perms(group, instance))

            self.assertEqual(
                List.objects.get(name="list 1").modified_at.date(),
                self.mocked_time2.date(),
            )


class GroupViewSetTest(TestCase):
    factory = APIRequestFactory()

    def setUp(self):
        self.user = User.objects.create_user(
            username="test", email="test@shopstop.xyz", password="test1234"
        )
        self.user2 = User.objects.create_user(
            username="pls_invite_me", email="test@gmail.com", password="test1234"
        )
        self.user.user_permissions.set(
            [
                Permission.objects.get(name="Can view group"),
                Permission.objects.get(name="Can change group"),
                Permission.objects.get(name="Can add group"),
                Permission.objects.get(name="Can delete group"),
            ]
        )
        Group.objects.create(name="Group 1")
        Group.objects.create(name="Group 2")

        self.user_group0 = Group.objects.create(name="Group 3")
        user_group1 = Group.objects.create(name="Group 4")
        self.user_group2 = Group.objects.create(name="Group 5")

        self.user_group0.user_set.add(self.user)
        assign_perm("view_group", self.user, self.user_group0)
        assign_perm("change_group", self.user, self.user_group0)
        self.user_group0.save()

        user_group1.user_set.add(self.user)
        assign_perm("view_group", self.user, user_group1)
        assign_perm("change_group", self.user, user_group1)
        user_group1.save()

        assign_perm("view_group", self.user, self.user_group2)
        assign_perm("change_group", self.user, self.user_group2)

    def test_list_current_users_group(self):
        request = self.factory.get("/groups//current_user_groups/")
        force_authenticate(request, self.user)
        view = GroupViewSet.as_view({"get": "current_user_groups"})
        response = view(request)
        serializer = GroupSerializer(self.user.groups.all(), many=True)
        self.assertEqual(response.data, serializer.data)

    def test_join_group(self):
        request = self.factory.post(
            "/groups/{}/add_current_user_to_group/".format(self.user_group2.pk)
        )
        force_authenticate(request, self.user)
        view = GroupViewSet.as_view({"post": "add_current_user_to_group"})

        self.assertFalse(self.user.groups.filter(pk=self.user_group2.pk).exists())
        view(request, pk=self.user_group2.pk)
        self.assertTrue(self.user.groups.filter(pk=self.user_group2.pk).exists())

    def test_invite_to_group(self):
        request = self.factory.post(
            "/groups/{}/invite_user_to_group/".format(self.user_group2.pk),
            {"username": "pls_invite_me"},
        )
        force_authenticate(request, self.user)
        view = GroupViewSet.as_view({"post": "invite_user_to_group"})

        self.assertFalse(self.user2.has_perm("auth.view_group", self.user_group2))
        self.assertFalse(self.user2.has_perm("auth.change_group", self.user_group2))
        self.assertFalse(self.user2.has_perm("auth.add_group", self.user_group2))
        self.assertFalse(self.user2.has_perm("auth.delete_group", self.user_group2))
        view(request, pk=self.user_group2.pk)
        self.assertTrue(self.user2.has_perm("auth.view_group", self.user_group2))
        self.assertTrue(self.user2.has_perm("auth.change_group", self.user_group2))
        self.assertTrue(self.user2.has_perm("auth.add_group", self.user_group2))
        self.assertTrue(self.user2.has_perm("auth.delete_group", self.user_group2))
