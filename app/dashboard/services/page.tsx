'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

interface Service {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export default function AllServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      
      if (data.success) {
        setServices(data.services);
      }
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleServiceClick = (serviceId: string) => {
    router.push(`/dashboard?service=${serviceId}`);
  };

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <h1 className="text-xl font-bold text-slate-800">هەموو خزمەتگوزارییەکان</h1>
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors active:scale-95"
          >
            <Icon icon="solar:arrow-right-linear" className="text-xl text-slate-700" />
          </button>
        </div>

        {/* Search */}
        <div className="relative group">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <Icon icon="solar:magnifer-bold" className="text-xl text-slate-400 group-focus-within:text-[#2563EB] transition-colors" />
          </div>
          <input
            className="w-full h-12 pr-12 pl-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-[#2563EB]/20 text-sm placeholder-slate-400 transition-all text-right"
            placeholder="گەڕان بۆ خزمەتگوزاری..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 py-6 pb-10">
        {filteredServices.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Icon icon="solar:box-minimalistic-bold-duotone" className="text-6xl text-slate-300" />
            <p className="text-slate-500 text-sm">هیچ خزمەتگوزارییەک نەدۆزرایەوە</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filteredServices.map((service) => (
              <button
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-3xl flex items-center justify-center mb-2 group-active:scale-95 transition-all shadow-lg hover:shadow-xl hover:scale-105`}>
                  <Icon icon={service.icon} className="text-4xl text-white drop-shadow-sm" />
                </div>
                <span className="text-xs font-semibold text-slate-700 text-center leading-tight">
                  {service.name}
                </span>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
