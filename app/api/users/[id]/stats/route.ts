import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;

    // Get all bookings for this user
    const bookingsSnapshot = await adminDb
      .collection('bookings')
      .where('userId', '==', userId)
      .get();

    let totalBookings = 0;
    let totalSpent = 0;
    let totalRatings = 0;
    let ratingsCount = 0;

    bookingsSnapshot.forEach((doc) => {
      const booking = doc.data();
      totalBookings++;

      // Add to total spent (only completed bookings)
      if (booking.status === 'completed' && booking.price) {
        totalSpent += booking.price;
      }

      // Calculate average rating (if rating exists)
      if (booking.rating && booking.rating > 0) {
        totalRatings += booking.rating;
        ratingsCount++;
      }
    });

    const averageRating = ratingsCount > 0 ? totalRatings / ratingsCount : 0;

    return NextResponse.json({
      totalBookings,
      totalSpent,
      averageRating: parseFloat(averageRating.toFixed(1)),
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user statistics' },
      { status: 500 }
    );
  }
}
