import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

// GET user's notifications
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const notificationsSnapshot = await adminDb
      .collection('notifications')
      .where('userId', '==', userId)
      .limit(limit)
      .get();

    const notifications = notificationsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const unreadCount = notifications.filter((n: any) => !n.isRead).length;

    return NextResponse.json({
      success: true,
      notifications,
      unreadCount,
      total: notifications.length,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Get notifications error:', error);
    return NextResponse.json(
      { error: 'Failed to get notifications', details: error.message },
      { status: 500 }
    );
  }
}

// PATCH update notification (mark as read)
export async function PATCH(req: NextRequest) {
  try {
    const { notificationId, isRead } = await req.json();

    if (!notificationId) {
      return NextResponse.json(
        { success: false, error: 'Notification ID is required' },
        { status: 400 }
      );
    }

    await adminDb
      .collection('notifications')
      .doc(notificationId)
      .update({ isRead, updatedAt: new Date().toISOString() });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating notification:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update notification' },
      { status: 500 }
    );
  }
}

// POST create notification (Internal use or Admin)
export async function POST(req: NextRequest) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    const body = await req.json();
    const { userId, titleKu, titleAr, titleEn, messageKu, messageAr, messageEn, type } = body;

    if (!userId || !titleKu || !messageKu) {
      return NextResponse.json(
        { error: 'زانیاری پێویست دابین نەکراوە - Required fields missing' },
        { status: 400 }
      );
    }

    const notification = await firestoreService.create('notifications', {
      userId,
      titleKu,
      titleAr: titleAr || titleKu,
      titleEn: titleEn || titleKu,
      messageKu,
      messageAr: messageAr || messageKu,
      messageEn: messageEn || messageKu,
      type: type || 'info',
      isRead: false,
    });

    return NextResponse.json(
      {
        message: 'ئاگادارکردنەوە دروست کرا - Notification created',
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
