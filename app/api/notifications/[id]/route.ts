import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth-middleware';
import { firestoreService } from '@/lib/firestore';

// PUT mark notification as read
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

    const notification: any = await firestoreService.findById('notifications', id);
    if (!notification) {
      return NextResponse.json(
        { error: 'ئاگادارکردنەوە نەدۆزرایەوە - Notification not found' },
        { status: 404 }
      );
    }

    // Check ownership
    if (notification.userId !== user.uid) {
      return NextResponse.json(
        { error: 'دەسەڵاتت نییە - Forbidden' },
        { status: 403 }
      );
    }

    await firestoreService.update('notifications', id, { isRead: true });

    return NextResponse.json(
      {
        message: 'ئاگادارکردنەوە وەک خوێندراوە نیشان کرا - Notification marked as read',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Mark notification read error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to update notification', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE notification
export async function DELETE(
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

    const notification: any = await firestoreService.findById('notifications', id);
    if (!notification) {
      return NextResponse.json(
        { error: 'ئاگادارکردنەوە نەدۆزرایەوە - Notification not found' },
        { status: 404 }
      );
    }

    // Check ownership
    if (notification.userId !== user.uid && user.role !== 'admin') {
      return NextResponse.json(
        { error: 'دەسەڵاتت نییە - Forbidden' },
        { status: 403 }
      );
    }

    await firestoreService.delete('notifications', id);

    return NextResponse.json(
      {
        message: 'ئاگادارکردنەوە سڕایەوە - Notification deleted',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete notification error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to delete notification', details: error.message },
      { status: 500 }
    );
  }
}
