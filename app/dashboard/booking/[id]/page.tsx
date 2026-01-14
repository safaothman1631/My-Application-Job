'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Icon } from '@iconify/react';

interface BookingDetails {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceIcon: string;
  providerId: string;
  providerName: string;
  providerImage: string;
  providerRating: number;
  providerReviews: number;
  date: string;
  time: string;
  address: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  price: number;
  notes?: string;
  createdAt: string;
}

export default function BookingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const bookingId = params.id as string;
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    loadBookingDetails();
  }, [bookingId]);

  const loadBookingDetails = async () => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`);
      const data = await response.json();
      
      if (data.booking) {
        setBooking(data.booking);
      }
    } catch (error) {
      console.error('Error loading booking:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'cancelled' }),
      });

      const data = await response.json();
      if (data.success || data.booking) {
        setShowCancelModal(false);
        router.push('/dashboard/bookings');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  const handleTrackService = () => {
    if (booking) {
      localStorage.setItem('selectedProvider', JSON.stringify({
        id: booking.providerId,
        name: booking.providerName,
        image: booking.providerImage,
        rating: booking.providerRating,
      }));
      router.push('/dashboard/tracking');
    }
  };

  const handleContactProvider = () => {
    if (booking) {
      localStorage.setItem('selectedProvider', JSON.stringify({
        id: booking.providerId,
        name: booking.providerName,
        image: booking.providerImage,
      }));
      router.push('/dashboard/messages/chat');
    }
  };

  const handleViewReceipt = () => {
    router.push('/dashboard/order');
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

  const getStatusTimeline = (status: string) => {
    const steps = [
      { key: 'pending', label: 'داواکراوە', icon: 'solar:clock-circle-bold' },
      { key: 'confirmed', label: 'دڵنیاکراوە', icon: 'solar:check-circle-bold' },
      { key: 'in-progress', label: 'دەستی پێکردووە', icon: 'solar:play-circle-bold' },
      { key: 'completed', label: 'تەواوبووە', icon: 'solar:verified-check-bold' },
    ];

    const statusOrder = ['pending', 'confirmed', 'in-progress', 'completed'];
    const currentIndex = statusOrder.indexOf(status);

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F9FAFB]">
        <Icon icon="svg-spinners:ring-resize" className="text-6xl text-blue-600" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#F9FAFB] gap-4">
        <Icon icon="solar:danger-circle-bold-duotone" className="text-6xl text-red-400" />
        <p className="text-slate-600">بووکینگەکە نەدۆزرایەوە</p>
        <button
          onClick={() => router.push('/dashboard/bookings')}
          className="px-6 py-3 bg-[#2563EB] text-white rounded-2xl font-bold text-sm"
        >
          گەڕانەوە بۆ بووکینگەکان
        </button>
      </div>
    );
  }

  const statusInfo = getStatusInfo(booking.status);
  const timeline = getStatusTimeline(booking.status);

  return (
    <div dir="rtl" className="relative w-full max-w-[430px] mx-auto min-h-screen bg-[#F9FAFB] shadow-2xl overflow-hidden flex flex-col font-[family-name:var(--font-lateef)]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .pulse-ring {
          animation: pulse-ring 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors active:scale-95"
            >
              <Icon icon="solar:arrow-right-linear" className="text-xl text-slate-700" />
            </button>
            <div className="text-right">
              <h1 className="text-lg font-bold text-slate-800">وردەکاریەکانی بووکینگ</h1>
              <p className="text-xs text-slate-500">#{booking.id.slice(-6).toUpperCase()}</p>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${statusInfo.bg} border ${statusInfo.border}`}>
            <span className={`text-xs font-bold ${statusInfo.color}`}>{statusInfo.text}</span>
            <Icon icon={statusInfo.icon} className={`text-sm ${statusInfo.color}`} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 py-6 pb-40 hide-scrollbar">
        {/* Service Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-4">
          <div className="flex items-start gap-4">
            <div className="flex-1 text-right">
              <h2 className="text-xl font-bold text-slate-800 mb-1">{booking.serviceName}</h2>
              <p className="text-sm text-slate-600">کۆدی خزمەتگوزاری: {booking.serviceId.toUpperCase()}</p>
            </div>
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
              <Icon icon={booking.serviceIcon} className="text-4xl text-white" />
            </div>
          </div>
        </div>

        {/* Provider Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 text-right">
              <h3 className="font-bold text-slate-800 text-base mb-1">{booking.providerName}</h3>
              <div className="flex items-center justify-end gap-1">
                <span className="text-xs text-slate-400">({booking.providerReviews})</span>
                <span className="text-sm font-bold text-slate-700">{booking.providerRating}</span>
                <Icon icon="solar:star-bold" className="text-sm text-amber-500" />
              </div>
            </div>
            <div className="relative">
              <img
                alt={booking.providerName}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100"
                src={booking.providerImage}
              />
              <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-[#2563EB] rounded-full flex items-center justify-center ring-2 ring-white">
                <Icon icon="solar:check-circle-bold" className="text-white text-xs" />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleContactProvider}
              className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-2xl text-sm font-semibold text-slate-700 transition-colors active:scale-95 flex items-center justify-center gap-2"
            >
              <Icon icon="solar:chat-round-dots-bold" className="text-lg" />
              پەیام
            </button>
            <button className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-2xl text-sm font-semibold text-slate-700 transition-colors active:scale-95 flex items-center justify-center gap-2">
              <Icon icon="solar:phone-bold" className="text-lg" />
              پەیوەندی
            </button>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-4">
          <h3 className="text-sm font-bold text-slate-800 mb-4">وردەکارییەکان</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <div className="flex items-center gap-2 text-slate-700">
                <Icon icon="solar:calendar-bold" className="text-slate-400" />
                <span className="text-sm">{formatDate(booking.date)}</span>
              </div>
              <span className="text-xs text-slate-500">بەروار</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <div className="flex items-center gap-2 text-slate-700">
                <Icon icon="solar:clock-circle-bold" className="text-slate-400" />
                <span className="text-sm">{booking.time}</span>
              </div>
              <span className="text-xs text-slate-500">کات</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-50">
              <div className="flex items-center gap-2 text-slate-700">
                <Icon icon="solar:map-point-bold" className="text-slate-400" />
                <span className="text-sm">{booking.address}</span>
              </div>
              <span className="text-xs text-slate-500">ناونیشان</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">IQD</span>
                <span className="text-lg font-bold text-slate-800">{(booking.price || 0).toLocaleString()}</span>
              </div>
              <span className="text-xs text-slate-500">نرخ</span>
            </div>
          </div>
          {booking.notes && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500 mb-1">تێبینی</p>
              <p className="text-sm text-slate-700">{booking.notes}</p>
            </div>
          )}
        </div>

        {/* Status Timeline */}
        {booking.status !== 'cancelled' && (
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-4">
            <h3 className="text-sm font-bold text-slate-800 mb-5">دۆخی بووکینگ</h3>
            <div className="space-y-4">
              {timeline.map((step, index) => (
                <div key={step.key} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      step.completed 
                        ? 'bg-[#2563EB] ring-4 ring-blue-50' 
                        : 'bg-slate-100'
                    }`}>
                      <Icon 
                        icon={step.icon} 
                        className={`text-lg ${step.completed ? 'text-white' : 'text-slate-400'}`} 
                      />
                    </div>
                    {index < timeline.length - 1 && (
                      <div className={`w-0.5 h-8 my-1 ${
                        step.completed ? 'bg-[#2563EB]' : 'bg-slate-200'
                      }`}></div>
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <p className={`text-sm font-semibold ${
                      step.completed ? 'text-slate-800' : 'text-slate-400'
                    }`}>
                      {step.label}
                    </p>
                    {step.active && (
                      <p className="text-xs text-slate-500 mt-0.5">دۆخی ئێستا</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 pb-8 z-50">
        <div className="max-w-[430px] mx-auto">
          {booking.status === 'completed' ? (
            <button
              onClick={handleViewReceipt}
              className="w-full py-4 bg-[#2563EB] hover:bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Icon icon="solar:bill-list-bold" className="text-xl" />
              بینینی وەسڵ
            </button>
          ) : booking.status === 'in-progress' ? (
            <button
              onClick={handleTrackService}
              className="w-full py-4 bg-[#2563EB] hover:bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Icon icon="solar:map-point-wave-bold" className="text-xl" />
              شوێنپێی زیندوو
            </button>
          ) : booking.status === 'cancelled' ? (
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full py-4 bg-[#2563EB] hover:bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all"
            >
              بووککردنی نوێ
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(true)}
                className="flex-1 py-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl font-bold text-sm active:scale-95 transition-all border border-red-200"
              >
                هەڵوەشاندنەوە
              </button>
              <button
                onClick={handleContactProvider}
                className="flex-1 py-4 bg-[#2563EB] hover:bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all"
              >
                پەیوەندی بە پیشەوەر
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full animate-scale-in">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon icon="solar:danger-circle-bold" className="text-4xl text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 text-center mb-2">هەڵوەشاندنەوەی بووکینگ</h3>
            <p className="text-sm text-slate-600 text-center mb-6">
              دڵنیای لە هەڵوەشاندنەوەی ئەم بووکینگە؟ ئەم کردارە ناگەڕێتەوە.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-semibold text-sm active:scale-95 transition-all"
              >
                نەخێر
              </button>
              <button
                onClick={handleCancelBooking}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-sm active:scale-95 transition-all"
              >
                بەڵێ، هەڵیوەشێنەوە
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
