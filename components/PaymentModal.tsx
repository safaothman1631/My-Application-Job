'use client';

import { useState } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: {
    id: string;
    serviceTitle: string;
    totalPrice: number;
  } | null;
  onSuccess: () => void;
}

export function PaymentModal({ isOpen, onClose, booking, onSuccess }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [processing, setProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  if (!isOpen || !booking) return null;

  const handlePayment = async () => {
    setProcessing(true);

    if (paymentMethod === 'card') {
      // Stripe Integration
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('http://localhost:3002/api/payments/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bookingId: booking.id,
            amount: booking.totalPrice,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Success animation
          setTimeout(() => {
            onSuccess();
            onClose();
            setProcessing(false);
          }, 2000);
        } else {
          alert('❌ هەڵە: ' + (data.error || 'تکایە دووبارە هەوڵبدەرەوە'));
          setProcessing(false);
        }
      } catch (error) {
        console.error('Payment error:', error);
        alert('❌ کێشەیەک ڕوویدا');
        setProcessing(false);
      }
    } else {
      // Cash payment
      setTimeout(() => {
        onSuccess();
        onClose();
        setProcessing(false);
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-blue-900 via-teal-900 to-cyan-900 w-full max-w-md rounded-3xl shadow-2xl border border-white/20">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">پارەدان</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-red-500/20 hover:bg-red-500/40 rounded-xl flex items-center justify-center text-white text-xl transition-all duration-300"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Booking Info */}
          <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
            <h3 className="text-lg font-bold text-white mb-2">{booking.serviceTitle}</h3>
            <div className="flex justify-between items-center">
              <span className="text-white/70">کۆی گشتی:</span>
              <span className="text-3xl font-bold text-teal-400">{booking.totalPrice.toLocaleString()} IQD</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <label className="block text-white font-bold mb-3">شێوازی پارەدان</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  paymentMethod === 'card'
                    ? 'bg-teal-500/20 border-teal-400'
                    : 'bg-white/5 border-white/20 hover:border-white/40'
                }`}
              >
                <div className="text-3xl mb-2">💳</div>
                <div className="text-white font-bold text-sm">کارتی بانکی</div>
              </button>
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  paymentMethod === 'cash'
                    ? 'bg-teal-500/20 border-teal-400'
                    : 'bg-white/5 border-white/20 hover:border-white/40'
                }`}
              >
                <div className="text-3xl mb-2">💵</div>
                <div className="text-white font-bold text-sm">پارەی کاش</div>
              </button>
            </div>
          </div>

          {/* Card Details (if card selected) */}
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-bold mb-2">ژمارەی کارت</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                  maxLength={19}
                  className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-bold mb-2">ناوی خاوەنی کارت</label>
                <input
                  type="text"
                  placeholder="SAFA MOHAMMED"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white text-sm font-bold mb-2">بەسەرچوون</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    maxLength={5}
                    className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-bold mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    maxLength={3}
                    className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-teal-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Escrow Notice */}
          <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4">
            <p className="text-white text-sm flex items-start gap-2">
              <span className="text-xl">🔒</span>
              <span>
                پارەکەت پارێزراوە و تەنها لە کاتی تەواوبوونی کارەکە دەگوازرێتەوە بۆ پیشەساز
              </span>
            </p>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={processing || (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv))}
            className="w-full px-6 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {processing ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                لە بەردەوامدایە...
              </span>
            ) : (
              <span>
                {paymentMethod === 'card' ? 'پارەدان ئێستا' : 'پشتڕاستکردنەوە'} 💳
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
