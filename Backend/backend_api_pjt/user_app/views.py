from django.shortcuts import render

# Create your views here.
# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,permissions
from admin_app.models import *
from .serializers import SubjectSerializer

from rest_framework_simplejwt.authentication import JWTAuthentication

class SubjectListByClassAndSyllabus(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        level = request.query_params.get('level')
        syllabus = request.query_params.get('syllabus')

        print(level)
        print(syllabus)

        if not level or not syllabus:
            return Response({'error': 'Both level and syllabus are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            class_level = ClassLevel.objects.get(level=level, syllabus=syllabus)
        except ClassLevel.DoesNotExist:
            return Response({'error': 'Class level with the given level and syllabus not found.'}, status=status.HTTP_404_NOT_FOUND)

        subjects = Subject.objects.filter(class_level=class_level)
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)