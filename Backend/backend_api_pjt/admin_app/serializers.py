from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

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
    

class ClassLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassLevel
        # fields = ['id', 'level']
        fields = ['id', 'level', 'syllabus']



 



class SubjectSerializer(serializers.ModelSerializer):
    class_level = serializers.PrimaryKeyRelatedField(queryset=ClassLevel.objects.all())
    class_level_name = serializers.CharField(source='class_level.level', read_only=True)

    class Meta:
        model = Subject
        fields = ['id', 'name', 'description', 'class_level','class_level_name']


class ChapterSerializer(serializers.ModelSerializer):
    subject = serializers.PrimaryKeyRelatedField(queryset=Subject.objects.all())
    class Meta:
        model = Chapter
        fields = ['id', 'name', 'description', 'subject']


 

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'question_text', 'answer_text', 'order', 'chapter']

class UserProgressSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    chapter = ChapterSerializer(read_only=True)

    class Meta:
        model = UserProgress
        fields = ['user', 'chapter', 'last_completed_question']
