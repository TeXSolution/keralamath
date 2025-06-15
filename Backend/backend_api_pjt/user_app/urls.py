from django.urls import path,include
from .views import *

urlpatterns = [
    path('api/subjects/listing/', SubjectListByClassAndSyllabus.as_view(), name='plus-one-subjects'),

    path('api/questions/user/', QuestionListByChapter.as_view(), name='question-list'),

    path('api/chapters/user', ChapterListBySubject.as_view(), name='chapter-list-by-subject'),




]
