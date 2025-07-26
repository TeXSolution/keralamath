from django.urls import path
from .views import *

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # path('/',),
    path('register-student/', RegisterStudentAPIView.as_view(), name='register-student'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/students/', ListStudentsAPIView.as_view(), name='list-students'),

    path('api/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('api/classlevels/',ClassLevelAPIView.as_view(), name='classlevel-list'),

    path('api/subjects/', SubjectAPIView.as_view(), name='subject-list'),
    path('api/subjects/<int:pk>/', SubjectAPIView.as_view(), name='subject-detail'),
    
    path('api/chapters/', SubjectChaptersAPIView.as_view(), name='chapter-list'),
    path('api/chapters/<int:subject_id>/', SubjectChaptersAPIView.as_view(), name='chapter-detail'),
    
    path('api/questions/', QuestionViewSet.as_view({'get': 'list', 'post': 'create'}), name='question-list'),
    path('api/questions/<int:pk>/', QuestionViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='question-detail'),
    



    path('api/chapters/<int:chapter_id>/questions/', ChapterQuestionsAPIView.as_view(), name='chapter-questions'),
    path('api/chapters/create/', CreateChapterAPIView.as_view(), name='create-chapter'),

    path('api/questions/create/', QuestionCreateAPIView.as_view(), name='question-create'),




    path('api/user-progress/', UserProgressViewSet.as_view({'get': 'list', 'post': 'create'}), name='user-progress-list'),
    path('api/user-progress/<int:pk>/', UserProgressViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='user-progress-detail'),


    path('api/subjects/<str:syllabus>/<str:level>/', FilteredSubjectListAPIView.as_view(), name='filtered-subjects'),
    path('api/questions/<int:chapter_id>/', ChapterQuestionListAPIView.as_view())
]
