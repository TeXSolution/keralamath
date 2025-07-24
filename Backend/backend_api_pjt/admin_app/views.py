from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny,IsAdminUser
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import *
from rest_framework import serializers, viewsets, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.shortcuts import get_object_or_404






# REGITER VIEW
class RegisterStudentAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = StudentsSerializer(data=request.data)

        if serializer.is_valid():
            student = serializer.save()

            return Response({
                "message": "Student registered successfully",
                "student": serializer.data
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# LOGIN VIEW
class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        print(username)
        print(password,'pass')

        user = authenticate(username=username, password=password)
        role = "superadmin" if user.is_superuser else "user"
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'role': role
            }, status=status.HTTP_200_OK)
        else:
            print('else is working')
            return Response(
                {"error": "Invalid username or password"},
                status=status.HTTP_401_UNAUTHORIZED
            )

# LISTING STUDENTS
class ListStudentsAPIView(APIView):
    permission_classes = [IsAdminUser]   

    def get(self, request, *args, **kwargs):
        students = Students.objects.all()
        serializer = StudentsSerializer(students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



# ADMIN PERMISION VIEW
class AdminOnlyPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_staff




# CLASS LEVEL SHOWING AND CREATING
class ClassLevelAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        class_levels = ClassLevel.objects.all()
        serializer = ClassLevelSerializer(class_levels, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ClassLevelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)







# SUBJECT CREATING AND GET API
class SubjectAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, AdminOnlyPermission]

    # GET
    def get(self, request):
        subjects = Subject.objects.all()
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    #  POST
    def post(self, request):
        print("Received data:", request.data)
        serializer = SubjectSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        if 'name' in serializer.errors and 'unique' in str(serializer.errors['name']):
            return Response({"error": "Subject name already exists. Please use a different name."},
                            status=status.HTTP_400_BAD_REQUEST)

        print("Serializer errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

# SUBJECT LISTING API
class SubjectChaptersAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, AdminOnlyPermission]

    def get(self, request, subject_id):
        print(subject_id,'id')
        print(request.user,'user')
        subject = get_object_or_404(Subject, id=subject_id)
        chapters = Chapter.objects.filter(subject=subject)
        serializer = ChapterSerializer(chapters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)




# QUESTION LISTING AND CREATING API
class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, AdminOnlyPermission]


# USER PROGRES VIEW
class UserProgressViewSet(viewsets.ModelViewSet):
    queryset = UserProgress.objects.all()
    serializer_class = UserProgressSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]






# CHAPTER  QUESTION VIEW
class ChapterQuestionsAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, AdminOnlyPermission]  

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





# CHAPTER CREATING API
class CreateChapterAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, AdminOnlyPermission] 

    def post(self, request):
        subject_id = request.data.get('subject')
        print(subject_id,'id')
        if not subject_id:
            return Response({'error': 'Subject ID is required'}, status=400)
        
        serializer = ChapterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Chapter created successfully', 'data': serializer.data}, status=201)
        return Response(serializer.errors, status=400)





# QUESTION CREATING API
class QuestionCreateAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, AdminOnlyPermission]

    def post(self, request):
        print('Received data:', request.data) 
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)   
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

