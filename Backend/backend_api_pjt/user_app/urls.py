from django.urls import path,include
from .views import *

urlpatterns = [
    # SUBJECT LISTING
    path('api/subjects/listing/', SubjectListByClassAndSyllabus.as_view(), name='plus-one-subjects'),

    # QUESTION LISTING
    path('api/questions/user/', QuestionListByChapter.as_view(), name='question-list'),

    # CHAPTER LISTING
    path('api/chapters/user', ChapterListBySubject.as_view(), name='chapter-list-by-subject'),




]
