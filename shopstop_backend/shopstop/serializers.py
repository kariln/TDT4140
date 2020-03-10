from django.contrib.auth.models import Group, User, Permission
from guardian.shortcuts import assign_perm
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from .models import List, ListItem


class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        read_only_fields = ['created_at', 'modified_at']
        fields = [
            'id',
            'name',
            'group',
        ]
        read_only_fields = [
            'modified_at',
            'created_at'
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


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    username = serializers.CharField(validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(min_length=7)
    
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],validated_data['email'], validated_data['password'])
        permissions = Permission.objects.filter(Q(codename__contains=list) | Q(codename__contains=listitem))
        user.user_permissions.add(permissions)
        return user
        
    class Meta:
            model = User
            fields = ('id', 'username', 'email', 'password')