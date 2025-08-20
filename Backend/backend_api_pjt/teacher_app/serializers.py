from rest_framework import serializers
from admin_app.models import *

class ClassLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassLevel
        fields = '__all__'


# SUBJECT SERIALISER
class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'class_level', 'name', 'description']


