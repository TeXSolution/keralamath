from django.urls import path,include
from .views import *

urlpatterns = [
    path('api/subjects/listing/', SubjectListAPIView.as_view(), name='one-view'),

    # CHAPTER LIST URL 
    path('chapters/listing', ChapterListAPIView.as_view(), name='chapter-list'),  






]


