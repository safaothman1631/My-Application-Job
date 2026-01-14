import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth-middleware';
import { firestoreService } from '@/lib/firestore';
import { FieldValue } from '@/lib/firebase-admin';

// POST Release payment from escrow (Admin/System)
export async function POST(req: NextRequest) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;

  try {
    const body = await req.json();
    const { bookingId } = body;

    if (!bookingId) {
      return NextResponse.json(
        { error: 'داواکاری پێویستە - Booking ID required' },
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

    // Only allow customer or admin to release payment
    if (booking.customerId !== user.uid && user.role !== 'admin') {
      return NextResponse.json(
        { error: 'مۆڵەتت نییە - Unauthorized' },
        { status: 403 }
      );
    }

    // Booking must be completed
    if (booking.status !== 'completed') {
      return NextResponse.json(
        { error: 'کارەکە تەواو نەبووە - Job not completed' },
        { status: 400 }
      );
    }

    // Get payment
    const paymentResult = await firestoreService.findOne('payments', [
      { field: 'bookingId', operator: '==', value: bookingId }
    ]);

    if (!paymentResult) {
      return NextResponse.json(
        { error: 'پارەدان نەدۆزرایەوە - Payment not found' },
        { status: 404 }
      );
    }

    // Calculate commission (15%)
    const commission = Math.round(booking.totalPrice * 0.15);
    const providerAmount = booking.totalPrice - commission;

    // Update payment status
    await firestoreService.update('payments', paymentResult.id, {
      status: 'released',
      commission,
      providerAmount,
      releasedAt: FieldValue.serverTimestamp(),
    });

    // Update provider earnings
    const provider = await firestoreService.findById('users', booking.providerId);
    if (provider) {
      await firestoreService.update('users', booking.providerId, {
        totalEarnings: (provider.totalEarnings || 0) + providerAmount,
      });
    }

    return NextResponse.json(
      {
        message: 'پارەکە بۆ پیشەساز گوازرایەوە - Payment released to provider',
        commission,
        providerAmount,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Release payment error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to release payment', details: error.message },
      { status: 500 }
    );
  }
}
