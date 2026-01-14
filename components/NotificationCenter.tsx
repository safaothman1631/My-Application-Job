'use client';

import { useState } from 'react';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'message' | 'review' | 'system';
  read: boolean;
  timestamp: string;
}

export function NotificationCenter({ isOpen, onClose, userId }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:3002/api/notifications/my-notifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.data) {
        setNotifications(data.data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const token = localStorage.getItem('authToken');
      await fetch(`http://localhost:3002/api/notifications/${notificationId}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    const icons: Record<string, string> = {
      booking: '📅',
      message: '💬',
      review: '⭐',
      system: '🔔',
    };
    return icons[type] || '📢';
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end md:items-start md:justify-end">
      <div className="bg-gradient-to-br from-blue-900 via-teal-900 to-cyan-900 w-full md:max-w-md md:h-full md:rounded-l-3xl rounded-t-3xl shadow-2xl border border-white/20 flex flex-col max-h-[90vh] md:max-h-full">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">ئاگادارکردنەوەکان</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-red-500/20 hover:bg-red-500/40 rounded-xl flex items-center justify-center text-white text-xl transition-all duration-300"
          >
            ✕
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 animate-bounce">🔔</div>
              <p className="text-white/70">چاوەڕێبە...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">🔕</div>
              <p className="text-white/70 text-xl">هیچ ئاگادارکردنەوەیەک نییە</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    notification.read
                      ? 'bg-white/5 border-white/10'
                      : 'bg-teal-500/20 border-teal-400/30 hover:bg-teal-500/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{getIcon(notification.type)}</div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold mb-1">{notification.title}</h4>
                      <p className="text-white/70 text-sm mb-2">{notification.message}</p>
                      <p className="text-white/40 text-xs">
                        {new Date(notification.timestamp).toLocaleString('ku')}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-white/10 border-t border-white/20 p-4">
          <button
            onClick={() => {
              notifications.forEach(n => !n.read && markAsRead(n.id));
            }}
            className="w-full px-4 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-bold transition-all duration-300"
          >
            نیشانکردنی هەموو وەک خوێندراوە ✓
          </button>
        </div>
      </div>
    </div>
  );
}
