from rest_framework import serializers
from .models import MaxAmount, Motorcyler

class MaxAmountSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaxAmount
        fields = '__all__'

class MotorcylerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Motorcyler
        fields = '__all__'

