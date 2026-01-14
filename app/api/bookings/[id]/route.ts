import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

// GET single booking
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const bookingRef = adminDb.collection('bookings').doc(id);
    const doc = await bookingRef.get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: 'بوکینگ نەدۆزرایەوە - Booking not found' },
        { status: 404 }
      );
    }

    const booking = {
      id: doc.id,
      ...doc.data(),
    };

    return NextResponse.json({ booking }, { status: 200 });
  } catch (error: any) {
    console.error('Get booking error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to get booking', details: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'Status required' },
        { status: 400 }
      );
    }

    const bookingRef = adminDb.collection('bookings').doc(id);
    await bookingRef.update({
      status,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Update booking error:', error);
    return NextResponse.json(
      { error: 'Failed to update booking', details: error.message },
      { status: 500 }
    );
  }
}
