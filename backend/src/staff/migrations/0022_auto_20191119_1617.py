# Generated by Django 2.2.6 on 2019-11-19 10:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0021_auto_20191119_1609'),
    ]

    operations = [
        migrations.AlterField(
            model_name='qualification',
            name='degree',
            field=models.CharField(max_length=200),
        ),
    ]
