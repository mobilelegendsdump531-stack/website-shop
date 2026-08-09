import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateOrderNumber } from '@/utils/helpers';

export async function POST(request: NextRequest) {
  try {
    const { items, shippingAddress, paymentMethod, subtotal, tax, total } = await request.json();

    // Validation
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in order' },
        { status: 400 }
      );
    }

    // Create payment method record (simplified)
    const paymentMethodRecord = await prisma.paymentMethod.create({
      data: {
        userId: 'user-id', // This would come from session
        type: paymentMethod,
        name: `${paymentMethod} Payment`,
      },
    });

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: 'user-id', // This would come from session
        status: 'PENDING',
        paymentStatus: 'PENDING',
        paymentMethodId: paymentMethodRecord.id,
        subtotal: subtotal || 0,
        tax: tax || 0,
        total: total || 0,
        shippingAddress,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get user's orders (would filter by session user)
    const orders = await prisma.order.findMany({
      where: {
        userId: 'user-id', // This would come from session
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        payment: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Fetch orders error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
