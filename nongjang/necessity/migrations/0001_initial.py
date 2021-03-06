# Generated by Django 3.0.7 on 2020-11-15 04:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('house', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Necessity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=200)),
                ('option', models.CharField(blank=True, db_index=True, max_length=100)),
                ('description', models.CharField(blank=True, max_length=500)),
                ('price', models.PositiveIntegerField(null=True)),
                ('is_hidden', models.BooleanField(default=False)),
            ],
            options={
                'unique_together': {('name', 'option')},
            },
        ),
        migrations.CreateModel(
            name='NecessityPlace',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(blank=True, max_length=500)),
                ('price', models.PositiveIntegerField(null=True)),
                ('count', models.PositiveIntegerField(db_index=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True, db_index=True)),
                ('necessity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='necessity_places', to='necessity.Necessity')),
                ('place', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='necessity_places', to='house.Place')),
            ],
            options={
                'unique_together': {('place', 'necessity')},
            },
        ),
        migrations.CreateModel(
            name='NecessityLog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('action', models.CharField(choices=[('CREATE', 'create'), ('UPDATE', 'update'), ('DELETE', 'delete'), ('COUNT', 'count')], max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('house', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='necessity_logs', to='house.House')),
                ('necessity_place', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='necessity_logs', to='necessity.NecessityPlace')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='necessity_logs', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
