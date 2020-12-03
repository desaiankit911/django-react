from os import write
from django.db import models
from rest_framework_mongoengine import serializers, fields
from rest_framework import fields
from .models import UserInfo
import pymongo
from rest_framework_mongoengine.fields import ObjectIdField
from pymongo import MongoClient
client = MongoClient()
db = client.lightning


class UserSerializer(serializers.DocumentSerializer):

    class Meta:
        model = UserInfo
        # fields = ['username', 'password', 'email']
        fields = "__all__"
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'write_only': True},
        }

    def validate(self, attrs):
        email = attrs.get('email', '')
        user = db.user_info.find_one({'email': email})
        if user == None:
            return super().validate(attrs)
        else:
            raise serializers.serializers.ValidationError(
                {'msg': 'Email Already Exist'})

    def create(self, validated_data):
        user_info = UserInfo(
            user_name=validated_data['user_name'], email=validated_data['email'], password=validated_data['password'])
        return user_info.save()
