# Generated by Django 2.2.5 on 2019-09-25 21:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0014_auto_20190926_0253'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='staff_detail',
            name='aadhar',
        ),
        migrations.RemoveField(
            model_name='staff_detail',
            name='caste',
        ),
        migrations.RemoveField(
            model_name='staff_detail',
            name='community',
        ),
        migrations.RemoveField(
            model_name='staff_detail',
            name='dob',
        ),
        migrations.RemoveField(
            model_name='staff_detail',
            name='fath_hus_name',
        ),
        migrations.RemoveField(
            model_name='staff_detail',
            name='gender',
        ),
        migrations.RemoveField(
            model_name='staff_detail',
            name='mobile_no',
        ),
        migrations.RemoveField(
            model_name='staff_detail',
            name='official_mail',
        ),
        migrations.RemoveField(
            model_name='staff_detail',
            name='pan',
        ),
        migrations.RemoveField(
            model_name='staff_detail',
            name='perm_address',
        ),
        migrations.RemoveField(
            model_name='staff_detail',
            name='personal_mail',
        ),
        migrations.RemoveField(
            model_name='staff_detail',
            name='res_address',
        ),
        migrations.RemoveField(
            model_name='staff_detail',
            name='residence_ph_no',
        ),
        migrations.RemoveField(
            model_name='staff_detail',
            name='website_url',
        ),
    ]
