from .models import Motorcyler, MaxAmount
from .serializers import MotorcylerSerializer, MaxAmountSerializer
from rest_framework import viewsets

# Create your views here.
class MaxAmountViewSet(viewsets.ModelViewSet):
    queryset = MaxAmount.objects.all()
    serializer_class = MaxAmountSerializer
    
class MotorcyclerViewSet(viewsets.ModelViewSet):
    queryset = Motorcyler.objects.all()
    serializer_class = MotorcylerSerializer
