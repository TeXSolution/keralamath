from django.shortcuts import render

# Create your views here.
# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,permissions
from admin_app.models import *
from .serializers import *
from django.shortcuts import get_object_or_404

from rest_framework_simplejwt.authentication import JWTAuthentication


# SUBJECT LISTING
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
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    







# QUSTIONS LISING
class QuestionListByChapter(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        print('question listing is working')
        chapter_id = request.query_params.get('chapter_id')

        if not chapter_id:
            return Response({'error': 'chapter_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        chapter = get_object_or_404(Chapter, id=chapter_id)

        questions = chapter.questions.all().order_by('order')
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class ChapterListBySubject(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        subject_name = request.query_params.get('subject')
        subject = get_object_or_404(Subject, name=subject_name)
        chapters = Chapter.objects.filter(subject=subject)
        serializer = ChapterSerializer(chapters, many=True)
        return Response(serializer.data)


