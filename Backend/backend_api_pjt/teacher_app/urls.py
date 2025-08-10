from django.urls import path,include
from .views import *

urlpatterns = [
    path('api/subjects/listing/', SubjectListAPIView.as_view(), name='plus-one-subjects'),


]
