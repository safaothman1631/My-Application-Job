import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth-middleware';
import { firestoreService } from '@/lib/firestore';
import { FieldValue } from '@/lib/firebase-admin';

// POST send a message
export async function POST(req: NextRequest) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;

  try {
    const body = await req.json();
    const { bookingId, content } = body;

    if (!bookingId || !content) {
      return NextResponse.json(
        { error: 'داواکاری و پەیام پێویستە - Booking ID and content required' },
        { status: 400 }
      );
    }

    // Get booking to verify access and get other user info
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

    // Get sender info
    const sender = await firestoreService.findById('users', user.uid);

    const message = await firestoreService.create('messages', {
      bookingId,
      senderId: user.uid,
      senderName: sender?.fullName || 'بەکارهێنەر',
      content,
      timestamp: FieldValue.serverTimestamp(),
      read: false,
    });

    return NextResponse.json(
      {
        message: 'پەیام نێردرا - Message sent successfully',
        data: message,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Send message error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to send message', details: error.message },
      { status: 500 }
    );
  }
}
