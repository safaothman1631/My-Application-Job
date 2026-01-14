import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth-middleware';
import { firestoreService } from '@/lib/firestore';
import { FieldValue } from '@/lib/firebase-admin';

// GET messages for a booking
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;

  try {
    const { bookingId } = await params;

    // Get booking to verify access
    const booking = await firestoreService.findById('bookings', bookingId);
    
    if (!booking) {
      return NextResponse.json(
        { error: 'داواکاری نەدۆزرایەوە - Booking not found' },
        { status: 404 }
      );
    }

    // Verify user has access to this booking
    if (booking.customerId !== user.uid && booking.providerId !== user.uid) {
      return NextResponse.json(
        { error: 'مۆڵەتت نییە - Unauthorized' },
        { status: 403 }
      );
    }

    const result = await firestoreService.findAll(
      'messages',
      [{ field: 'bookingId', operator: '==', value: bookingId }],
      { orderBy: 'timestamp', orderDirection: 'asc', limit: 100 }
    );

    return NextResponse.json({ data: result.data, total: result.total }, { status: 200 });
  } catch (error: any) {
    console.error('Get messages error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to get messages', details: error.message },
      { status: 500 }
    );
  }
}
