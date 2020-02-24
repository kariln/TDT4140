from django.contrib.auth.models import Group
from django.db import models
from django.utils import timezone


class List(models.Model):
    name = models.CharField(max_length=100, verbose_name="Name of the list")
    group = models.ForeignKey(Group, on_delete=models.CASCADE)

    created_at = models.DateTimeField(editable=False)
    modified_at = models.DateTimeField()

    def save(self, *args, **kwargs):
        # if the item does not exist set created_at time
        if not self.id:
            self.created_at = timezone.now()

        # Update modified_at time
        self.modified_at = timezone.now()
        return super(List, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class ListItem(models.Model):
    name = models.CharField(max_length=100, verbose_name="Name of the item")
    quantity = models.IntegerField(verbose_name="How many of the item to get", default=1)
    time_added = models.DateField(editable=False)
    bought = models.BooleanField(verbose_name="Item has been bought", default=False)
    list = models.ForeignKey(List, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.id:
            self.time_added = timezone.now()

        self.list.modified_at = timezone.now()
        self.list.save()
        return super(ListItem, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
