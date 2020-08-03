from django.contrib.auth.models import User
from django.db import models


class Necessity(models.Model):
    name = models.CharField(max_length=200)
    option = models.CharField(max_length=100, null=True)
    description = models.CharField(max_length=500, null=True)
    price = models.PositiveIntegerField(null=True)


class NecessityUser(models.Model):
    user = models.ForeignKey(User, related_name='necessities', on_delete=models.CASCADE)
    necessity = models.ForeignKey(Necessity, related_name='users', on_delete=models.CASCADE)
    count = models.PositiveIntegerField(default=0)


