from django.db import models
from django.conf import settings
from products.models import Product

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='orders')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default='Pending')
    shipping_address = models.TextField()
    payment_method = models.CharField(max_length=50, default='Con') # 'Card' or 'COD'

    def __str__(self):
        return f"Order #{self.id} by {self.user.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2) # Snapshot of price at time of order
    size = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.quantity} x {self.product.name} (Size: {self.size})"

class PaymentMethod(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=50, unique=True) # e.g., 'card', 'cod'
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    icon_name = models.CharField(max_length=50, blank=True, null=True, help_text="Frontend icon name (e.g., 'CreditCard', 'Banknote')")

    def __str__(self):
        return self.name
