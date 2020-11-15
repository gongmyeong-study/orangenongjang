from django.contrib.auth.models import User
from django.db import models

from house.models import House, Place


class Necessity(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    option = models.CharField(max_length=100, blank=True, db_index=True)
    description = models.CharField(max_length=500, blank=True)
    price = models.PositiveIntegerField(null=True)
    is_hidden = models.BooleanField(default=False)

    class Meta:
        unique_together = (
            ('name', 'option'),
        )


class NecessityPlace(models.Model):
    place = models.ForeignKey(Place, related_name='necessity_places', on_delete=models.CASCADE)
    necessity = models.ForeignKey(Necessity, related_name='necessity_places', on_delete=models.CASCADE)
    description = models.CharField(max_length=500, blank=True)
    price = models.PositiveIntegerField(null=True)
    count = models.PositiveIntegerField(db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, db_index=True)

    class Meta:
        unique_together = (
            ('place', 'necessity'),
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
    house = models.ForeignKey(House, related_name='necessity_logs', on_delete=models.CASCADE)
    necessity_place = models.ForeignKey(NecessityPlace, null=True, related_name='necessity_logs',
                                        on_delete=models.SET_NULL)
    user = models.ForeignKey(User, related_name='necessity_logs', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
