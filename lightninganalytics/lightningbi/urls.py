from django.urls import path
from .views import RegisterApi
from rest_framework_simplejwt import views as jwt_views


urlpatterns = [
    path('register', RegisterApi.as_view()),
    path('token/', jwt_views.TokenObtainPairView.as_view(),
         name='token_create'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),

]
