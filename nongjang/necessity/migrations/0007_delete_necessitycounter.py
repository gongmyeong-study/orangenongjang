# Generated by Django 3.0.7 on 2020-08-24 08:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('necessity', '0006_remove_necessityuser_used'),
    ]

    operations = [
        migrations.DeleteModel(
            name='NecessityCounter',
        ),
    ]
