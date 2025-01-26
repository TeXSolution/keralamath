from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Students

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class StudentsSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Students
        fields = ['user', 'first_name', 'last_name', 'date_of_birth', 'address', 'phone_number', 'email']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        student = Students.objects.create(user=user, **validated_data)
        return student