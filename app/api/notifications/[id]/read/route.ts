import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth-middleware';
import { firestoreService } from '@/lib/firestore';

// PATCH Mark notification as read
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;

  try {
    const { id } = params;

    const notification = await firestoreService.findById('notifications', id);
    
    if (!notification) {
      return NextResponse.json(
        { error: 'ئاگادارکردنەوە نەدۆزرایەوە - Notification not found' },
        { status: 404 }
      );
    }

    if (notification.userId !== user.uid) {
      return NextResponse.json(
        { error: 'مۆڵەتت نییە - Unauthorized' },
        { status: 403 }
      );
    }

    await firestoreService.update('notifications', id, {
      read: true,
    });

    return NextResponse.json(
      {
        message: 'نیشانکرا وەک خوێندراوە - Marked as read',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Mark notification read error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to mark as read', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE notification
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;

  try {
    const { id } = params;

    const notification = await firestoreService.findById('notifications', id);
    
    if (!notification) {
      return NextResponse.json(
        { error: 'ئاگادارکردنەوە نەدۆزرایەوە - Notification not found' },
        { status: 404 }
      );
    }

    if (notification.userId !== user.uid) {
      return NextResponse.json(
        { error: 'مۆڵەتت نییە - Unauthorized' },
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
