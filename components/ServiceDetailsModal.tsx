'use client';

import { useState, useEffect } from 'react';

interface ServiceDetailsProps {
  serviceId: string;
  onClose: () => void;
  onBook: (serviceId: string) => void;
}

interface ServiceDetails {
  id: string;
  title: string;
  description: string;
  price: number;
  priceType: string;
  icon?: string;
  provider: {
    id: string;
    fullName: string;
    email: string;
    profileImage?: string;
    rating?: number;
    completedJobs?: number;
    responseTime?: string;
    verified?: boolean;
    badges?: string[];
  };
  reviews?: Array<{
    id: string;
    rating: number;
    comment: string;
    customerName: string;
    createdAt: string;
  }>;
}

export function ServiceDetailsModal({ serviceId, onClose, onBook }: ServiceDetailsProps) {
  const [service, setService] = useState<ServiceDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServiceDetails();
  }, [serviceId]);

  const fetchServiceDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/services/${serviceId}`);
      const data = await response.json();
      setService(data);
    } catch (error) {
      console.error('Error fetching service details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8">
          <div className="text-6xl mb-4 animate-bounce">⏳</div>
          <p className="text-white text-xl">چاوەڕێبە...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return null;
  }

  const { provider } = service;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="bg-gradient-to-br from-blue-900 via-teal-900 to-cyan-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">وردەکاری خزمەتگوزاری</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-red-500/20 hover:bg-red-500/40 rounded-xl flex items-center justify-center text-white text-xl transition-all duration-300"
            >
              ✕
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Service Info */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="text-6xl mb-4">{service.icon || '🛠️'}</div>
              <h3 className="text-3xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-white/70 mb-4">{service.description}</p>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-teal-400">{service.price.toLocaleString()} IQD</span>
                <span className="text-white/50 text-sm">{service.priceType}</span>
              </div>
            </div>

            {/* Provider Info */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h4 className="text-xl font-bold text-white mb-4">دەربارەی پیشەساز</h4>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-2xl text-white font-bold">
                  {provider.fullName?.charAt(0) || 'پ'}
                </div>
                <div>
                  <h5 className="text-lg font-bold text-white flex items-center gap-2">
                    {provider.fullName}
                    {provider.verified && (
                      <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">✓ پشتڕاست</span>
                    )}
                  </h5>
                  <p className="text-teal-200 text-sm">{provider.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {provider.rating && (
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-2xl mb-1">⭐</div>
                    <div className="text-lg font-bold text-white">{provider.rating.toFixed(1)}</div>
                    <div className="text-xs text-white/50">هەڵسەنگاندن</div>
                  </div>
                )}
                {provider.completedJobs && (
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-2xl mb-1">✅</div>
                    <div className="text-lg font-bold text-white">{provider.completedJobs}</div>
                    <div className="text-xs text-white/50">کاری تەواو</div>
                  </div>
                )}
                {provider.responseTime && (
                  <div className="bg-white/5 rounded-xl p-3 text-center">
                    <div className="text-2xl mb-1">⚡</div>
                    <div className="text-lg font-bold text-white">{provider.responseTime}</div>
                    <div className="text-xs text-white/50">وەڵام</div>
                  </div>
                )}
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <div className="text-2xl mb-1">🛡️</div>
                  <div className="text-xs font-bold text-teal-400">گارانتی</div>
                  <div className="text-xs text-white/50">کواڵێتی</div>
                </div>
              </div>

              {provider.badges && provider.badges.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {provider.badges.map((badge, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Reviews */}
            {service.reviews && service.reviews.length > 0 && (
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                  <span className="ml-2">⭐</span>
                  هەڵسەنگاندنەکان ({service.reviews.length})
                </h4>
                <div className="space-y-4">
                  {service.reviews.slice(0, 5).map((review) => (
                    <div key={review.id} className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-white">{review.customerName}</span>
                        <span className="text-teal-400">{'⭐'.repeat(review.rating)}</span>
                      </div>
                      <p className="text-white/70 text-sm">{review.comment}</p>
                      <p className="text-white/40 text-xs mt-2">
                        {new Date(review.createdAt).toLocaleDateString('ku')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Book Button */}
            <button
              onClick={() => onBook(serviceId)}
              className="w-full px-6 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              داواکردنی ئێستا 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
