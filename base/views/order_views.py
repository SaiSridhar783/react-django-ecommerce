from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import OrderSerializer

from rest_framework import status
from datetime import datetime


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data["orderItems"]

    if orderItems and len(orderItems) == 0:
        return Response({"detail": "No Order Items"}, status=status.HTTP_400_BAD_REQUEST)

    else:
        # Create Order

        order = Order.objects.create(
            user=user, paymentMethod=data["paymentMethod"],
            taxPrice=data["taxPrice"], shippingPrice=data["shippingPrice"],
            totalPrice=data["totalPrice"])

        # Create Shipping Address

        shipping = ShippingAddress.objects.create(
            order=order, address=data["shippingAddress"]["address"],
            city=data["shippingAddress"]["city"], postalCode=data["shippingAddress"]["postalCode"],
            country=data["shippingAddress"]["country"])

        # Create Order Items and set Relation

        for i in orderItems:
            product = Product.objects.get(_id=i["product"])

            item = OrderItem.objects.create(
                product=product, order=order, name=product.name,
                qty=i["qty"], price=i["price"], image=product.image.url)

            # Update Stock

            product.countInStock -= item.qty
            product.save()

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    order = Order.objects.get(_id=pk)

    try:
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)

        else:
            return Response({"detail": "Not Authorized to view this order."}, status=status.HTTP_400_BAD_REQUEST)

    except:
        return Response({"detail": "Order Does Not Exist"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response("Order was Paid")