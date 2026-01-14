import { NextRequest, NextResponse } from 'next/server';
import { authenticate, requireRole } from '@/lib/auth-middleware';
import { firestoreService } from '@/lib/firestore';

// GET recent bookings (Admin only)
export async function GET(req: NextRequest) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;
  
  const roleCheck = requireRole(user, ['admin']);
  if (roleCheck) return roleCheck;

  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    const result = await firestoreService.findAll(
      'bookings',
      [],
      { page: 1, limit, orderBy: 'createdAt', orderDirection: 'desc' }
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Get recent bookings error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to get bookings', details: error.message },
      { status: 500 }
    );
  }
}
