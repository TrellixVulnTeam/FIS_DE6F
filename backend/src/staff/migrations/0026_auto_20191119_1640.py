# Generated by Django 2.2.6 on 2019-11-19 11:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0025_auto_20191119_1640'),
    ]

    operations = [
        migrations.AlterField(
            model_name='qualification',
            name='staff',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
