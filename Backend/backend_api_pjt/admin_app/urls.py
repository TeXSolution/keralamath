from django.urls import path
from .views import *

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # path('/',),
    path('register-student/', RegisterStudentAPIView.as_view(), name='register-student'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/students/', ListStudentsAPIView.as_view(), name='list-students'),

    path('api/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('api/classlevels/',ClassLevelViewSet.as_view({'get': 'list', 'post': 'create'}), name='classlevel-list'),

    path('api/subjects/', SubjectViewSet.as_view({'get': 'list', 'post': 'create'}), name='subject-list'),
    path('api/subjects/<int:pk>/', SubjectViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='subject-detail'),
    
    path('api/chapters/', ChapterViewSet.as_view({'get': 'list', 'post': 'create'}), name='chapter-list'),
    path('api/chapters/<int:pk>/', ChapterViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='chapter-detail'),
    
    path('api/questions/', QuestionViewSet.as_view({'get': 'list', 'post': 'create'}), name='question-list'),
    path('api/questions/<int:pk>/', QuestionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='question-detail'),
    


    path('api/user-progress/', UserProgressViewSet.as_view({'get': 'list', 'post': 'create'}), name='user-progress-list'),
    path('api/user-progress/<int:pk>/', UserProgressViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='user-progress-detail'),
]
