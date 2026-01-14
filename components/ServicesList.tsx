'use client';

import { useState, useEffect } from 'react';
import { ServiceCard } from './ServiceCard';

interface Service {
  id: string;
  title: string;
  description?: string;
  price: number;
  priceType: string;
  icon?: string;
  categoryId?: string;
  providerId?: string;
  provider?: any;
}

interface ServicesListProps {
  categoryId?: string;
  searchQuery?: string;
  onBookClick: (serviceId: string) => void;
  onDetailsClick: (serviceId: string) => void;
}

export function ServicesList({ categoryId, searchQuery, onBookClick, onDetailsClick }: ServicesListProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, [categoryId, searchQuery]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      let url = 'http://localhost:3002/api/services?limit=20';
      
      if (categoryId) {
        url += `&categoryId=${categoryId}`;
      }
      
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setServices(data.data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 animate-pulse">
            <div className="w-16 h-16 bg-white/20 rounded-xl mb-4"></div>
            <div className="h-6 bg-white/20 rounded mb-3"></div>
            <div className="h-4 bg-white/20 rounded mb-2"></div>
            <div className="h-4 bg-white/20 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-8xl mb-6">🔍</div>
        <p className="text-white/70 text-xl mb-2">هیچ خزمەتگوزاریەک نەدۆزرایەوە</p>
        <p className="text-white/50 text-sm">تکایە گەڕانەکەت بگۆڕە یان کاتێگۆری جیاواز هەڵبژێرە</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
        <span className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center ml-3 text-xl">🛠️</span>
        خزمەتگوزارییە دۆزراوەکان ({services.length})
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onBookClick={onBookClick}
            onDetailsClick={onDetailsClick}
          />
        ))}
      </div>
    </div>
  );
}
