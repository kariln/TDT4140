from django.contrib.auth.models import Group
from guardian.shortcuts import assign_perm
from rest_framework import serializers

from .models import List, ListItem


class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        read_only_fields = ['created_at', 'modified_at']
        fields = [
            'name',
            'group',
        ]

    def create(self, validated_data):
        return List.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.group = validated_data.get('group', instance.group)
        instance.save()
        return instance


class ListItemSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        return ListItem.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.group = validated_data.get('quantity', instance.quantity)
        instance.save()
        return instance

    class Meta:
        model = ListItem
        fields = ['id', 'name', 'quantity', 'bought', 'list']


class GroupSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        group = Group.objects.create(**validated_data)
        assign_perm('view_group', self.context['user'], group)
        assign_perm('change_group', self.context['user'], group)
        assign_perm('add_group', self.context['user'], group)
        assign_perm('delete_group', self.context['user'], group)
        return group

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance

    class Meta:
        model = Group
        fields = ['id', 'name']
