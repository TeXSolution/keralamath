from django.urls import path,include
from .views import *

urlpatterns = [
    path('api/subjects/listing/', SubjectListByClassAndSyllabus.as_view(), name='plus-one-subjects'),


]
