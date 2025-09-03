
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('admin_app.urls')),
    path('', include('user_app.urls')),
    path('', include('teachers_app.urls')),
]
