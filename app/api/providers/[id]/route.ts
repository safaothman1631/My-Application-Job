import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth-middleware';
import { firestoreService } from '@/lib/firestore';

// PUT update provider profile
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;

  try {
    const { id } = await params;

    // Check ownership or admin
    if (user.uid !== id && user.role !== 'admin') {
      return NextResponse.json(
        { error: 'دەسەڵاتت نییە - Forbidden' },
        { status: 403 }
      );
    }

    const provider = await firestoreService.findById('providers', id);
    if (!provider) {
      return NextResponse.json(
        { error: 'دابینکەر نەدۆزرایەوە - Provider not found' },
        { status: 404 }
      );
    }

    const body = await req.json();
    const updatedProvider = await firestoreService.update('providers', id, body);

    return NextResponse.json(
      {
        message: 'پرۆفایلی دابینکەر نوێکرایەوە - Provider profile updated',
        provider: updatedProvider,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update provider error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to update provider', details: error.message },
      { status: 500 }
    );
  }
}
