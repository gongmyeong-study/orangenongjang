from django.contrib.auth.models import User
from django.db import models


class House(models.Model):
    name = models.CharField(max_length=50, unique=True)
    introduction = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)

class UserHouse(models.Model):
    user = models.ForeignKey(User, related_name="houses", on_delete=models.CASCADE)
    house = models.ForeignKey(House, related_name="users", on_delete=models.CASCADE)
    leader = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
