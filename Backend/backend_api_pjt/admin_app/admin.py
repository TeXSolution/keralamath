from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Students)
admin.site.register(Chapter)
admin.site.register(Question)
admin.site.register(Option)
admin.site.register(UserProgress)
admin.site.register(ClassLevel)