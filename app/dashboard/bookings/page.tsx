'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceIcon: string;
  providerId: string;
  providerName: string;
  providerImage: string;
  date: string;
  time: string;
  address: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  price: number;
  notes?: string;
  createdAt: string;
}

export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      router.push('/');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    loadBookings(parsedUser.id);
  }, [router]);

  const loadBookings = async (userId: string) => {
    try {
      const response = await fetch(`/api/bookings?userId=${userId}`);
      const data = await response.json();
      
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookingClick = (bookingId: string) => {
    router.push(`/dashboard/booking/${bookingId}`);
  };

  const getStatusInfo = (status: string) => {
    const statusMap = {
      pending: { text: 'چاوەڕوانی', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: 'solar:clock-circle-bold' },
      confirmed: { text: 'دڵنیاکراوە', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', icon: 'solar:check-circle-bold' },
      'in-progress': { text: 'لە ڕێگادایە', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', icon: 'solar:routing-2-bold' },
      completed: { text: 'تەواوبوو', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: 'solar:verified-check-bold' },
      cancelled: { text: 'هەڵوەشاوە', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: 'solar:close-circle-bold' },
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.pending;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const months = ['کانوونی دووەم', 'شوبات', 'ئادار', 'نیسان', 'ئایار', 'حوزەیران', 'تەمووز', 'ئاب', 'ئەیلوول', 'تشرینی یەکەم', 'تشرینی دووەم', 'کانوونی یەکەم'];
    return `${date.getDate()} ${months[date.getMonth()]}، ${date.getFullYear()}`;
  };

  const activeBookings = bookings.filter(b => 
    ['pending', 'confirmed', 'in-progress'].includes(b.status)
  );

  const completedBookings = bookings.filter(b => 
    ['completed', 'cancelled'].includes(b.status)
  );

  const displayBookings = activeTab === 'active' ? activeBookings : completedBookings;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F9FAFB]">
        <Icon icon="svg-spinners:ring-resize" className="text-6xl text-blue-600" />
      </div>
    );
  }

  return (
    <div dir="rtl" className="relative w-full max-w-[430px] mx-auto min-h-screen bg-[#F9FAFB] shadow-2xl overflow-hidden flex flex-col font-[family-name:var(--font-lateef)]">
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* Header */}
      <header className="px-6 py-4 bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-slate-800">بووکینگەکانم</h1>
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors active:scale-95"
          >
            <Icon icon="solar:arrow-right-linear" className="text-xl text-slate-700" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-slate-100 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'active'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500'
            }`}
          >
            چالاک ({activeBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'completed'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-500'
            }`}
          >
            تەواوبوو ({completedBookings.length})
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 py-6 pb-28 hide-scrollbar">
        {displayBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 gap-4">
            <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center">
              <Icon icon="solar:calendar-mark-bold-duotone" className="text-5xl text-slate-400" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-800 mb-1">
                {activeTab === 'active' ? 'هیچ بووکینگێکی چالاک نییە' : 'هیچ بووکینگێک تەواو نەبووە'}
              </h3>
              <p className="text-sm text-slate-500">
                {activeTab === 'active' ? 'دەستپێبکە بە بووککردنی یەکەم خزمەتگوزاریت!' : 'بووکینگە تەواوبووەکان لێرە دەردەکەون'}
              </p>
            </div>
            {activeTab === 'active' && (
              <button
                onClick={() => router.push('/dashboard')}
                className="mt-4 px-6 py-3 bg-[#2563EB] text-white rounded-2xl font-bold text-sm shadow-lg hover:bg-blue-600 active:scale-95 transition-all"
              >
                گەڕان بۆ خزمەتگوزاری
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {displayBookings.map((booking) => {
              const statusInfo = getStatusInfo(booking.status);
              return (
                <button
                  key={booking.id}
                  onClick={() => handleBookingClick(booking.id)}
                  className="w-full p-4 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all active:scale-95 text-right"
                >
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${statusInfo.bg} border ${statusInfo.border}`}>
                      <span className={`text-xs font-bold ${statusInfo.color}`}>{statusInfo.text}</span>
                      <Icon icon={statusInfo.icon} className={`text-sm ${statusInfo.color}`} />
                    </div>
                    <span className="text-xs text-slate-400">#{booking.id.slice(-6).toUpperCase()}</span>
                  </div>

                  {/* Service & Provider */}
                  <div className="flex items-start gap-4 mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-800 text-base mb-0.5">{booking.serviceName}</h3>
                      <p className="text-sm text-slate-600">{booking.providerName}</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                      <Icon icon={booking.serviceIcon} className="text-2xl text-white" />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 bg-slate-50 rounded-2xl p-3">
                    <div className="flex items-center justify-end gap-2 text-sm">
                      <span className="text-slate-700">{formatDate(booking.date)}</span>
                      <Icon icon="solar:calendar-bold" className="text-slate-400" />
                    </div>
                    <div className="flex items-center justify-end gap-2 text-sm">
                      <span className="text-slate-700">{booking.time}</span>
                      <Icon icon="solar:clock-circle-bold" className="text-slate-400" />
                    </div>
                    <div className="flex items-center justify-end gap-2 text-sm">
                      <span className="text-slate-700 truncate">{booking.address}</span>
                      <Icon icon="solar:map-point-bold" className="text-slate-400 shrink-0" />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-500">IQD</span>
                      <span className="text-lg font-bold text-slate-800">{(booking.price || 0).toLocaleString()}</span>
                    </div>
                    <Icon icon="solar:arrow-left-linear" className="text-slate-400" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full bg-white/90 backdrop-blur-lg border-t border-slate-100 px-8 py-4 flex justify-between items-center z-10 pb-8">
        <button 
          onClick={() => router.push('/dashboard')}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors active:scale-95"
        >
          <Icon icon="solar:home-2-bold" className="text-2xl" />
          <span className="text-[10px] font-medium">سەرەکی</span>
        </button>
        <button className="flex flex-col items-center gap-1 active:scale-95 transition-transform">
          <Icon icon="solar:calendar-mark-bold" className="text-2xl text-[#2563EB]" />
          <span className="text-[10px] font-bold text-[#2563EB]">بووکینگەکان</span>
        </button>
        <div className="relative -top-6">
          <button 
            onClick={() => router.push('/dashboard')}
            className="w-14 h-14 bg-[#2563EB] hover:bg-blue-600 rounded-2xl shadow-[0_8px_16px_rgba(37,99,235,0.3)] flex items-center justify-center transform active:scale-90 transition-all"
          >
            <Icon icon="solar:add-circle-bold" className="text-3xl text-white" />
          </button>
        </div>
        <button 
          onClick={() => router.push('/dashboard/messages')}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors active:scale-95"
        >
          <Icon icon="solar:chat-round-dots-bold" className="text-2xl" />
          <span className="text-[10px] font-medium">پەیامەکان</span>
        </button>
        <button 
          onClick={() => router.push('/dashboard/profile')}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors active:scale-95"
        >
          <Icon icon="solar:user-circle-bold" className="text-2xl" />
          <span className="text-[10px] font-medium">پرۆفایل</span>
        </button>
      </nav>

      {/* Home Indicator */}
      <div className="absolute bottom-1 w-full flex justify-center z-20 pointer-events-none">
        <div className="w-32 h-1 bg-slate-900/10 rounded-full"></div>
      </div>
    </div>
  );
}
