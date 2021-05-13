from django.db import models

# Create your models here.
class MaxAmount(models.Model):
    amount = models.IntegerField(verbose_name="Cantidad")

    class Meta:
        verbose_name = "Cantidad máxima"
        verbose_name_plural = "Cantidades máximas"

    def __str__(self):
        return str(self.amount)

class Motorcyler(models.Model):
    max_amount = models.ForeignKey(MaxAmount, verbose_name="Cantidad máxima", on_delete=models.CASCADE)
    actual_amount = models.IntegerField(verbose_name="Cantidad actual")

    class Meta:
        verbose_name = "Motociclista"
        verbose_name_plural = "Motociclistas"
        ordering = ['id']

    def __str__(self):
        return str(self.id)
