import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth-middleware';
import { firestoreService } from '@/lib/firestore';

// PUT cancel booking (Customer or Admin)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;

  try {
    const { id } = await params;

    // Get booking
    const booking: any = await firestoreService.findById('bookings', id);
    if (!booking) {
      return NextResponse.json(
        { error: 'بوکینگ نەدۆزرایەوە - Booking not found' },
        { status: 404 }
      );
    }

    // Check permissions
    if (user.role !== 'admin' && booking.customerId !== user.uid) {
      return NextResponse.json(
        { error: 'تەنها کڕیار دەتوانێت بوکینگ هەڵبوەشێنێتەوە - Only customer can cancel' },
        { status: 403 }
      );
    }

    // Don't allow canceling completed bookings
    if (booking.status === 'completed') {
      return NextResponse.json(
        { error: 'ناتوانیت بوکینگی تەواوبوو هەڵبوەشێنیتەوە - Cannot cancel completed booking' },
        { status: 400 }
      );
    }

    const updatedBooking = await firestoreService.update('bookings', id, { 
      status: 'cancelled',
      cancelledAt: new Date().toISOString(),
      cancelledBy: user.uid,
    });

    return NextResponse.json(
      {
        message: 'بوکینگ هەڵوەشێنرایەوە - Booking cancelled',
        booking: updatedBooking,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Cancel booking error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to cancel booking', details: error.message },
      { status: 500 }
    );
  }
}
