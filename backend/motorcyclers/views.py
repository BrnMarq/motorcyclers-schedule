from .models import Motorcycler, MaxAmount
from .serializers import MotorcyclerSerializer, MaxAmountSerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

# Create your views here.
class MaxAmountViewSet(viewsets.ModelViewSet):
    queryset = MaxAmount.objects.all()
    serializer_class = MaxAmountSerializer
    
class MotorcyclerViewSet(viewsets.ModelViewSet):
    queryset = Motorcycler.objects.all()
    serializer_class = MotorcyclerSerializer

    @action(detail=True, methods=['post'])
    def get(self, request, pk=None):
        max_amount = MaxAmount.objects.get(id=1)
        obj, created = Motorcycler.objects.get_or_create(
            id=pk,
            defaults={
                'max_amount' : max_amount,
                'actual_amount' : max_amount.amount,
            }
        )
        serializer = MotorcyclerSerializer(obj)
        return Response(serializer.data)
