from django.db import models
class EmailData(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    email = models.EmailField()
    created_at = models.DateField(auto_now_add=True)

    class Meta:
        abstract = True

class PredictedEmailData(EmailData):
    predicted_label = models.IntegerField(choices=[(0, '0'), (1, '1')])

class CorrectedPredictionEmailData(EmailData):
    corrected_label = models.IntegerField(choices=[(0, '0'), (1, '1')])
    predicted_label = models.IntegerField(choices=[(0, '0'), (1, '1')])
