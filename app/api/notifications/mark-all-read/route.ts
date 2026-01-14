import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth-middleware';
import { adminDb } from '@/lib/firebase-admin';

// PUT mark all notifications as read
export async function PUT(req: NextRequest) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;

  try {
    // Get all unread notifications for user
    const snapshot = await adminDb
      .collection('notifications')
      .where('userId', '==', user.uid)
      .where('isRead', '==', false)
      .get();

    // Batch update
    const batch = adminDb.batch();
    snapshot.docs.forEach(doc => {
      batch.update(doc.ref, { isRead: true });
    });

    await batch.commit();

    return NextResponse.json(
      {
        message: `${snapshot.size} ئاگادارکردنەوە وەک خوێندراوە نیشان کران - ${snapshot.size} notifications marked as read`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Mark all notifications read error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to update notifications', details: error.message },
      { status: 500 }
    );
  }
}
