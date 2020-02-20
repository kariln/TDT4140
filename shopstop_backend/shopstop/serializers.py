from rest_framework import serializers
from .models import List


class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = [
            'name',
            'group',
            'created_at',
            'modified_at'
        ]

    def create(self, validated_data):
        return List(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.group = validated_data.get('group', instance.group)
        instance.created_at = validated_data.get('created_at', instance.created_at)
        instance.modified_at = validated_data.get('modified_at', instance.modified_at)
        instance.save()
        return instance
