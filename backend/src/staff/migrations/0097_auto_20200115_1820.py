# Generated by Django 3.0 on 2020-01-15 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0096_auto_20200115_1602'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book_published',
            name='author',
            field=models.CharField(blank=True, default=None, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='book_published',
            name='edition_no',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='book_published',
            name='place_of_publication',
            field=models.CharField(blank=True, default=None, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='book_published',
            name='publisher',
            field=models.CharField(blank=True, default=None, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='book_published',
            name='title',
            field=models.CharField(blank=True, default=None, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='book_published',
            name='year_of_publication',
            field=models.CharField(blank=True, default=None, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='experience_abroad',
            name='country',
            field=models.CharField(blank=True, default=None, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='experience_abroad',
            name='from_date',
            field=models.CharField(blank=True, default=None, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='experience_abroad',
            name='funding_agency',
            field=models.CharField(blank=True, default=None, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='experience_abroad',
            name='institution',
            field=models.CharField(blank=True, default=None, max_length=800, null=True),
        ),
        migrations.AlterField(
            model_name='experience_abroad',
            name='nature_of_assignment',
            field=models.CharField(blank=True, default=None, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='experience_abroad',
            name='purp_of_visit',
            field=models.CharField(blank=True, default=None, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='experience_abroad',
            name='to_date',
            field=models.CharField(blank=True, default=None, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='ext_and_outreach_prog',
            name='cross_sec_of_participants',
            field=models.CharField(blank=True, default=None, max_length=800, null=True),
        ),
        migrations.AlterField(
            model_name='ext_and_outreach_prog',
            name='from_date',
            field=models.CharField(blank=True, default=None, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='ext_and_outreach_prog',
            name='funded_by',
            field=models.CharField(blank=True, default=None, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='ext_and_outreach_prog',
            name='no_of_participants',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='ext_and_outreach_prog',
            name='title_of_prog',
            field=models.CharField(blank=True, default=None, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='ext_and_outreach_prog',
            name='to_date',
            field=models.CharField(blank=True, default=None, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='ext_and_outreach_prog',
            name='type_of_prog',
            field=models.CharField(blank=True, default=None, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='ext_and_outreach_prog',
            name='venue',
            field=models.CharField(blank=True, default=None, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='ext_and_outreach_prog',
            name='your_role',
            field=models.CharField(blank=True, default=None, max_length=400, null=True),
        ),
    ]
