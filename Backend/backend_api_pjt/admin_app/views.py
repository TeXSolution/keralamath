from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny,IsAdminUser
from .serializers import StudentsSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import *
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











