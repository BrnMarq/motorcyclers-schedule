from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from motorcyclers.views import MaxAmountViewSet, MotorcyclerViewSet
from users.views import GroupViewSet, UserViewSet, CustomAuthToken
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'motorcyclers', MotorcyclerViewSet)
router.register(r'max-amount', MaxAmountViewSet)
router.register(r'users', UserViewSet)
router.register(r'groups', GroupViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', CustomAuthToken.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
