# Generated by Django 3.0 on 2020-01-14 17:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0090_auto_20200114_2140'),
    ]

    operations = [
        migrations.AlterField(
            model_name='publication',
            name='issue',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='publication',
            name='volume',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
