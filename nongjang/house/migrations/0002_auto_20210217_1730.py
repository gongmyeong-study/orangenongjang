# Generated by Django 3.0.7 on 2021-02-17 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('house', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='place',
            name='is_hidden',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterUniqueTogether(
            name='place',
            unique_together=set(),
        ),
    ]
