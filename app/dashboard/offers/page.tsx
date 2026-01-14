'use client';

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  serviceType: string;
  daysLeft: number;
  gradient: string;
  icon: string;
  isActive: boolean;
  createdAt: string;
}

export default function OffersPage() {
  const router = useRouter();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'expired'>('active');

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/offers');
      const data = await response.json();
      
      if (data.success) {
        setOffers(data.offers);
      }
    } catch (error) {
      console.error('Error loading offers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOffers = offers.filter(offer => {
    if (filter === 'active') return offer.daysLeft > 0;
    if (filter === 'expired') return offer.daysLeft <= 0;
    return true;
  });

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
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
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
          <h1 className="text-xl font-bold text-gray-900">ئۆفەرە تایبەتەکان</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 bg-white rounded-2xl p-1 shadow-sm">
          <button
            onClick={() => setFilter('active')}
            className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              filter === 'active'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            چالاک ({offers.filter(o => o.daysLeft > 0).length})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              filter === 'all'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            هەموو ({offers.length})
          </button>
          <button
            onClick={() => setFilter('expired')}
            className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              filter === 'expired'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            بەسەرچوو ({offers.filter(o => o.daysLeft <= 0).length})
          </button>
        </div>

        {/* Offers Grid */}
        {filteredOffers.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 rounded-3xl bg-gray-100 flex items-center justify-center">
              <Icon icon="solar:tag-price-bold-duotone" className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">هیچ ئۆفەرێک نییە</h3>
            <p className="text-sm text-gray-500">
              لەم کاتەدا هیچ ئۆفەرێکی چالاک نییە
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOffers.map((offer, index) => (
              <div
                key={offer.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${offer.gradient} shadow-2xl ${offer.daysLeft <= 0 ? 'opacity-60' : ''}`}>
                  <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                  <div className="relative p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-3">
                          <Icon icon="solar:star-shine-bold" className="text-yellow-300 text-sm" />
                          <span className="text-xs font-bold text-white">
                            {offer.daysLeft > 0 ? 'ئۆفەری تایبەت' : 'بەسەرچووە'}
                          </span>
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2 leading-tight">
                          {offer.discount} داشکاندن
                        </h3>
                        <p className="text-sm text-white/90 mb-4 leading-relaxed">
                          {offer.description}
                        </p>
                        {offer.daysLeft > 0 && (
                          <button 
                            onClick={() => router.push(`/dashboard/offers/${offer.id}`)}
                            className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl active:scale-95 transition-all"
                          >
                            وەرگرتنی ئۆفەر
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                          <Icon icon={offer.icon} className="text-5xl text-white" />
                        </div>
                        {offer.daysLeft > 0 && (
                          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center animate-pulse">
                            <Icon icon="solar:fire-bold" className="text-lg text-orange-600" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/80">
                      <Icon icon="solar:clock-circle-bold" className="text-sm" />
                      <span>
                        {offer.daysLeft > 0 
                          ? `تەنها ${offer.daysLeft} ڕۆژی تر ماوە`
                          : 'بەسەرچووە'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
