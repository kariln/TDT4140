from django.db import models


class Placeholder(models.Model):
    dummy = models.CharField(max_length=30)
