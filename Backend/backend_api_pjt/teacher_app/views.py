from django.shortcuts import render
from admin_app.models import *

from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from admin_app.serializers import *
from rest_framework import status
# Create your views here.

# class list view
class ClassLevelListView(APIView):
    def get(self, request):
        class_levels = ClassLevel.objects.all()
        serializer = ClassLevelSerializer(class_levels, many=True)
        return Response(serializer.data)
    

class SubjectListAPIView(APIView):
    def get(self, request, class_level_id=None):
        if class_level_id:
            subjects = Subject.objects.filter(class_level_id=class_level_id)
        else:
            subjects = Subject.objects.all()
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)