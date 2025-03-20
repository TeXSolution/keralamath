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


class ClassLevel(models.Model):
    LEVEL_CHOICES = [
        ('PlusOne', 'Plus One'),
        ('PlusTwo', 'Plus Two'),
    ]
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, unique=True)

    def __str__(self):
        return self.level

class Subject(models.Model):
    class_level = models.ForeignKey(ClassLevel, on_delete=models.CASCADE, related_name='subjects')
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name
    


class Chapter(models.Model):
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='chapters')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return f'{self.subject.name} - {self.name}'
    
    class Meta:
        ordering = ['id']

class Question(models.Model):
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    answer_text = models.TextField()
    order = models.PositiveIntegerField()

    class Meta:
        unique_together = ('chapter', 'order')
        ordering = ['order']

    def __str__(self):
        return f'Q{self.order}: {self.question_text[:50]}'
    

class Option(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='options')
    option_text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f'Option: {self.option_text} (Correct: {self.is_correct})'

class UserProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)
    last_completed_question = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ('user', 'chapter')

    def __str__(self):
        return f'{self.user.username} - {self.chapter.name} - Last: {self.last_completed_question}'