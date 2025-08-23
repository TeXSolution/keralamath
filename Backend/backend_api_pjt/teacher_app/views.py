from django.shortcuts import render
from admin_app.models import *




# Create your views here.


# PERMISTION
class AdminOnlyPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_staff



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





# CHAPTER LIST VIEW 
class ChapterListAPIView(APIView):
    def get(self, request, subject_id=None):
        if subject_id:
            chapters = Chapter.objects.filter(subject_id=subject_id)
        else:
            chapters = Chapter.objects.all()
        serializer = ChapterSerializer(chapters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

# CHAPTER  QUESTION VIEW
class ChapterQuestionsAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, AdminOnlyPermission]  

    # GET METHOD
    def get(self, request, chapter_id):
        chapter = get_object_or_404(Chapter, id=chapter_id)
        questions = Question.objects.filter(chapter=chapter).order_by('order')
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    # post method view
    def post(self, request, chapter_id):
        chapter = get_object_or_404(Chapter, id=chapter_id)
        questions = Question.objects.filter(chapter=chapter).order_by('order')
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

