# Generated by Django 3.2.3 on 2021-05-28 01:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('motorcyclers', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='motorcyler',
            name='users',
            field=models.CharField(blank=True, max_length=10000, null=True, verbose_name='Usuarios'),
        ),
    ]
