from django.shortcuts import render
from admin_app.models import *


from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from admin_app.serializers import *
from rest_framework import status
from rest_framework import generics
# Create your views here.



# class list view
class ClassLevelListView(APIView):
    def get(self, request):
        class_levels = ClassLevel.objects.all()
        serializer = ClassLevelSerializer(class_levels, many=True)
        return Response(serializer.data)
    


# GENERIC VIEW
class SubjectListAPIView(generics.ListAPIView):
    serializer_class = SubjectSerializer

    def get_queryset(self):
        class_level_id = self.kwargs.get('class_level_id')
        if class_level_id:
            return Subject.objects.filter(class_level_id=class_level_id)
        return Subject.objects.all()





