# Generated by Django 2.2.5 on 2019-09-25 21:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0016_auto_20190926_0321'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='staff_detail',
            name='dob',
        ),
    ]
