'use client';

import { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import { CategoriesGrid } from './CategoriesGrid';
import { ServicesList } from './ServicesList';
import { BookingModal, BookingData } from './BookingModal';
import { ServiceDetailsModal } from './ServiceDetailsModal';
import { ChatModal } from './ChatModal';

const API_URL = 'http://localhost:3002/api';

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  profileImage?: string;
}

interface Booking {
  id: string;
  serviceTitle: string;
  providerName: string;
  scheduledDate: string;
  scheduledTime: string;
  status: string;
  totalPrice: number;
}

export function CustomerDashboard({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [stats, setStats] = useState({ bookings: 0, completed: 0, pending: 0 });
  const [activeTab, setActiveTab] = useState<'services' | 'bookings' | 'profile'>('services');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [bookingModal, setBookingModal] = useState<{ isOpen: boolean; service: any | null }>({
    isOpen: false,
    service: null,
  });
  const [detailsModal, setDetailsModal] = useState<{ isOpen: boolean; serviceId: string }>({
    isOpen: false,
    serviceId: '',
  });
  const [chatModal, setChatModal] = useState<{ isOpen: boolean; bookingId: string }>({
    isOpen: false,
    bookingId: '',
  });
  const [myBookings, setMyBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetchStats();
    fetchMyBookings();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/bookings/my-bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      
      if (data.data) {
        const bookings = data.data;
        setStats({
          bookings: bookings.length,
          completed: bookings.filter((b: any) => b.status === 'completed').length,
          pending: bookings.filter((b: any) => b.status === 'pending' || b.status === 'confirmed').length,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchMyBookings = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/bookings/my-bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      
      if (data.data) {
        setMyBookings(data.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('');
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery('');
  };

  const handleBookClick = async (serviceId: string) => {
    try {
      const response = await fetch(`${API_URL}/services/${serviceId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch service');
      }
      const data = await response.json();
      const service = data.service || data;
      setBookingModal({ isOpen: true, service });
    } catch (error) {
      console.error('Error fetching service:', error);
      alert('کێشەیەک ڕوویدا لە هێنانی زانیاری خزمەتگوزاری');
    }
  };

  const handleDetailsClick = (serviceId: string) => {
    setDetailsModal({ isOpen: true, serviceId });
  };

  const handleBookingConfirm = async (bookingData: BookingData) => {
    try {
      const token = localStorage.getItem('authToken');
      
      // Transform data to match API format
      const apiData = {
        serviceId: bookingData.serviceId,
        bookingDate: `${bookingData.scheduledDate}T${bookingData.scheduledTime}`,
        scheduledDate: bookingData.scheduledDate,
        scheduledTime: bookingData.scheduledTime,
        notes: bookingData.notes || '',
        address: bookingData.address || '',
        customPrice: bookingData.customPrice,
      };
      
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(apiData),
      });

      const result = await response.json();
      
      if (response.ok) {
        alert('✅ داواکاریەکەت بەسەرکەوتویی نێردرا!');
        fetchStats();
        fetchMyBookings();
        setActiveTab('bookings');
        setBookingModal({ isOpen: false, service: null });
      } else {
        alert('❌ هەڵە: ' + (result.error || 'تکایە دووبارە هەوڵبدەرەوە'));
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('❌ کێشەیەک ڕوویدا. تکایە دووبارە هەوڵبدەرەوە');
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-500',
      confirmed: 'bg-blue-500',
      'in-progress': 'bg-purple-500',
      completed: 'bg-green-500',
      cancelled: 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      pending: 'چاوەڕوان',
      confirmed: 'پشتڕاست',
      'in-progress': 'لەجێبەجێکردندایە',
      completed: 'تەواوبوو',
      cancelled: 'هەڵوەشاوە',
    };
    return texts[status] || status;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-cyan-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-2xl text-white font-bold shadow-xl">
                  {user.fullName?.charAt(0) || 'ب'}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">بەخێربێیت، {user.fullName}! 👋</h1>
                <p className="text-teal-200 text-sm">دیزاینی پرۆفیشناڵ بەزاری - Customer Dashboard</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/50"
            >
              چوونەدەرەوە 🚪
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl p-6 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-semibold mb-2">کۆی داواکاریەکان</p>
                <h3 className="text-4xl font-bold text-white">{stats.bookings}</h3>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-xl">📋</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-3xl p-6 shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-semibold mb-2">تەواوکراوەکان</p>
                <h3 className="text-4xl font-bold text-white">{stats.completed}</h3>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-xl">✅</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-3xl p-6 shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-semibold mb-2">لە چاوەڕوانیدا</p>
                <h3 className="text-4xl font-bold text-white">{stats.pending}</h3>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-xl">⏳</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-white/20 bg-white/5">
            <div className="flex">
              <button
                onClick={() => setActiveTab('services')}
                className={`flex-1 px-6 py-4 text-center font-bold transition-all duration-300 ${
                  activeTab === 'services' ? 'bg-teal-500 text-white shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-xl ml-2">🛠️</span>
                خزمەتگوزاریەکان
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`flex-1 px-6 py-4 text-center font-bold transition-all duration-300 ${
                  activeTab === 'bookings' ? 'bg-teal-500 text-white shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-xl ml-2">📅</span>
                داواکاریەکانم
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 px-6 py-4 text-center font-bold transition-all duration-300 ${
                  activeTab === 'profile' ? 'bg-teal-500 text-white shadow-lg' : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-xl ml-2">👤</span>
                پرۆفایلم
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'services' && (
              <div>
                <SearchBar onSearch={handleSearch} />
                
                {!searchQuery && !selectedCategory && (
                  <CategoriesGrid onCategoryClick={handleCategoryClick} />
                )}
                
                <ServicesList
                  searchQuery={searchQuery}
                  categoryId={selectedCategory}
                  onBookClick={handleBookClick}
                  onDetailsClick={handleDetailsClick}
                />
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <span className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center ml-3 text-xl">📅</span>
                  داواکاریەکانم ({myBookings.length})
                </h2>
                
                {myBookings.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="text-8xl mb-6">📋</div>
                    <p className="text-white/70 text-xl mb-2">هێشتا هیچ داواکاریەکت نییە</p>
                    <p className="text-white/50 text-sm mb-6">دەستپێبکە و یەکەم خزمەتگوزارییەکەت داوابکە!</p>
                    <button
                      onClick={() => setActiveTab('services')}
                      className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      دەستپێبکە 🚀
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-teal-400 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">{booking.serviceTitle || 'خزمەتگوزاری'}</h3>
                            <p className="text-teal-200 text-sm">پیشەساز: {booking.providerName || 'نادیار'}</p>
                          </div>
                          <span className={`${getStatusColor(booking.status)} text-white px-4 py-2 rounded-xl text-sm font-bold`}>
                            {getStatusText(booking.status)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-white/50 block mb-1">بەروار</span>
                            <span className="text-white font-bold">{booking.scheduledDate}</span>
                          </div>
                          <div>
                            <span className="text-white/50 block mb-1">کات</span>
                            <span className="text-white font-bold">{booking.scheduledTime}</span>
                          </div>
                          <div>
                            <span className="text-white/50 block mb-1">نرخ</span>
                            <span className="text-teal-400 font-bold">{booking.totalPrice?.toLocaleString() || '0'} IQD</span>
                          </div>
                          <div>
                            <button 
                              onClick={() => setChatModal({ isOpen: true, bookingId: booking.id })}
                              className="w-full px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-bold transition-all duration-300 text-sm"
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

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <span className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center ml-3 text-xl">👤</span>
                  زانیاریەکانم
                </h2>
                
                <div className="max-w-2xl mx-auto">
                  <div className="bg-white/5 rounded-2xl p-8 border border-white/20">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-white/70 text-sm font-bold mb-2">ناوی تەواو</label>
                        <input
                          type="text"
                          value={user.fullName}
                          readOnly
                          className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white focus:outline-none focus:border-teal-400"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white/70 text-sm font-bold mb-2">ئیمەیڵ</label>
                        <input
                          type="email"
                          value={user.email}
                          readOnly
                          className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white focus:outline-none focus:border-teal-400"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white/70 text-sm font-bold mb-2">رۆڵ</label>
                        <input
                          type="text"
                          value="بەکارهێنەر (Customer)"
                          readOnly
                          className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white focus:outline-none focus:border-teal-400"
                        />
                      </div>

                      <button className="w-full px-6 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg">
                        دەستکاریکردنی پرۆفایل ✏️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-8 text-white/50 text-sm">
          <p>© 2026 بەزاری - هەموو مافێک پارێزراوە 💙</p>
        </div>
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={bookingModal.isOpen}
        service={bookingModal.service}
        onClose={() => setBookingModal({ isOpen: false, service: null })}
        onConfirm={handleBookingConfirm}
      />

      <ChatModal
        isOpen={chatModal.isOpen}
        onClose={() => setChatModal({ isOpen: false, bookingId: '' })}
        bookingId={chatModal.bookingId}
        currentUserId={user.id}
      />

      {detailsModal.isOpen && (
        <ServiceDetailsModal
          serviceId={detailsModal.serviceId}
          onClose={() => setDetailsModal({ isOpen: false, serviceId: '' })}
          onBook={(serviceId) => {
            setDetailsModal({ isOpen: false, serviceId: '' });
            handleBookClick(serviceId);
          }}
        />
      )}
    </div>
  );
}
