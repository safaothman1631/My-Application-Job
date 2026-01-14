import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth-middleware';
import { firestoreService } from '@/lib/firestore';

// PUT update booking status (Provider or Admin)
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
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'دۆخ پێویستە - Status required' },
        { status: 400 }
      );
    }

    const validStatuses = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'دۆخی نادروست - Invalid status' },
        { status: 400 }
      );
    }

    // Get booking
    const booking: any = await firestoreService.findById('bookings', id);
    if (!booking) {
      return NextResponse.json(
        { error: 'بوکینگ نەدۆزرایەوە - Booking not found' },
        { status: 404 }
      );
    }

    // Check permissions
    if (user.role !== 'admin' && booking.providerId !== user.uid) {
      return NextResponse.json(
        { error: 'تەنها دابینکەر دەتوانێت دۆخ بگۆڕێت - Only provider can update status' },
        { status: 403 }
      );
    }

    const updatedBooking = await firestoreService.update('bookings', id, { status });

    return NextResponse.json(
      {
        message: 'دۆخی بوکینگ نوێکرایەوە - Booking status updated',
        booking: updatedBooking,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update booking status error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to update booking', details: error.message },
      { status: 500 }
    );
  }
}
