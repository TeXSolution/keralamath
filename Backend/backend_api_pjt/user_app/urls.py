from django.urls import path,include
from .views import *

urlpatterns = [
    # path('', include('user_app.urls')),
    path('api/subjects/listing/', SubjectListByClassAndSyllabus.as_view(), name='plus-one-subjects'),
]
