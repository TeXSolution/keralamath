from django.urls import path
from .views import *

urlpatterns = [
    # path('/',),
    path('register-student/', RegisterStudentAPIView.as_view(), name='register-student'),
    path('api/login/', LoginView.as_view(), name='login'),
]
