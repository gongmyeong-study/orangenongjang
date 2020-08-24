from django.contrib.auth.models import User
from django.db import models


class Necessity(models.Model):
    name = models.CharField(max_length=200)
    option = models.CharField(max_length=100, blank=True, default='')
    description = models.CharField(max_length=500, blank=True, default='')
    price = models.PositiveIntegerField(null=True)


class NecessityUser(models.Model):
    user = models.ForeignKey(User, related_name='necessities', on_delete=models.CASCADE)
    necessity = models.ForeignKey(Necessity, related_name='users', on_delete=models.CASCADE)
    count = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = [
            ['user', 'necessity'],
        ]


class NecessityUserLog(models.Model):
    CREATE = 'CREATE'
    UPDATE = 'UPDATE'
    DELETE = 'DELETE'
    CHANGE = 'CHANGE'

    ACTIVITY_CATEGORY = (
        (CREATE, 'Create'),
        (UPDATE, 'Update'),
        (DELETE, 'Delete'),
        (CHANGE, 'Change'),
    )

    activity_category = models.CharField(max_length=50, choices=ACTIVITY_CATEGORY, default=CHANGE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    necessity = models.ForeignKey(Necessity, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
