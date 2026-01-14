'use client';

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description?: string;
    price: number;
    priceType: string;
    icon?: string;
    provider?: {
      id: string;
      fullName: string;
      rating?: number;
      completedJobs?: number;
      verified?: boolean;
      distance?: number;
    };
  };
  onBookClick: (serviceId: string) => void;
  onDetailsClick: (serviceId: string) => void;
}

export function ServiceCard({ service, onBookClick, onDetailsClick }: ServiceCardProps) {
  const { provider } = service;

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-500/30 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
      {/* Service Icon */}
      <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {service.icon || '🛠️'}
      </div>

      {/* Service Title */}
      <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>

      {/* Provider Info */}
      {provider && (
        <div className="mb-3 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-teal-200 text-sm">{provider.fullName}</span>
            {provider.verified && (
              <span className="text-xs bg-blue-500/80 text-white px-2 py-0.5 rounded-full">✓ پشتڕاست</span>
            )}
          </div>
          
          <div className="flex items-center gap-3 text-xs text-white/70">
            {provider.rating && (
              <span className="flex items-center gap-1">
                ⭐ {provider.rating.toFixed(1)}
              </span>
            )}
            {provider.completedJobs && (
              <span>{provider.completedJobs} کار</span>
            )}
            {provider.distance && (
              <span>📍 {provider.distance} کم</span>
            )}
          </div>
        </div>
      )}

      {/* Description */}
      {service.description && (
        <p className="text-white/60 text-sm mb-4 line-clamp-2">{service.description}</p>
      )}

      {/* Price & Actions */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
        <div>
          <span className="text-2xl font-bold text-teal-400">
            {service.price.toLocaleString()}
          </span>
          <span className="text-white/50 text-sm mr-1">IQD</span>
          <p className="text-white/40 text-xs mt-1">{service.priceType}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDetailsClick(service.id);
            }}
            className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all duration-300 text-sm"
          >
            وردەکاری
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookClick(service.id);
            }}
            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
          >
            داواکاری
          </button>
        </div>
      </div>
    </div>
  );
}
