from django.contrib.auth.models import User
from django.db import models

from house.models import House


class Necessity(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    option = models.CharField(max_length=100, blank=True, db_index=True)
    description = models.CharField(max_length=500, blank=True)
    price = models.PositiveIntegerField(null=True)

    class Meta:
        unique_together = (
            ('name', 'option'),
        )


class NecessityHouse(models.Model):
    house = models.ForeignKey(House, related_name='necessity_houses', on_delete=models.CASCADE)
    necessity = models.ForeignKey(Necessity, related_name='necessity_houses', on_delete=models.CASCADE)
    description = models.CharField(max_length=500, blank=True)
    price = models.PositiveIntegerField(null=True)
    count = models.PositiveIntegerField(db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, db_index=True)

    class Meta:
        unique_together = (
            ('house', 'necessity'),
        )


class NecessityLog(models.Model):
    CREATE = 'CREATE'
    UPDATE = 'UPDATE'
    DELETE = 'DELETE'
    COUNT = 'COUNT'

    ACTIONS = (
        (CREATE, 'create'),
        (UPDATE, 'update'),
        (DELETE, 'delete'),
        (COUNT, 'count'),
    )

    action = models.CharField(max_length=50, choices=ACTIONS)
    necessity_house = models.ForeignKey(NecessityHouse, related_name='necessity_logs', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='necessity_logs', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
