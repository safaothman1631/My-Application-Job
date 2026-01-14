'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

interface ServiceProvider {
  id: string;
  name: string;
  profession: string;
  rating: number;
  reviews: number;
  distance: string;
  price: number;
  image: string;
  verified: boolean;
}

export default function AllProvidersPage() {
  const router = useRouter();
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'distance'>('rating');

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {
      const response = await fetch('/api/providers?limit=50');
      const data = await response.json();
      
      if (data.success) {
        setProviders(data.providers);
      }
    } catch (error) {
      console.error('Error loading providers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderClick = (providerId: string) => {
    const provider = providers.find(p => p.id === providerId);
    if (provider) {
      localStorage.setItem('selectedProvider', JSON.stringify(provider));
      router.push('/dashboard/provider');
    }
  };

  const filteredProviders = providers
    .filter(provider => 
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.profession.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return a.price - b.price;
      return parseFloat(a.distance) - parseFloat(b.distance);
    });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F9FAFB]">
        <Icon icon="svg-spinners:ring-resize" className="text-6xl text-blue-600" />
      </div>
    );
  }

  return (
    <div dir="rtl" className="relative w-full max-w-[430px] mx-auto min-h-screen bg-[#F9FAFB] shadow-2xl overflow-hidden flex flex-col font-[family-name:var(--font-lateef)]">
      {/* Header */}
      <header className="px-6 py-4 bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-slate-800">هەموو پیشەوەران</h1>
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors active:scale-95"
          >
            <Icon icon="solar:arrow-right-linear" className="text-xl text-slate-700" />
          </button>
        </div>

        {/* Search */}
        <div className="relative group mb-4">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <Icon icon="solar:magnifer-bold" className="text-xl text-slate-400 group-focus-within:text-[#2563EB] transition-colors" />
          </div>
          <input
            className="w-full h-12 pr-12 pl-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-[#2563EB]/20 text-sm placeholder-slate-400 transition-all text-right"
            placeholder="گەڕان بۆ پیشەوەر..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Sort Options */}
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('rating')}
            className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              sortBy === 'rating'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Icon icon="solar:star-bold" className="inline-block ml-1 mb-0.5" />
            هەڵسەنگاندن
          </button>
          <button
            onClick={() => setSortBy('price')}
            className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              sortBy === 'price'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Icon icon="solar:dollar-minimalistic-bold" className="inline-block ml-1 mb-0.5" />
            نرخ
          </button>
          <button
            onClick={() => setSortBy('distance')}
            className={`flex-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              sortBy === 'distance'
                ? 'bg-[#2563EB] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Icon icon="solar:map-point-bold" className="inline-block ml-1 mb-0.5" />
            دووری
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 py-6 pb-10">
        {filteredProviders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Icon icon="solar:user-bold-duotone" className="text-6xl text-slate-300" />
            <p className="text-slate-500 text-sm">هیچ پیشەوەرێک نەدۆزرایەوە</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredProviders.map((provider) => (
              <button
                key={provider.id}
                onClick={() => handleProviderClick(provider.id)}
                className="p-4 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/30 shadow-sm relative overflow-hidden group active:scale-95 transition-transform text-right"
              >
                <div className="absolute top-0 left-0 w-24 h-24 bg-[#2563EB]/5 rounded-full -ml-12 -mt-12"></div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-base">{provider.name}</h3>
                    <p className="text-xs text-[#2563EB] font-medium">{provider.profession}</p>
                    <div className="flex items-center justify-end mt-2 gap-1 bg-white/50 w-fit ml-auto px-2 py-0.5 rounded-lg border border-slate-100">
                      <span className="text-[10px] text-slate-400">({provider.reviews})</span>
                      <span className="text-xs font-bold text-slate-700">{provider.rating}</span>
                      <Icon icon="solar:star-bold" className="text-sm text-amber-500" />
                    </div>
                  </div>
                  <div className="relative">
                    <img alt={provider.name} className="w-16 h-16 rounded-2xl object-cover" src={provider.image} />
                    {provider.verified && (
                      <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-[#2563EB] rounded-full flex items-center justify-center ring-2 ring-white">
                        <Icon icon="solar:check-circle-bold" className="text-white text-xs" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs bg-gradient-to-r from-slate-50 to-transparent rounded-xl p-3 -mx-1">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Icon icon="solar:routing-2-bold" className="text-sm text-[#2563EB]" />
                    <span className="font-medium">{provider.distance} کم دوور</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-400">لە</span>
                    <span className="font-bold text-slate-800">{provider.price.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-500">IQD</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
