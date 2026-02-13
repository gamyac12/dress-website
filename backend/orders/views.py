from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Order, OrderItem, PaymentMethod
from .serializers import OrderSerializer, OrderItemSerializer, PaymentMethodSerializer
from products.models import Product

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    data = request.data
    user = request.user
    
    # 1. Validate data (basic check)
    if 'items' not in data or len(data['items']) == 0:
        return Response({'error': 'No items in order'}, status=status.HTTP_400_BAD_REQUEST)

    # 2. Calculate total and create Order
    try:
        # Assuming frontend sends 'total' but we should probably recalculate or validate it
        # For simplicity in this iteration, we'll trust frontend or recalculate
        
        # Let's recalculate total to be safe
        order_items_data = data['items']
        total_price = 0
        
        # We need to verify products exist and get prices
        # But to avoid complex validation logic right now, let's assume valid IDs
        # Ideally we fetch products here.
        
        # Let's start a transaction? Django does this per request usually if configured, 
        # but manual is better for multi-table inserts.
        
        # Create Order first
        order = Order.objects.create(
            user=user,
            total_price=data.get('total', 0), # Placeholder, will update
            shipping_address=data.get('shipping_address', ''),
            payment_method=data.get('payment_method', 'Card'),
            status='Pending'
        )

        # Update User Profile Address
        try:
            # Parse shipping address JSON if it's a string
            import json
            addr_str = data.get('shipping_address', '')
            if isinstance(addr_str, str):
                try:
                    addr_dict = json.loads(addr_str)
                    # Construct a readable address string
                    full_address = f"{addr_dict.get('fullName', '')}, {addr_dict.get('address', '')}, {addr_dict.get('pinCode', '')}, Ph: {addr_dict.get('phone', '')}"
                    
                    # Update profile
                    # Check if profile exists (signal should have created it, but be safe)
                    from users.models import UserProfile
                    profile, created = UserProfile.objects.get_or_create(user=user)
                    profile.address = full_address
                    profile.phone = addr_dict.get('phone', '')
                    profile.save()
                except json.JSONDecodeError:
                    pass # Address might be plain text or empty
        except Exception as e:
            print(f"Error saving profile address: {e}")

        calculated_total = 0
        
        for item_data in order_items_data:
            product = Product.objects.get(id=item_data['id'])
            qty = item_data['qty']
            size = item_data['size']
            price = product.price # Use current product price
            
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=qty,
                price=price,
                size=size
            )
            calculated_total += (price * qty)
            
        order.total_price = calculated_total
        order.save()
        
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    except Product.DoesNotExist:
         return Response({'error': 'One or more products not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_orders(request):
    user = request.user
    orders = Order.objects.filter(user=user).order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_payment_methods(request):
    methods = PaymentMethod.objects.filter(is_active=True)
    serializer = PaymentMethodSerializer(methods, many=True)
    return Response(serializer.data)

from django.utils import timezone
from datetime import timedelta

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cancel_order(request, pk):
    try:
        order = Order.objects.get(pk=pk, user=request.user)
        
        # Check if already cancelled or completed
        if order.status in ['Cancelled', 'Delivered', 'Shipped']:
             return Response({'error': f'Cannot cancel order with status {order.status}'}, status=status.HTTP_400_BAD_REQUEST)

        # Check 24 hour window
        time_difference = timezone.now() - order.created_at
        if time_difference > timedelta(hours=24):
            return Response({'error': 'Cancellation period of 24 hours has expired'}, status=status.HTTP_400_BAD_REQUEST)

        order.status = 'Cancelled'
        order.save()
        
        # Ideally initiate refund here if payment was made
        
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    except Order.DoesNotExist:
        return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
