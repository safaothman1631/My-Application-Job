import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth-middleware';
import { firestoreService } from '@/lib/firestore';
import { FieldValue } from '@/lib/firebase-admin';

// GET My notifications
export async function GET(req: NextRequest) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const unreadOnly = searchParams.get('unreadOnly') === 'true';

    const filters = [
      { field: 'userId', operator: '==', value: user.uid }
    ];

    if (unreadOnly) {
      filters.push({ field: 'read', operator: '==', value: false });
    }

    const result = await firestoreService.findAll(
      'notifications',
      filters as any,
      { page, limit, orderBy: 'timestamp', orderDirection: 'desc' }
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error('Get notifications error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to get notifications', details: error.message },
      { status: 500 }
    );
  }
}

// POST Create notification (System/Admin)
export async function POST(req: NextRequest) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    const body = await req.json();
    const { userId, title, message, type } = body;

    if (!userId || !title || !message) {
      return NextResponse.json(
        { error: 'زانیاری پێویست نییە - Required fields missing' },
        { status: 400 }
      );
    }

    const notification = await firestoreService.create('notifications', {
      userId,
      title,
      message,
      type: type || 'system',
      read: false,
      timestamp: FieldValue.serverTimestamp(),
    });

    return NextResponse.json(
      {
        message: 'ئاگادارکردنەوە نێردرا - Notification sent',
        notification,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create notification error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to create notification', details: error.message },
      { status: 500 }
    );
  }
}
