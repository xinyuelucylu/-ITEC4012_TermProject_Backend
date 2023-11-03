from django.db import models
from django.contrib.auth.models import User

class Colors(models.Model):
    english_word = models.CharField(max_length=100)
    french_translation = models.CharField(max_length=100)

    def __str__(self):
        return self.english_word

class Animals(models.Model):
    english_word = models.CharField(max_length=100)
    french_translation = models.CharField(max_length=100)

    def __str__(self):
        return self.english_word




class UserVocabulary(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    colors = models.ManyToManyField(Colors, related_name='colors')
    animals = models.ManyToManyField(Animals, related_name='animals')
