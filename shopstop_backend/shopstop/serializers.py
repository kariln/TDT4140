from rest_framework import serializers

from .models import List, ListItem


class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = [
            'id',
            'name',
            'group',
            'created_at',
            'modified_at'
        ]


class SaveListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = [
            'name',
            'group',
        ]

    def create(self, validated_data):
        return List(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.group = validated_data.get('group', instance.group)
        instance.save()
        return instance


class ListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListItem
        fields = ['id', 'name', 'quantity', 'bought', 'list']
