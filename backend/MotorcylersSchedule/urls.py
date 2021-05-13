from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from motorcyclers.views import MaxAmountViewSet, MotorcyclerViewSet

router = routers.DefaultRouter()
router.register(r'motorcyclers', MotorcyclerViewSet)
router.register(r'max-amount', MaxAmountViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
]
