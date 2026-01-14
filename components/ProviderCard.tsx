'use client';

interface ProviderCardProps {
  name: string;
  profession: string;
  rating: number;
  distance: string;
  price: number;
  verified: boolean;
  avatar?: string;
  reviewCount?: number;
  onClick?: () => void;
}

export function ProviderCard({
  name,
  profession,
  rating,
  distance,
  price,
  verified,
  reviewCount = 0,
  onClick,
}: ProviderCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all cursor-pointer mb-3 active:scale-98"
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="50" fill="url(#grad1)" />
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#60A5FA', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#3B82F6', stopOpacity: 1}} />
                </linearGradient>
              </defs>
              <circle cx="50" cy="35" r="15" fill="white" />
              <path d="M25 75 Q50 60 75 75 L75 100 L25 100 Z" fill="white" />
            </svg>
          </div>
          {verified && (
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-[#22C55E] rounded-full flex items-center justify-center border-2 border-white">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-base">{name}</h3>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm font-semibold text-gray-900 ml-1">{rating.toFixed(1)}</span>
                <span className="text-xs text-gray-500">| {distance} away</span>
              </div>
              <div className="mt-1.5">
                <span className="text-sm font-semibold text-green-600">
                  From ${price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RecommendedProviders() {
  const handleProviderClick = (name: string) => {
    console.log('Opening provider profile:', name);
    // Navigate to provider details page
  };

  const providers = [
    {
      name: 'Ahmed Kareem',
      profession: 'Electrician',
      rating: 4.8,
      distance: '1.2km',
      price: 15,
      verified: true,
      reviewCount: 0,
    },
    {
      name: 'Fatima Ali',
      profession: 'Cleaner',
      rating: 4.9,
      distance: '900 m',
      price: 10,
      verified: true,
      reviewCount: 0,
    },
  ];

  return (
    <div>
      {providers.map((provider, index) => (
        <ProviderCard 
          key={index} 
          {...provider} 
          onClick={() => handleProviderClick(provider.name)}
        />
      ))}
    </div>
  );
}
