'use client';

import { useState } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: string;
    title: string;
    price: number;
    provider?: {
      fullName: string;
    };
  } | null;
  onConfirm: (bookingData: BookingData) => void;
}

export interface BookingData {
  serviceId: string;
  scheduledDate: string;
  scheduledTime: string;
  notes: string;
  address: string;
  customPrice?: number;
}

export function BookingModal({ isOpen, onClose, service, onConfirm }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    serviceId: '',
    scheduledDate: '',
    scheduledTime: '',
    notes: '',
    address: '',
  });

  if (!isOpen || !service) return null;

  const handleConfirm = () => {
    onConfirm({ ...bookingData, serviceId: service.id });
    onClose();
    setStep(1);
    setBookingData({
      serviceId: '',
      scheduledDate: '',
      scheduledTime: '',
      notes: '',
      address: '',
    });
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (!service) return null;

  const serviceFee = Math.round((service.price || 0) * 0.15);
  const totalPrice = (service.price || 0) + serviceFee;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end md:items-center justify-center">
      <div className="bg-gradient-to-br from-blue-900 via-teal-900 to-cyan-900 w-full md:max-w-2xl md:rounded-3xl rounded-t-3xl shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white/10 backdrop-blur-xl border-b border-white/20 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">داواکردنی خزمەتگوزاری</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-red-500/20 hover:bg-red-500/40 rounded-xl flex items-center justify-center text-white text-xl transition-all duration-300"
          >
            ✕
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 bg-white/5">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    step >= num
                      ? 'bg-teal-500 text-white'
                      : 'bg-white/10 text-white/50'
                  }`}
                >
                  {num}
                </div>
                {num < 3 && (
                  <div
                    className={`h-1 w-12 md:w-20 mx-2 rounded transition-all duration-300 ${
                      step > num ? 'bg-teal-500' : 'bg-white/10'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Date & Time */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-teal-200 text-sm">{service.provider?.fullName}</p>
                <p className="text-2xl font-bold text-teal-400 mt-2">
                  {(service.price || 0).toLocaleString()} IQD
                </p>
                <p className="text-teal-200/70 text-xs mt-1">نرخی پرۆڤایدەر</p>
              </div>

              <div>
                <label className="block text-white font-bold mb-2">بەروار هەڵبژێرە 📅</label>
                <input
                  type="date"
                  min={getMinDate()}
                  value={bookingData.scheduledDate}
                  onChange={(e) => setBookingData({ ...bookingData, scheduledDate: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20"
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-2">کات هەڵبژێرە ⏰</label>
                <input
                  type="time"
                  value={bookingData.scheduledTime}
                  onChange={(e) => setBookingData({ ...bookingData, scheduledTime: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20"
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-2">نرخی پێشنیارکراو 💰 (دڵخواز)</label>
                <input
                  type="number"
                  min="0"
                  placeholder={`نرخی ئاسایی: ${service.price?.toLocaleString() || '0'} IQD`}
                  value={bookingData.customPrice || ''}
                  onChange={(e) => setBookingData({ ...bookingData, customPrice: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20"
                />
                <p className="text-teal-200/70 text-xs mt-1">ئەگەر نرخێکی جیاواز دەتەوێت، دەتوانیت لێرە بینووسیت</p>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!bookingData.scheduledDate || !bookingData.scheduledTime}
                className="w-full px-6 py-4 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                بەردەوامبە ← 
              </button>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-white font-bold mb-2">ناونیشان 📍</label>
                <input
                  type="text"
                  placeholder="ناونیشانی تەواو بنووسە"
                  value={bookingData.address}
                  onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20"
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-2">تێبینی (دڵخواز) 📝</label>
                <textarea
                  placeholder="کێشەکە بە کورتی باس بکە..."
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all duration-300"
                >
                  ← گەڕانەوە
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!bookingData.address}
                  className="flex-1 px-6 py-4 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  بەردەوامبە →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-white/10 rounded-2xl p-6 border border-white/20 space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">پوختەی داواکاری</h3>
                
                <div className="flex justify-between text-white">
                  <span>خزمەتگوزاری:</span>
                  <span className="font-bold">{service.title}</span>
                </div>

                <div className="flex justify-between text-white">
                  <span>پیشەساز:</span>
                  <span className="font-bold">{service.provider?.fullName}</span>
                </div>

                <div className="flex justify-between text-white">
                  <span>بەروار:</span>
                  <span className="font-bold">{bookingData.scheduledDate}</span>
                </div>

                <div className="flex justify-between text-white">
                  <span>کات:</span>
                  <span className="font-bold">{bookingData.scheduledTime}</span>
                </div>

                <div className="flex justify-between text-white">
                  <span>ناونیشان:</span>
                  <span className="font-bold text-sm">{bookingData.address}</span>
                </div>

                <div className="border-t border-white/20 pt-4 mt-4 space-y-2">
                  <div className="flex justify-between text-white">
                    <span>نرخی خزمەتگوزاری:</span>
                    <span className="font-bold">{(service.price || 0).toLocaleString()} IQD</span>
                  </div>
                  <div className="flex justify-between text-white/70 text-sm">
                    <span>کرێی سەکۆ (15%):</span>
                    <span>{serviceFee.toLocaleString()} IQD</span>
                  </div>
                  <div className="flex justify-between text-teal-400 text-xl font-bold pt-2 border-t border-white/20">
                    <span>کۆی گشتی:</span>
                    <span>{totalPrice.toLocaleString()} IQD</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4">
                <p className="text-white text-sm">
                  💡 پارەکەت پارێزراوە تا کارەکە تەواو دەبێت
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all duration-300"
                >
                  ← گەڕانەوە
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  پشتڕاستکردنەوە ✓
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
