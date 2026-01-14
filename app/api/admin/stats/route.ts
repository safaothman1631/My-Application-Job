import { NextRequest, NextResponse } from 'next/server';
import { authenticate, requireRole } from '@/lib/auth-middleware';
import { adminDb } from '@/lib/firebase-admin';

// GET dashboard stats (Admin only)
export async function GET(req: NextRequest) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;
  
  const roleCheck = requireRole(user, ['admin']);
  if (roleCheck) return roleCheck;

  try {
    // Get counts from all collections
    const [usersSnap, categoriesSnap, servicesSnap, bookingsSnap, providersSnap] = await Promise.all([
      adminDb.collection('users').get(),
      adminDb.collection('categories').where('isActive', '==', true).get(),
      adminDb.collection('services').where('isActive', '==', true).get(),
      adminDb.collection('bookings').get(),
      adminDb.collection('providers').where('isActive', '==', true).get(),
    ]);

    // Calculate booking stats
    let completedBookings = 0;
    let pendingBookings = 0;
    let totalRevenue = 0;

    bookingsSnap.forEach(doc => {
      const booking = doc.data();
      if (booking.status === 'completed') {
        completedBookings++;
        totalRevenue += booking.price || 0;
      } else if (booking.status === 'pending') {
        pendingBookings++;
      }
    });

    // Get user role counts
    let customers = 0;
    let providers = 0;
    let admins = 0;

    usersSnap.forEach(doc => {
      const user = doc.data();
      if (user.role === 'customer') customers++;
      else if (user.role === 'provider') providers++;
      else if (user.role === 'admin') admins++;
    });

    const stats = {
      users: {
        total: usersSnap.size,
        customers,
        providers,
        admins,
      },
      categories: categoriesSnap.size,
      services: servicesSnap.size,
      providers: providersSnap.size,
      bookings: {
        total: bookingsSnap.size,
        completed: completedBookings,
        pending: pendingBookings,
      },
      revenue: {
        total: totalRevenue,
        currency: 'IQD',
      },
    };

    return NextResponse.json({ stats }, { status: 200 });
  } catch (error: any) {
    console.error('Get admin stats error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to get stats', details: error.message },
      { status: 500 }
    );
  }
}
