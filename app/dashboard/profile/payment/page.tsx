'use client';

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface PaymentCard {
  id: string;
  type: 'visa' | 'mastercard' | 'discovery';
  lastFour: string;
  expiryDate: string;
  isExpired?: boolean;
  isSuspended?: boolean;
}

interface DigitalWallet {
  id: string;
  name: string;
  provider: 'zaincash' | 'fib';
  phoneNumber?: string;
  isDefault?: boolean;
}

export default function PaymentMethodsPage() {
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [cards, setCards] = useState<PaymentCard[]>([
    { id: '1', type: 'visa', lastFour: '4242', expiryDate: '12/25' },
    { id: '2', type: 'mastercard', lastFour: '8899', expiryDate: '09/23', isExpired: true },
    { id: '3', type: 'discovery', lastFour: '1029', expiryDate: '06/24', isSuspended: true },
  ]);

  const [wallets, setWallets] = useState<DigitalWallet[]>([
    { id: '1', name: 'ZainCash', provider: 'zaincash', phoneNumber: '078 •••• 921', isDefault: true },
    { id: '2', name: 'FIB Wallet', provider: 'fib', phoneNumber: 'بەستراوە بە ژمارەی مۆبایل' },
  ]);

  const handleDeleteCard = (id: string) => {
    if (confirm('دڵنیای لە سڕینەوەی ئەم کارتە؟')) {
      setCards(cards.filter(card => card.id !== id));
    }
  };

  const handleDeleteWallet = (id: string) => {
    if (confirm('دڵنیای لە سڕینەوەی ئەم جزدانە؟')) {
      setWallets(wallets.filter(wallet => wallet.id !== id));
    }
  };

  const handleAddPaymentMethod = () => {
    alert('تایبەتمەندی زیادکردنی شێوازی پارەدان بەم زووانە زیاد دەکرێت');
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return 'logos:visa';
      case 'mastercard':
        return 'logos:mastercard';
      case 'discovery':
        return 'solar:card-outline';
      default:
        return 'solar:card-outline';
    }
  };

  const getCardName = (type: string) => {
    switch (type) {
      case 'visa':
        return 'Visa';
      case 'mastercard':
        return 'Mastercard';
      case 'discovery':
        return 'Discovery';
      default:
        return 'کارت';
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }

        .ios-shadow {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .ios-shadow-lg {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        @media (max-width: 430px) {
          .max-w-md {
            max-width: 100%;
          }
        }
      `}} />

      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3">
          <div className="flex items-center justify-between h-12">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Icon icon="solar:arrow-right-linear" className="w-6 h-6 text-blue-600" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">شێوازەکانی پارەدان</h1>
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className="px-3 h-10 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className={`text-base font-semibold ${isEditMode ? 'text-red-600' : 'text-blue-600'}`}>
                {isEditMode ? 'تەواو' : 'دەستکاریکردن'}
              </span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 pt-6 px-4 pb-32">
          {/* Credit & Debit Cards Section */}
          <section className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="px-2 pb-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                کارتی کرێدیت و دیبێت
              </h3>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden ios-shadow">
              {cards.filter(card => !card.isSuspended).map((card, index) => (
                <div
                  key={card.id}
                  className={`group flex items-center gap-4 px-4 py-3.5 active:bg-gray-50 transition-colors ${
                    index < cards.filter(c => !c.isSuspended).length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="relative flex items-center justify-center h-10 w-14 shrink-0 rounded-lg bg-gray-50 border border-gray-200 overflow-hidden">
                    <Icon icon={getCardIcon(card.type)} className="w-10 h-10" />
                  </div>
                  <div className="flex flex-col justify-center flex-1 min-w-0">
                    <p className="text-gray-900 text-base font-semibold leading-snug">
                      {getCardName(card.type)} <span className="text-gray-500 font-normal">•••• {card.lastFour}</span>
                    </p>
                    <p className={`text-sm leading-snug ${card.isExpired ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                      {card.isExpired ? 'بەسەرچووە ' : 'بەسەردەچێت '}{card.expiryDate}
                    </p>
                  </div>
                  {isEditMode && (
                    <button
                      onClick={() => handleDeleteCard(card.id)}
                      className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                      <Icon icon="solar:trash-bin-minimalistic-bold" className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Digital Wallets Section */}
          <section className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="px-2 pb-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                جزدانی ئەلیکترۆنی
              </h3>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden ios-shadow">
              {wallets.map((wallet, index) => (
                <div
                  key={wallet.id}
                  className={`group flex items-center gap-4 px-4 py-3.5 active:bg-gray-50 transition-colors ${
                    index < wallets.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className={`relative flex items-center justify-center h-10 w-10 shrink-0 rounded-full overflow-hidden ${
                    wallet.provider === 'zaincash' 
                      ? 'bg-gray-900' 
                      : 'bg-gradient-to-br from-blue-500 to-blue-700'
                  }`}>
                    {wallet.provider === 'zaincash' ? (
                      <span className="text-white font-bold text-xs tracking-tighter">ZC</span>
                    ) : (
                      <Icon icon="solar:wallet-bold" className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex flex-col justify-center flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900 text-base font-semibold leading-snug">
                        {wallet.name}
                      </p>
                      {wallet.isDefault && (
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider">
                          بنەڕەتی
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm leading-snug">{wallet.phoneNumber}</p>
                  </div>
                  {isEditMode && (
                    <button
                      onClick={() => handleDeleteWallet(wallet.id)}
                      className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                      <Icon icon="solar:trash-bin-minimalistic-bold" className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Suspended Cards Section */}
          {cards.some(card => card.isSuspended) && (
            <section className="mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="px-2 pb-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  کارتە ڕاگیراوەکان
                </h3>
              </div>
              <div className="bg-white rounded-2xl overflow-hidden ios-shadow opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                {cards.filter(card => card.isSuspended).map((card) => (
                  <div
                    key={card.id}
                    className="group flex items-center gap-4 px-4 py-3.5 cursor-pointer"
                  >
                    <div className="relative flex items-center justify-center h-10 w-14 shrink-0 rounded-lg bg-gray-50 border border-gray-200 overflow-hidden">
                      <Icon icon="solar:card-outline" className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <p className="text-gray-900 text-base font-semibold leading-snug">
                        {getCardName(card.type)} <span className="text-gray-500 font-normal">•••• {card.lastFour}</span>
                      </p>
                      <p className="text-gray-500 text-sm leading-snug">ڕاگیراوە</p>
                    </div>
                    <button className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-gray-400">
                      <Icon icon="solar:info-circle-bold" className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Fixed Bottom Action Area */}
        <div className="fixed bottom-0 right-0 max-w-md w-full p-4 bg-white/95 backdrop-blur-xl border-t border-gray-100 z-40">
          <button
            onClick={handleAddPaymentMethod}
            className="w-full relative group overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl ios-shadow-lg active:scale-[0.99] transition-all duration-200"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center justify-center gap-2">
              <Icon icon="solar:add-circle-bold" className="w-6 h-6" />
              <span>زیادکردنی شێوازی پارەدانی نوێ</span>
            </div>
          </button>
          <div className="flex items-center justify-center gap-1.5 mt-3 opacity-60">
            <Icon icon="solar:lock-password-bold" className="w-3.5 h-3.5 text-gray-500" />
            <p className="text-xs text-gray-500 font-medium text-center">
              پارەدانەکانت بە 256-bit کۆدکراون و سەلامەتن
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
