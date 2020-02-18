import datetime
from unittest import mock

from django.contrib.auth.models import Group
from django.test import TestCase
from pytz import timezone

from .models import List


class ModelTest(TestCase):
    mocked_time = datetime.datetime(2020, 2, 12, 0, 0, 0, 0, tzinfo=timezone('UTC'))
    mocked_time2 = datetime.datetime(2020, 2, 13, 0, 0, 0, 0, tzinfo=timezone('UTC'))

    def setUp(self):
        test_group = Group.objects.create()
        with mock.patch('django.utils.timezone.now', return_value=self.mocked_time):
            List.objects.create(name="list 1", group=test_group)

    # Test the automatically set created_at field
    def test_create_new_object(self):
        with mock.patch('django.utils.timezone.now', return_value=self.mocked_time):
            instance = List.objects.get(name="list 1")
            self.assertEqual(instance.created_at.date(), self.mocked_time.date())

    # Test the automatically set modified_at and created_at field
    def test_save_existing_object(self):
        with mock.patch('django.utils.timezone.now', return_value=self.mocked_time2):
            instance = List.objects.get(name="list 1")
            instance.name = "List 1 updated"
            instance.save()
            instance = List.objects.get(name="List 1 updated")
            self.assertEqual(instance.created_at.date(), self.mocked_time.date())
            self.assertEqual(instance.modified_at.date(), self.mocked_time2.date())
