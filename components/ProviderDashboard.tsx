'use client';

import { useState, useEffect } from 'react';
import { ServicesList } from './ServicesList';
import { BookingModal } from './BookingModal';
import { ChatWindow } from './ChatWindow';
import { NotificationCenter } from './NotificationCenter';
import { SuccessAnimation } from './SuccessAnimation';

const API_URL = 'http://localhost:3002/api';

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  profileImage?: string;
}

export function ProviderDashboard({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [stats, setStats] = useState({ services: 0, bookings: 0, revenue: 0 });
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'bookings'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatBookingId, setChatBookingId] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchBookings();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/provider/stats`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_URL}/provider/bookings`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBookings(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleAcceptBooking = async (bookingId: string) => {
    try {
      const response = await fetch(`${API_URL}/bookings/${bookingId}/accept`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        fetchBookings();
      }
    } catch (error) {
      console.error('Error accepting booking:', error);
    }
  };

  const handleRejectBooking = async (bookingId: string) => {
    try {
      const response = await fetch(`${API_URL}/bookings/${bookingId}/reject`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Error rejecting booking:', error);
    }
  };

  const handleChatClick = (bookingId: string) => {
    setChatBookingId(bookingId);
    setShowChat(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-cyan-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-2xl text-white font-bold shadow-xl">
                  {user.fullName?.charAt(0) || 'د'}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">بەخێربێیت، {user.fullName}! 🌟</h1>
                <p className="text-teal-200 text-sm">دیزاینی پرۆفیشناڵ بەزاری - Provider Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              {/* Notifications */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300"
              >
                🔔 <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
              </button>
              
              <button
                onClick={onLogout}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/50"
              >
                چوونەدەرەوە 🚪
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-6 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-semibold mb-2">خزمەتگوزاریەکانم</p>
                <h3 className="text-4xl font-bold text-white">{stats.services}</h3>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-xl">🛠️</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-700 rounded-3xl p-6 shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-semibold mb-2">داواکاریەکان</p>
                <h3 className="text-4xl font-bold text-white">{stats.bookings}</h3>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-xl">📋</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-700 rounded-3xl p-6 shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-semibold mb-2">داهاتم</p>
                <h3 className="text-3xl font-bold text-white">{stats.revenue.toLocaleString()} IQD</h3>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-xl">💰</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-white/20 bg-white/5">
            <div className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 px-6 py-4 text-center font-bold transition-all duration-300 ${
                  activeTab === 'overview' ? 'bg-teal-500 text-white shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-xl ml-2">📊</span>
                سەرەکی
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`flex-1 px-6 py-4 text-center font-bold transition-all duration-300 ${
                  activeTab === 'services' ? 'bg-teal-500 text-white shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-xl ml-2">🛠️</span>
                خزمەتگوزاریەکانم
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`flex-1 px-6 py-4 text-center font-bold transition-all duration-300 ${
                  activeTab === 'bookings' ? 'bg-teal-500 text-white shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-xl ml-2">📅</span>
                داواکاریەکان
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <span className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center ml-3 text-xl">📊</span>
                  پێشبینی گشتی
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Quick Actions */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <span className="text-2xl ml-2">⚡</span>
                      کردارە خێراکان
                    </h3>
                    <div className="space-y-3">
                      <button className="w-full px-4 py-3 bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 text-right">
                        ➕ زیادکردنی خزمەتگوزاری نوێ
                      </button>
                      <button className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-cyan-700 hover:from-cyan-600 hover:to-cyan-800 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 text-right">
                        👁️ بینینی داواکاریەکان
                      </button>
                      <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 text-right">
                        💬 نامەکانم
                      </button>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <span className="text-2xl ml-2">🔔</span>
                      چالاکیە نوێکان
                    </h3>
                    <div className="space-y-3">
                      <div className="text-center py-8">
                        <div className="text-5xl mb-3">🔕</div>
                        <p className="text-white/50">هیچ چالاکیەکی نوێت نییە</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-white flex items-center">
                    <span className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center ml-3 text-xl">🛠️</span>
                    خزمەتگوزاریەکانم
                  </h2>
                  <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg">
                    ➕ زیادکردن
                  </button>
                </div>

                <div className="text-center py-20">
                  <div className="text-8xl mb-6">🛠️</div>
                  <p className="text-white/70 text-xl mb-2">هێشتا هیچ خزمەتگوزاریەکت نییە</p>
                  <p className="text-white/50 text-sm mb-6">خزمەتگوزاریەکانت زیاد بکە بۆ دەستپێکردن</p>
                  <button className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg">
                    یەکەمین خزمەتگوزاری زیاد بکە 🚀
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <span className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center ml-3 text-xl">📅</span>
                  داواکاریەکان
                </h2>

                {bookings.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="text-8xl mb-6">📋</div>
                    <p className="text-white/70 text-xl mb-2">هێشتا هیچ داواکاریەکت نییە</p>
                    <p className="text-white/50 text-sm">کاتێک کەسێک خزمەتگوزاریەکانت داوا بکات، لێرە دەیبینیت</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
                              <h3 className="text-xl font-bold text-white">{booking.serviceTitle}</h3>
                              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                                booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                                booking.status === 'accepted' ? 'bg-green-500/20 text-green-300' :
                                booking.status === 'completed' ? 'bg-blue-500/20 text-blue-300' :
                                'bg-red-500/20 text-red-300'
                              }`}>
                                {booking.status === 'pending' ? 'چاوەڕوانی' :
                                 booking.status === 'accepted' ? 'قبوڵکراوە' :
                                 booking.status === 'completed' ? 'تەواو بووە' : 'ڕەتکراوەتەوە'}
                              </span>
                            </div>
                            
                            <div className="space-y-2 text-white/70">
                              <p className="flex items-center"><span className="ml-2">👤</span> کڕیار: {booking.customerName}</p>
                              <p className="flex items-center"><span className="ml-2">📅</span> بەروار: {booking.date}</p>
                              <p className="flex items-center"><span className="ml-2">⏰</span> کات: {booking.time}</p>
                              <p className="flex items-center"><span className="ml-2">💰</span> نرخ: ${booking.price}</p>
                              {booking.notes && (
                                <p className="flex items-start"><span className="ml-2 mt-1">📝</span> تێبینی: {booking.notes}</p>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col space-y-2">
                            {booking.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleAcceptBooking(booking.id)}
                                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                                >
                                  ✅ قبوڵکردن
                                </button>
                                <button
                                  onClick={() => handleRejectBooking(booking.id)}
                                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                                >
                                  ❌ ڕەتکردنەوە
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handleChatClick(booking.id)}
                              className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                            >
                              💬 چات
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-8 text-white/50 text-sm">
          <p>© 2026 بەزاری - هەموو مافێک پارێزراوە 💙</p>
        </div>
      </div>

      {/* Modals & Overlays */}
      {showNotifications && (
        <NotificationCenter 
          isOpen={showNotifications} 
          onClose={() => setShowNotifications(false)} 
          userId={user.id}
        />
      )}

      {showChat && chatBookingId && (
        <ChatWindow
          bookingId={chatBookingId}
          currentUserId={user.id}
          currentUserName={user.fullName}
          otherUserName="Customer"
          onClose={() => {
            setShowChat(false);
            setChatBookingId(null);
          }}
        />
      )}

      {showSuccess && <SuccessAnimation show={showSuccess} message="داواکارییەکە قبوڵ کرا! 🎉" onComplete={() => setShowSuccess(false)} />}
    </div>
  );
}
