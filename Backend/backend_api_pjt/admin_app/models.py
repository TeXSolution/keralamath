from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Students(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"