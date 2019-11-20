# Generated by Django 2.2.6 on 2019-11-19 10:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0019_qualification'),
    ]

    operations = [
        migrations.AlterField(
            model_name='qualification',
            name='degree',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='qualification',
            name='degree_type',
            field=models.CharField(default=None, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='qualification',
            name='duration',
            field=models.CharField(max_length=300, null=True),
        ),
        migrations.AlterField(
            model_name='qualification',
            name='institution',
            field=models.CharField(max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='qualification',
            name='university',
            field=models.CharField(max_length=400, null=True),
        ),
    ]
