from django.urls import path
from .views import *

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # path('/',),
    path('register-student/', RegisterStudentAPIView.as_view(), name='register-student'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/students/', ListStudentsAPIView.as_view(), name='list-students'),

    path('api/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
