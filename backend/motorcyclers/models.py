from django.db import models

# Create your models here.
class MaxAmount(models.Model):
    amount = models.IntegerField(verbose_name="Cantidad")

    class Meta:
        verbose_name = "Cantidad máxima"
        verbose_name_plural = "Cantidades máximas"

    def __str__(self):
        return str(self.amount)

class Motorcycler(models.Model):
    max_amount = models.ForeignKey(MaxAmount, verbose_name="Cantidad máxima", on_delete=models.CASCADE)
    actual_amount = models.IntegerField(verbose_name="Cantidad actual")
    users = models.CharField(verbose_name="Usuarios", max_length=10000, blank=True, null=True)

    class Meta:
        verbose_name = "Motociclista"
        verbose_name_plural = "Motociclistas"
        ordering = ['id']

    def __str__(self):
        return str(self.id)
