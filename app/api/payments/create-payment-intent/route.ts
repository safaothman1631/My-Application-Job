import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth-middleware';
import { firestoreService } from '@/lib/firestore';
import { FieldValue } from '@/lib/firebase-admin';

// POST Create Payment Intent (Stripe)
export async function POST(req: NextRequest) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;

  try {
    const body = await req.json();
    const { bookingId, amount } = body;

    if (!bookingId || !amount) {
      return NextResponse.json(
        { error: 'داواکاری و بڕی پارە پێویستە - Booking ID and amount required' },
        { status: 400 }
      );
    }

    // Get booking
    const booking = await firestoreService.findById('bookings', bookingId);
    
    if (!booking) {
      return NextResponse.json(
        { error: 'داواکاری نەدۆزرایەوە - Booking not found' },
        { status: 404 }
      );
    }

    if (booking.customerId !== user.uid) {
      return NextResponse.json(
        { error: 'مۆڵەتت نییە - Unauthorized' },
        { status: 403 }
      );
    }

    // In production, integrate with Stripe:
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: amount * 100, // Convert to cents
    //   currency: 'usd',
    //   metadata: { bookingId, customerId: user.uid }
    // });

    // For now, create a payment record
    const payment = await firestoreService.create('payments', {
      bookingId,
      customerId: user.uid,
      providerId: booking.providerId,
      amount,
      status: 'escrow', // Held in escrow until job completion
      paymentMethod: 'card',
      stripePaymentIntentId: null, // Will be set when Stripe is integrated
      createdAt: FieldValue.serverTimestamp(),
    });

    // Update booking payment status
    await firestoreService.update('bookings', bookingId, {
      paymentStatus: 'paid',
      paidAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json(
      {
        message: 'پارەدان سەرکەوتوو بوو - Payment successful',
        payment,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create payment intent error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to process payment', details: error.message },
      { status: 500 }
    );
  }
}
