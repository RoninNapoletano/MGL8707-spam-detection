from django.db import models
class EmailData(models.Model):
    id = models.CharField(max_length=100)
    email = models.EmailField()
    created_at = models.DateField(auto_now_add=True)
    predicted_label = models.IntegerField(choices=[(0, '0'), (1, '1')])
