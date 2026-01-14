import { NextRequest, NextResponse } from 'next/server';
import { authenticate, requireRole } from '@/lib/auth-middleware';
import { firestoreService } from '@/lib/firestore';

// GET all users (Admin only)
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
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const role = searchParams.get('role');

    let filters: any[] = [];
    if (role) {
      filters.push({ field: 'role', operator: '==', value: role });
    }

    const result = await firestoreService.findAll(
      'users',
      filters,
      { page, limit, orderBy: 'createdAt', orderDirection: 'desc' }
    );

    // Remove passwords from response
    result.data = result.data.map((user: any) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to get users', details: error.message },
      { status: 500 }
    );
  }
}
