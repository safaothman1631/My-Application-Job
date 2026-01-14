import { NextResponse } from 'next/server';
import webpush from 'web-push';

// Configure web-push with VAPID keys
webpush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: Request) {
  try {
    const { userId, title, body, data } = await req.json();

    // Get user's push subscriptions from database
    // const subscriptions = await db.collection('pushSubscriptions')
    //   .where('userId', '==', userId)
    //   .get();

    const payload = JSON.stringify({
      title,
      body,
      icon: '/icon-192x192.png',
      badge: '/badge-72x72.png',
      data,
    });

    // Send push notification to all user's devices
    // for (const sub of subscriptions) {
    //   await webpush.sendNotification(sub.data().subscription, payload);
    // }

    console.log('Push notification sent:', { userId, title, body });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Push notification error:', error);
    return NextResponse.json(
      { error: 'Failed to send push notification' },
      { status: 500 }
    );
  }
}
