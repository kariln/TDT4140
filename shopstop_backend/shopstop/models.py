from django.contrib.auth.models import Group
from django.db import models
from django.utils import timezone
from guardian.shortcuts import assign_perm


class List(models.Model):
    name = models.CharField(max_length=100, verbose_name="Name of the list")
    group = models.ForeignKey(Group, on_delete=models.CASCADE)

    created_at = models.DateTimeField(editable=False)
    modified_at = models.DateTimeField()

    def save(self, *args, **kwargs):
        creation = False
        # if the item does not exist set created_at time
        if not self.id:
            creation = True
            self.created_at = timezone.now()
            self.modified_at = self.created_at

        # Update modified_at time
        self.modified_at = timezone.now()
        super(List, self).save(*args, **kwargs)
        if creation:
            self.setup_group_permissions()
        return self

    def __str__(self):
        return self.name

    def setup_group_permissions(self):
        assign_perm("view_list", self.group, self)
        assign_perm("change_list", self.group, self)
        assign_perm("add_list", self.group, self)
        assign_perm("delete_list", self.group, self)


class ListItem(models.Model):
    name = models.CharField(max_length=100, verbose_name="Name of the item")
    quantity = models.IntegerField(
        verbose_name="How many of the item to get", default=1
    )
    time_added = models.DateField(editable=False)
    bought = models.BooleanField(verbose_name="Item has been bought", default=False)
    list = models.ForeignKey(List, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        creation = False
        if not self.id:
            creation = True
            self.time_added = timezone.now()

        self.list.modified_at = timezone.now()
        self.list.save()
        super(ListItem, self).save(*args, **kwargs)
        if creation:
            self.setup_group_permissions()
        return self

    def __str__(self):
        return self.name

    def setup_group_permissions(self):
        assign_perm("view_listitem", self.list.group, self)
        assign_perm("change_listitem", self.list.group, self)
        assign_perm("add_listitem", self.list.group, self)
        assign_perm("delete_listitem", self.list.group, self)
