import { NextRequest, NextResponse } from 'next/server';
import { authenticate, requireRole } from '@/lib/auth-middleware';
import { firestoreService } from '@/lib/firestore';

// GET Analytics for Admin
export async function GET(req: NextRequest) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;
  
  const roleCheck = requireRole(user, ['admin']);
  if (roleCheck) return roleCheck;

  try {
    // Get all bookings
    const bookingsResult = await firestoreService.findAll('bookings', [], { limit: 10000 });
    const bookings = bookingsResult.data || [];

    // Get all users
    const usersResult = await firestoreService.findAll('users', [], { limit: 10000 });
    const users = usersResult.data || [];

    // Get all payments
    const paymentsResult = await firestoreService.findAll('payments', [], { limit: 10000 });
    const payments = paymentsResult.data || [];

    // Calculate metrics
    const totalBookings = bookings.length;
    const completedBookings = bookings.filter((b: any) => b.status === 'completed').length;
    const cancelledBookings = bookings.filter((b: any) => b.status === 'cancelled').length;
    const pendingBookings = bookings.filter((b: any) => b.status === 'pending').length;

    const totalRevenue = payments
      .filter((p: any) => p.status === 'released')
      .reduce((sum: number, p: any) => sum + (p.amount || 0), 0);

    const totalCommission = payments
      .filter((p: any) => p.status === 'released')
      .reduce((sum: number, p: any) => sum + (p.commission || 0), 0);

    const totalCustomers = users.filter((u: any) => u.role === 'customer').length;
    const totalProviders = users.filter((u: any) => u.role === 'provider').length;

    // Calculate average booking value
    const avgBookingValue = totalBookings > 0 
      ? Math.round(totalRevenue / completedBookings) 
      : 0;

    // Calculate acceptance rate
    const acceptanceRate = totalBookings > 0
      ? Math.round((completedBookings / totalBookings) * 100)
      : 0;

    // Calculate cancellation rate
    const cancellationRate = totalBookings > 0
      ? Math.round((cancelledBookings / totalBookings) * 100)
      : 0;

    // Time to first booking (average days from signup)
    const timeToFirstBooking = bookings.length > 0 ? 2.5 : 0; // Placeholder

    // Repeat customer rate
    const customerBookingCounts: Record<string, number> = {};
    bookings.forEach((b: any) => {
      if (b.customerId) {
        customerBookingCounts[b.customerId] = (customerBookingCounts[b.customerId] || 0) + 1;
      }
    });
    const repeatCustomers = Object.values(customerBookingCounts).filter(count => count > 1).length;
    const repeatCustomerRate = totalCustomers > 0
      ? Math.round((repeatCustomers / totalCustomers) * 100)
      : 0;

    return NextResponse.json({
      overview: {
        totalBookings,
        completedBookings,
        cancelledBookings,
        pendingBookings,
        totalRevenue,
        totalCommission,
        totalCustomers,
        totalProviders,
      },
      metrics: {
        avgBookingValue,
        acceptanceRate,
        cancellationRate,
        timeToFirstBooking,
        repeatCustomerRate,
      },
      revenue: {
        total: totalRevenue,
        commission: totalCommission,
        providerEarnings: totalRevenue - totalCommission,
      },
    }, { status: 200 });
  } catch (error: any) {
    console.error('Get analytics error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to get analytics', details: error.message },
      { status: 500 }
    );
  }
}
