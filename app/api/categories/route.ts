import { NextRequest, NextResponse } from 'next/server';
import { firestoreService } from '@/lib/firestore';

// GET all categories (public - no auth required)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const result = await firestoreService.findAll(
      'categories',
      [],
      { page, limit, orderBy: 'name', orderDirection: 'asc' }
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Get categories error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to get categories', details: error.message },
      { status: 500 }
    );
  }
}

