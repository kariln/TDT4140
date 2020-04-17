from django.contrib.auth.models import Group, Permission, User
from django.contrib.contenttypes.models import ContentType
from django.db.models import Q
from guardian.shortcuts import assign_perm
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import List, ListItem


class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        read_only_fields = ["created_at", "modified_at"]
        fields = [
            "id",
            "name",
            "group",
        ]
        read_only_fields = ["modified_at", "created_at"]

    def create(self, validated_data):
        """
        Create and return a new 'List' instance, given validated data.
        """
        return List.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return and existing 'List' instance, given validated data.
        """
        instance.name = validated_data.get("name", instance.name)
        instance.group = validated_data.get("group", instance.group)
        instance.save()
        return instance


class ListItemSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        """
        Create and return a new 'List item' instance, given validated data.
        """
        return ListItem.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return and existing 'List item' instance, given validated data.
        """
        instance.name = validated_data.get("name", instance.name)
        instance.quantity = validated_data.get("quantity", instance.quantity)
        instance.bought = validated_data.get("bought", instance.bought)
        instance.list = validated_data.get("list", instance.list)
        instance.save()
        return instance

    class Meta:
        model = ListItem
        fields = ["id", "name", "quantity", "bought", "list"]


class GroupSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        """
        Create and return a new 'Group' instance, given validated data.
        """
        group = Group.objects.create(**validated_data)
        assign_perm("view_group", self.context["user"], group)
        assign_perm("change_group", self.context["user"], group)
        assign_perm("add_group", self.context["user"], group)
        assign_perm("delete_group", self.context["user"], group)
        self.context["user"].groups.add(group)
        self.context["user"].save()
        return group

    def update(self, instance, validated_data):
        """
        Update and return and existing 'Group' instance, given validated data.
        """
        instance.name = validated_data.get("name", instance.name)
        instance.save()
        return instance

    class Meta:
        model = Group
        fields = ["id", "name"]


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(min_length=7)

    def create(self, validated_data):
        """
        Create and return a new 'User' instance, given validated data.
        """
        user = User.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"],
        )

        permissions = Permission.objects.filter(
            Q(content_type=ContentType.objects.get_for_model(List))
            | Q(content_type=ContentType.objects.get_for_model(ListItem))
            | Q(content_type=ContentType.objects.get_for_model(Group))
        )

        for perm in permissions:
            user.user_permissions.add(perm)
        user.save()
        return user

    class Meta:
        model = User
        fields = ("id", "username", "email", "password")
