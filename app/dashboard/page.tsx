'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  phone?: string;
  profileImage?: string;
  location?: string;
}

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

interface Service {
  id: string;
  name: string;
  icon: string;
  color: string;
}

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
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [notifications, setNotifications] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('currentUser');

    if (!token || !userData) {
      router.push('/');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      loadDashboardData(parsedUser.id);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Auto-rotate offers every 5 seconds
  useEffect(() => {
    if (offers.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentOfferIndex((prevIndex) => 
        prevIndex === offers.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [offers.length]);

  // Get user's current location
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            await reverseGeocode(latitude, longitude);
          },
          (error) => {
            console.error('Error getting location:', error);
            setCurrentLocation('بەغدا، عێراق');
            setIsLoadingLocation(false);
          }
        );
      } else {
        setCurrentLocation('بەغدا، عێراق');
        setIsLoadingLocation(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setCurrentLocation('بەغدا، عێراق');
      setIsLoadingLocation(false);
    }
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&language=ar`
      );
      const data = await response.json();
      
      if (data.results && data.results[0]) {
        const addressComponents = data.results[0].address_components;
        const city = addressComponents.find((comp: any) => 
          comp.types.includes('locality') || comp.types.includes('administrative_area_level_1')
        );
        const country = addressComponents.find((comp: any) => 
          comp.types.includes('country')
        );
        
        const locationString = `${city?.long_name || 'بەغدا'}، ${country?.long_name || 'عێراق'}`;
        setCurrentLocation(locationString);
      } else {
        setCurrentLocation('بەغدا، عێراق');
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
      setCurrentLocation('بەغدا، عێراق');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const loadDashboardData = async (userId: string) => {
    try {
      const servicesResponse = await fetch('/api/services');
      const servicesData = await servicesResponse.json();
      
      if (servicesData.success) {
        setServices(servicesData.services);
      }

      const providersResponse = await fetch('/api/providers?limit=5');
      const providersData = await providersResponse.json();
      
      if (providersData.success) {
        setProviders(providersData.providers);
      }

      const offersResponse = await fetch('/api/offers');
      const offersData = await offersResponse.json();
      
      if (offersData.success) {
        setOffers(offersData.offers);
      }

      const notificationsResponse = await fetch(`/api/notifications?userId=${userId}`);
      const notificationsData = await notificationsResponse.json();
      
      if (notificationsData.success) {
        setNotifications(notificationsData.unreadCount || 0);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    router.push('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleServiceClick = (serviceId: string, serviceName: string) => {
    loadProvidersByService(serviceId);
  };

  const loadProvidersByService = async (serviceId: string) => {
    try {
      const response = await fetch(`/api/providers?serviceId=${serviceId}&limit=10`);
      const data = await response.json();
      
      if (data.success) {
        setProviders(data.providers);
      }
    } catch (error) {
      console.error('Error loading providers:', error);
    }
  };

  const handleProviderClick = (providerId: string) => {
    const provider = providers.find(p => p.id === providerId);
    if (provider) {
      localStorage.setItem('selectedProvider', JSON.stringify(provider));
      router.push('/dashboard/provider');
    }
  };

  const handleBookNow = async () => {
    if (!user) return;

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          providerId: providers[0]?.id || 'sample',
          serviceId: services[0]?.id || 'sample',
          date: new Date().toISOString().split('T')[0],
          time: '10:00',
          address: user.location || 'بەغدا',
          notes: 'پاکێجی پارێزگاری ماڵەوە',
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('بووکینگەکە بەسەرکەوتوویی دروستکرا!');
        loadDashboardData(user.id);
      } else {
        alert(data.error || 'هەڵەیەک ڕوویدا');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('هەڵەیەک ڕوویدا');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
        <Icon icon="svg-spinners:ring-resize" className="text-6xl text-blue-600" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="relative w-full max-w-[430px] mx-auto min-h-screen bg-[#F9FAFB] shadow-2xl overflow-hidden flex flex-col font-[family-name:var(--font-lateef)]">
      {/* Header */}
      <header className="px-6 py-4 bg-[#F9FAFB]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-slate-200 overflow-hidden bg-white shadow-sm ring-2 ring-white">
              <img alt={user.fullName} className="w-full h-full object-cover" src={user.profileImage || '/login-avatar.jpeg'} />
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">شوێنی ئێستا</p>
              <div className="flex items-center gap-1 cursor-pointer" onClick={getCurrentLocation}>
                <Icon icon="solar:map-point-bold" className="text-base text-[#2563EB]" />
                {isLoadingLocation ? (
                  <div className="flex items-center gap-1">
                    <Icon icon="svg-spinners:ring-resize" className="text-sm text-blue-600" />
                    <span className="text-sm font-bold text-slate-400">بەدواداچوون...</span>
                  </div>
                ) : (
                  <>
                    <span className="text-sm font-bold text-slate-800">{currentLocation || 'بەغدا، عێراق'}</span>
                    <Icon icon="solar:refresh-bold" className="text-sm text-slate-400 hover:text-blue-600 transition-colors" />
                  </>
                )}
              </div>
            </div>
          </div>
          <button 
            onClick={() => router.push('/dashboard/notifications')}
            className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center relative shadow-sm hover:bg-slate-50 transition-colors active:scale-95"
          >
            <Icon icon="solar:bell-bold" className="text-xl text-slate-600" />
            {notifications > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
            )}
          </button>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <Icon icon="solar:magnifer-bold" className="text-xl text-slate-400 group-focus-within:text-[#2563EB] transition-colors" />
          </div>
          <input
            className="w-full h-12 pr-12 pl-4 bg-white rounded-2xl border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] focus:ring-1 focus:ring-[#2563EB]/20 text-sm placeholder-slate-400 transition-all text-right"
            placeholder="چی خزمەتێکت پێویستە؟"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 pb-24 hide-scrollbar">
        {/* Top Services */}
        <div className="mt-4 mb-8">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-base font-bold text-slate-800">خزمەتە سەرەکیەکان</h2>
            <button 
              onClick={() => router.push('/dashboard/services')}
              className="text-xs font-semibold text-[#2563EB] hover:text-blue-700 transition-colors"
            >
              هەمووی ببینە
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {services.slice(0, 6).map((service) => (
              <button key={service.id} onClick={() => handleServiceClick(service.id, service.name)} className="flex flex-col items-center group cursor-pointer">
                <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-3xl flex items-center justify-center mb-2 group-active:scale-95 transition-all shadow-lg hover:shadow-xl hover:scale-105`}>
                  <Icon icon={service.icon} className="text-4xl text-white drop-shadow-sm" />
                </div>
                <span className="text-xs font-semibold text-slate-700">{service.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Special Offers Slider */}
        {offers.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-bold text-slate-800">ئۆفەرە تایبەتەکان</h2>
              <button 
                onClick={() => router.push('/dashboard/offers')}
                className="text-xs font-semibold text-[#2563EB] hover:text-blue-700 transition-colors"
              >
                هەمووی ببینە
              </button>
            </div>
            
            <div className="relative">
              <div className="overflow-hidden rounded-3xl">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(${currentOfferIndex * 100}%)` }}
                >
                  {offers.map((offer, index) => (
                    <div 
                      key={offer.id}
                      className="min-w-full"
                    >
                      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${offer.gradient} shadow-2xl`}>
                        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                        <div className="relative p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-3">
                                <Icon icon="solar:star-shine-bold" className="text-yellow-300 text-sm" />
                                <span className="text-xs font-bold text-white">ئۆفەری تایبەت</span>
                              </div>
                              <h3 className="text-2xl font-black text-white mb-2 leading-tight">
                                {offer.discount} داشکاندن
                              </h3>
                              <p className="text-sm text-white/90 mb-4 leading-relaxed">
                                {offer.description}
                              </p>
                              <button 
                                onClick={() => router.push(`/dashboard/offers/${offer.id}`)}
                                className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl active:scale-95 transition-all"
                              >
                                وەرگرتنی ئۆفەر
                              </button>
                            </div>
                            <div className="relative">
                              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                <Icon icon={offer.icon} className="text-5xl text-white" />
                              </div>
                              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center animate-pulse">
                                <Icon icon="solar:fire-bold" className="text-lg text-orange-600" />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-white/80">
                            <Icon icon="solar:clock-circle-bold" className="text-sm" />
                            <span>تەنها {offer.daysLeft} ڕۆژی تر ماوە</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Dots Indicator */}
              {offers.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {offers.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentOfferIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentOfferIndex 
                          ? 'w-8 bg-blue-600' 
                          : 'w-2 bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recommended Pros */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">پێشنیارکراو</h2>
          <button 
            onClick={() => router.push('/dashboard/providers')}
            className="text-sm font-semibold text-[#2563EB] hover:text-blue-700 transition-colors"
          >
            هەمووی
          </button>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-6 hide-scrollbar -mx-2 px-2">
          {providers.map((provider) => (
            <button key={provider.id} onClick={() => handleProviderClick(provider.id)} className="min-w-[280px] p-4 rounded-3xl bg-white/70 backdrop-blur-xl border border-white/30 shadow-sm relative overflow-hidden group active:scale-95 transition-transform">
              <div className="absolute top-0 left-0 w-24 h-24 bg-[#2563EB]/5 rounded-full -ml-12 -mt-12"></div>
              <div className="flex items-start gap-4 mb-4 text-right">
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
                    <div className="absolute -bottom-1 -left-1 bg-[#2563EB] w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                      <Icon icon="solar:verified-check-bold" className="text-sm text-white" />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center border-t border-slate-100 pt-3">
                <div className="text-left">
                  <span className="text-xs text-slate-400 font-medium">دەستپێدەکات لە</span>
                  <span className="text-base font-bold text-[#2563EB] mr-1">{provider.price.toLocaleString()} IQD</span>
                </div>
                <div className="flex items-center text-[11px] text-slate-500 font-medium">
                  <span className="ml-1">{provider.distance} کم دوورە</span>
                  <Icon icon="solar:map-arrow-right-bold" className="text-base text-slate-400" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Promotional Banner */}
        <button onClick={handleBookNow} className="mt-4 p-5 bg-slate-900 rounded-[2rem] text-white flex items-center justify-between shadow-xl w-full active:scale-95 transition-transform">
          <div className="text-right">
            <h3 className="font-bold text-lg leading-tight">پاکێجی پارێزگاری<br />ماڵەوە</h3>
            <p className="text-slate-400 text-xs mt-1">دەستپێدەکات لە 49,000 IQD</p>
            <div className="mt-3 px-4 py-2 bg-[#2563EB] text-white rounded-xl text-xs font-bold inline-block">ئێستا بووک بکە</div>
          </div>
          <div className="w-24 h-24 bg-[#2563EB]/20 rounded-2xl flex items-center justify-center">
            <Icon icon="solar:shield-check-bold" className="text-4xl text-white opacity-80" />
          </div>
        </button>
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full bg-white/90 backdrop-blur-lg border-t border-slate-100 px-8 py-4 flex justify-between items-center z-10 pb-8">
        <button className="flex flex-col items-center gap-1 active:scale-95 transition-transform">
          <Icon icon="solar:home-2-bold" className="text-2xl text-[#2563EB]" />
          <span className="text-[10px] font-bold text-[#2563EB]">سەرەکی</span>
        </button>
        <button 
          onClick={() => router.push('/dashboard/bookings')}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors active:scale-95"
        >
          <Icon icon="solar:calendar-mark-bold" className="text-2xl" />
          <span className="text-[10px] font-medium">بووکینگەکان</span>
        </button>
        <div className="relative -top-6">
          <button className="w-14 h-14 bg-[#2563EB] hover:bg-blue-600 rounded-2xl shadow-[0_8px_16px_rgba(37,99,235,0.3)] flex items-center justify-center transform active:scale-90 transition-all">
            <Icon icon="solar:add-circle-bold" className="text-3xl text-white" />
          </button>
        </div>
        <button onClick={() => router.push('/dashboard/messages')} className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors active:scale-95">
          <Icon icon="solar:chat-round-dots-bold" className="text-2xl" />
          <span className="text-[10px] font-medium">پەیامەکان</span>
        </button>
        <button onClick={() => router.push('/dashboard/profile')} className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors active:scale-95">
          <Icon icon="solar:user-circle-bold" className="text-2xl" />
          <span className="text-[10px] font-medium">پرۆفایل</span>
        </button>
      </nav>

      {/* Home Indicator */}
      <div className="absolute bottom-1 w-full flex justify-center z-20 pointer-events-none">
        <div className="w-32 h-1 bg-slate-900/10 rounded-full"></div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
