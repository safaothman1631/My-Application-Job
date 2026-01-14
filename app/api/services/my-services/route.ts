import { NextRequest, NextResponse } from 'next/server';
import { authenticate, requireRole } from '@/lib/auth-middleware';
import { firestoreService } from '@/lib/firestore';

// GET provider's own services
export async function GET(req: NextRequest) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;
  
  const roleCheck = requireRole(user, ['provider', 'admin']);
  if (roleCheck) return roleCheck;

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const result = await firestoreService.findAll(
      'services',
      [{ field: 'providerId', operator: '==', value: user.uid }],
      { page, limit, orderBy: 'createdAt', orderDirection: 'desc' }
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Get my services error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to get services', details: error.message },
      { status: 500 }
    );
  }
}
