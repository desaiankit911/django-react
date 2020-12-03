from django.db import models
from mongoengine import Document, EmbeddedDocument, fields

# Create your models here.


class UserInfo(Document):
    user_name = fields.StringField(max_length=20, min_length=3, required=True)
    email = fields.EmailField(max_length=255, min_length=4, required=True)
    password = fields.StringField(max_length=60, min_length=6, required=True)
    # token = fields.StringField(max_length=255)

    class Meta:
        managed = False
        db_table = 'user_info'
