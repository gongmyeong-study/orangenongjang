from django.contrib.auth.models import User
from django.db import models


class House(models.Model):
    name = models.CharField(max_length=50)
    introduction = models.CharField(max_length=300, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_hidden = models.BooleanField(default=False)


class UserHouse(models.Model):
    user = models.ForeignKey(User, related_name="user_houses", on_delete=models.CASCADE)
    house = models.ForeignKey(House, related_name="user_houses", on_delete=models.CASCADE)
    is_leader = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (
            ('user', 'house'),
        )


class Place(models.Model):
    name = models.CharField(max_length=50)
    house = models.ForeignKey(House, related_name="places", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_hidden = models.BooleanField(default=False)
