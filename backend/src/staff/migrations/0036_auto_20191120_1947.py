# Generated by Django 2.2.6 on 2019-11-20 14:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0035_auto_20191120_1933'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employment',
            name='staff',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='employment', to=settings.AUTH_USER_MODEL),
        ),
    ]
