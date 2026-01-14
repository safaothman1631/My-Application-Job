'use client';

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'payment' | 'system' | 'offer';
  isRead: boolean;
  createdAt: string;
  bookingId?: string;
  offerId?: string;
}

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setIsLoading(true);
    try {
      const userData = localStorage.getItem('currentUser');
      if (!userData) return;
      
      const user = JSON.parse(userData);
      const response = await fetch(`/api/notifications?userId=${user.id}`);
      const data = await response.json();
      
      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId, isRead: true }),
      });
      
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    
    if (notification.bookingId) {
      router.push(`/dashboard/booking/${notification.bookingId}`);
    } else if (notification.offerId) {
      router.push(`/dashboard/offers/${notification.offerId}`);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return { icon: 'solar:calendar-mark-bold', color: 'bg-blue-100 text-blue-600' };
      case 'payment':
        return { icon: 'solar:wallet-bold', color: 'bg-green-100 text-green-600' };
      case 'offer':
        return { icon: 'solar:tag-price-bold', color: 'bg-purple-100 text-purple-600' };
      default:
        return { icon: 'solar:bell-bold', color: 'bg-gray-100 text-gray-600' };
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'ئێستا';
    if (minutes < 60) return `${minutes} خولەک پێش ئێستا`;
    if (hours < 24) return `${hours} کاتژمێر پێش ئێستا`;
    if (days < 7) return `${days} ڕۆژ پێش ئێستا`;
    return date.toLocaleDateString('ar-IQ');
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Icon icon="svg-spinners:ring-resize" className="text-6xl text-blue-600" />
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
      `}} />

      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all active:scale-95"
          >
            <Icon icon="solar:alt-arrow-right-bold" className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">ئاگادارکردنەوەکان</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-2xl p-1 shadow-sm">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              filter === 'all'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            هەموو ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              filter === 'unread'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            نەخوێندراوە ({notifications.filter(n => !n.isRead).length})
          </button>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 rounded-3xl bg-gray-100 flex items-center justify-center">
              <Icon icon="solar:bell-bold-duotone" className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">هیچ ئاگادارکردنەوەیەک نییە</h3>
            <p className="text-sm text-gray-500">
              ئاگادارکردنەوەکانت لێرە نیشان دەدرێن
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification, index) => {
              const { icon, color } = getNotificationIcon(notification.type);
              return (
                <button
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all active:scale-98 animate-fade-in-up ${
                    !notification.isRead ? 'border-2 border-blue-200' : 'border border-gray-100'
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center shrink-0`}>
                      <Icon icon={icon} className="w-6 h-6" />
                    </div>
                    <div className="flex-1 text-right">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className={`font-bold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        {!notification.isRead && (
                          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shrink-0 mr-2"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Icon icon="solar:clock-circle-bold" className="w-4 h-4" />
                        <span>{formatTime(notification.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
