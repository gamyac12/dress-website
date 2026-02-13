from django.contrib import admin
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product', 'quantity', 'price', 'size')
    can_delete = False

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total_price', 'status', 'created_at', 'payment_method')
    list_filter = ('status', 'created_at', 'payment_method')
    search_fields = ('user__username', 'shipping_address', 'id')
    readonly_fields = ('created_at', 'user', 'total_price', 'shipping_address', 'payment_method')
    inlines = [OrderItemInline]
    
    fieldsets = (
        ('Order Information', {
            'fields': ('user', 'status', 'created_at', 'total_price', 'payment_method')
        }),
        ('Shipping Details', {
            'fields': ('shipping_address',)
        }),
    )

    def has_delete_permission(self, request, obj=None):
        # Optional: prevent deletion of orders to maintain history
        return False

admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem) # Registering separately too if needed, but inline is better

from .models import PaymentMethod

@admin.register(PaymentMethod)
class PaymentMethodAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'is_active', 'icon_name')
    list_filter = ('is_active',)
    search_fields = ('name', 'code')
