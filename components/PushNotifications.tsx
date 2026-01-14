'use client';

import React, { useEffect, useState } from 'react';

export function PushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => {
          console.log('Service Worker registered:', reg);
          setRegistration(reg);
        })
        .catch(err => console.error('Service Worker registration failed:', err));
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications');
      return;
    }

    const result = await Notification.requestPermission();
    setPermission(result);

    if (result === 'granted') {
      // Subscribe to push notifications
      if (registration) {
        try {
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
          });
          
          // Send subscription to backend
          await fetch('/api/notifications/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subscription),
          });
        } catch (error) {
          console.error('Failed to subscribe to push notifications:', error);
        }
      }
    }
  };

  if (permission === 'granted') {
    return null; // Don't show anything if already granted
  }

  if (permission === 'denied') {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <p className="text-sm">
          ئاگاداریەکان ڕەتکراونەتەوە. بۆ چالاککردنی دووبارە، ڕێکخستنەکانی وێبگەڕەکەت بگۆڕە.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
      <p className="text-sm mb-2">
        ئاگاداریەکان چالاک بکە بۆ وەرگرتنی نوێکردنەوەی خێرا دەربارەی داواکاریەکانت
      </p>
      <button
        onClick={requestPermission}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
      >
        چالاککردن
      </button>
    </div>
  );
}
