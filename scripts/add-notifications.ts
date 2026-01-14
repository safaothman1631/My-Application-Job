/**
 * Script to add sample notifications to Firestore
 * Run: npx tsx scripts/add-notifications.ts
 */

import { db } from '../lib/firebase-admin';

async function addSampleNotifications() {
  try {
    const notifications = [
      {
        userId: 'user123', // Replace with actual user ID from your database
        title: 'داواکارییەکەت دڵنیاکرایەوە',
        message: 'داواکارییەکەی پاککردنەوەی ماڵەکەت دڵنیاکرایەوە و پرۆڤایدەر لە ڕێگای خۆیدایە',
        type: 'booking',
        isRead: false,
        bookingId: 'booking123',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        userId: 'user123',
        title: 'ئۆفەری تایبەت',
        message: 'داشکاندنی ٢٥٪ لەسەر هەموو خزمەتگوزارییەکانی پاککردنەوە بۆ ماوەی ٥ ڕۆژ',
        type: 'offer',
        isRead: false,
        offerId: 'offer123',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        userId: 'user123',
        title: 'پارەدان سەرکەوتووبوو',
        message: 'پارەدانی ١٥٠,٠٠٠ دینار بۆ داواکارییەکەت سەرکەوتووبوو',
        type: 'payment',
        isRead: true,
        bookingId: 'booking122',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        userId: 'user123',
        title: 'داواکاری تەواوبوو',
        message: 'خزمەتگوزارییەکە بە سەرکەوتوویی تەواو بوو. تکایە هەڵسەنگاندن بنووسە',
        type: 'booking',
        isRead: true,
        bookingId: 'booking121',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        userId: 'user123',
        title: 'پەیامی سیستەم',
        message: 'نوێکردنەوەی نوێ بۆ ئەپڵیکەیشن ئامادەیە. بۆ باشترکردنی ئەزموونەکەت نوێی بکەوە',
        type: 'system',
        isRead: false,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      },
    ];

    console.log('🚀 Adding sample notifications...');

    for (const notification of notifications) {
      const docRef = await db.collection('notifications').add(notification);
      console.log(`✅ Added notification: ${notification.title} (ID: ${docRef.id})`);
    }

    console.log('✨ All notifications added successfully!');
    console.log(`📊 Total: ${notifications.length} notifications`);
    console.log(`📮 Unread: ${notifications.filter(n => !n.isRead).length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding notifications:', error);
    process.exit(1);
  }
}

addSampleNotifications();
