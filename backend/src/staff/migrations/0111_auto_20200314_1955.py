# Generated by Django 3.0 on 2020-03-14 14:25

from django.db import migrations
import month.models


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0110_auto_20200314_1939'),
    ]

    operations = [
        migrations.AlterField(
            model_name='publication',
            name='year',
            field=month.models.MonthField(),
        ),
    ]
