from rest_framework import serializers
from .models import MaxAmount, Motorcycler

class MaxAmountSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaxAmount
        fields = '__all__'

class MotorcyclerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Motorcycler
        fields = '__all__'

