import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      );
    }

    const bookingsRef = adminDb.collection('bookings');
    const snapshot = await bookingsRef.where('userId', '==', userId).get();

    const bookings = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, bookings });
  } catch (error: any) {
    console.error('Get bookings error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get bookings', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, providerId, serviceId, date, time, address, notes } = body;

    if (!userId || !serviceId) {
      return NextResponse.json(
        { success: false, error: 'Required fields missing' },
        { status: 400 }
      );
    }

    const bookingData = {
      userId,
      providerId: providerId || 'default',
      serviceId,
      date,
      time,
      address,
      notes,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const bookingRef = await adminDb.collection('bookings').add(bookingData);

    return NextResponse.json({
      success: true,
      booking: { id: bookingRef.id, ...bookingData },
    });
  } catch (error: any) {
    console.error('Create booking error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking', details: error.message },
      { status: 500 }
    );
  }
}
