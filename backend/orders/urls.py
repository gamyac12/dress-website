from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_order, name='create_order'),
    path('my-orders/', views.get_user_orders, name='user_orders'),
    path('payment-methods/', views.get_payment_methods, name='payment_methods'),
    path('cancel/<int:pk>/', views.cancel_order, name='cancel_order'),
]
