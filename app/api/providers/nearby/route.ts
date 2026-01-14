import { NextRequest, NextResponse } from 'next/server';
import { firestoreService } from '@/lib/firestore';

// GET nearby providers (simplified - full implementation needs geo queries)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // This is a simplified version - Firebase geoqueries need special library (geofire)
    // For now, just return active verified providers
    const result = await firestoreService.findAll(
      'providers',
      [
        { field: 'isActive', operator: '==', value: true },
        { field: 'isVerified', operator: '==', value: true }
      ],
      { page, limit, orderBy: 'rating', orderDirection: 'desc' }
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Get nearby providers error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to get providers', details: error.message },
      { status: 500 }
    );
  }
}
