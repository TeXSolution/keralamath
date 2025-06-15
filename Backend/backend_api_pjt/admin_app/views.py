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



# Create your views here.





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




class ListStudentsAPIView(APIView):
    permission_classes = [IsAdminUser]   

    def get(self, request, *args, **kwargs):
        print('get is working')
        students = Students.objects.all()
        serializer = StudentsSerializer(students, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)




class AdminOnlyPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_staff


# class ClassLevelViewSet(viewsets.ModelViewSet):
#     queryset = ClassLevel.objects.all()
#     serializer_class = ClassLevelSerializer
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [IsAuthenticated]

#     def create(self, request, *args, **kwargs):
#         print("Received data:", request.data)  # Debug print statement
#         return super().create(request, *args, **kwargs)




class ClassLevelAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        class_levels = ClassLevel.objects.all()
        serializer = ClassLevelSerializer(class_levels, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        print("Received data:", request.data)  # Debug print
        serializer = ClassLevelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# class SubjectViewSet(viewsets.ModelViewSet):
    
#     queryset = Subject.objects.all()
#     serializer_class = SubjectSerializer
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [IsAuthenticated, AdminOnlyPermission]

#     def create(self, request, *args, **kwargs):
#         print("Received data:", request.data)  # Debug print statement
#         return super().create(request, *args, **kwargs)





class SubjectAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, AdminOnlyPermission]

    def get(self, request):
        subjects = Subject.objects.all()
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

     


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

    

# class ChapterViewSet(viewsets.ModelViewSet):
#     queryset = Chapter.objects.all()
#     serializer_class = ChapterSerializer
#     authentication_classes = [JWTAuthentication]
#     permission_classes = [IsAuthenticated, AdminOnlyPermission]


class SubjectChaptersAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, AdminOnlyPermission]

    def get(self, request, subject_id):
        print(subject_id,'id')
        subject = get_object_or_404(Subject, id=subject_id)
        chapters = Chapter.objects.filter(subject=subject)
        serializer = ChapterSerializer(chapters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)





class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, AdminOnlyPermission]


class UserProgressViewSet(viewsets.ModelViewSet):
    queryset = UserProgress.objects.all()
    serializer_class = UserProgressSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]



















