from rest_framework import serializers
from admin_app.models import ClassLevel

class ClassLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassLevel
        fields = '__all__'