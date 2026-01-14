import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth-middleware';
import { firestoreService } from '@/lib/firestore';
import { adminDb, increment } from '@/lib/firebase-admin';

// GET reviews for a service or provider
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const serviceId = searchParams.get('serviceId');
    const providerId = searchParams.get('providerId');

    let filters: any[] = [];

    if (serviceId) {
      filters.push({ field: 'serviceId', operator: '==', value: serviceId });
    } else if (providerId) {
      filters.push({ field: 'providerId', operator: '==', value: providerId });
    }

    const result = await firestoreService.findAll(
      'reviews',
      filters,
      { page, limit, orderBy: 'createdAt', orderDirection: 'desc' }
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Get reviews error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to get reviews', details: error.message },
      { status: 500 }
    );
  }
}

// POST create review (Customer only, after completed booking)
export async function POST(req: NextRequest) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;

  try {
    const body = await req.json();
    const { bookingId, rating, comment } = body;

    if (!bookingId || !rating) {
      return NextResponse.json(
        { error: 'بوکینگ و هەڵسەنگاندن پێویستە - Booking and rating required' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'هەڵسەنگاندن دەبێت لە نێوان ١ بۆ ٥ بێت - Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Verify booking
    const booking: any = await firestoreService.findById('bookings', bookingId);
    if (!booking) {
      return NextResponse.json(
        { error: 'بوکینگ نەدۆزرایەوە - Booking not found' },
        { status: 404 }
      );
    }

    // Check if customer owns booking
    if (booking.customerId !== user.uid) {
      return NextResponse.json(
        { error: 'تەنها کڕیاری بوکینگ دەتوانێت هەڵسەنگاندن بکات - Only booking customer can review' },
        { status: 403 }
      );
    }

    // Check if booking is completed
    if (booking.status !== 'completed') {
      return NextResponse.json(
        { error: 'تەنها بوکینگی تەواوبوو دەتوانرێت هەڵسەنگێندرێت - Only completed bookings can be reviewed' },
        { status: 400 }
      );
    }

    // Check if already reviewed
    const existingReview = await firestoreService.findOne('reviews', 'bookingId', bookingId);
    if (existingReview) {
      return NextResponse.json(
        { error: 'ئەم بوکینگە پێشتر هەڵسەنگێندراوە - Booking already reviewed' },
        { status: 409 }
      );
    }

    const review = await firestoreService.create('reviews', {
      bookingId,
      serviceId: booking.serviceId,
      providerId: booking.providerId,
      customerId: user.uid,
      rating,
      comment: comment || null,
    });

    // Update service rating
    const serviceReviews: any = await firestoreService.findAll(
      'reviews',
      [{ field: 'serviceId', operator: '==', value: booking.serviceId }],
      { page: 1, limit: 1000 }
    );

    const totalRating = serviceReviews.data.reduce((sum: number, r: any) => sum + r.rating, 0);
    const avgRating = totalRating / serviceReviews.total;

    await adminDb.collection('services').doc(booking.serviceId).update({
      rating: avgRating,
      reviewsCount: increment(1)
    });

    return NextResponse.json(
      {
        message: 'هەڵسەنگاندن بەسەرکەوتویی زیادکرا - Review added successfully',
        review,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create review error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to create review', details: error.message },
      { status: 500 }
    );
  }
}
