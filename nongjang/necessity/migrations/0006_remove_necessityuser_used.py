# Generated by Django 3.0.7 on 2020-08-20 08:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('necessity', '0005_necessityuser_used'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='necessityuser',
            name='used',
        ),
    ]
