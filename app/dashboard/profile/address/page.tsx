'use client';

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface Location {
  id: string;
  name: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  type: 'home' | 'work' | 'other';
  isPrimary?: boolean;
  icon: string;
  color: string;
  userId?: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '300px',
};

const defaultCenter = {
  lat: 35.5558,
  lng: 45.4375,
};

// Get API key from environment variable or use a placeholder
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE';

export default function SavedLocationsPage() {
  const router = useRouter();
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    type: 'other' as 'home' | 'work' | 'other',
    icon: 'solar:map-point-bold',
    color: 'blue',
  });

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      router.push('/');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    loadLocations(parsedUser.id);
    getCurrentLocation();
  }, [router]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(location);
          setSelectedPosition(location);
        },
        (error) => {
          console.error('Error getting location:', error);
          setCurrentLocation(defaultCenter);
          setSelectedPosition(defaultCenter);
        }
      );
    } else {
      setCurrentLocation(defaultCenter);
      setSelectedPosition(defaultCenter);
    }
  };

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const position = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
      setSelectedPosition(position);
      getAddressFromCoordinates(position);
    }
  }, []);

  const getAddressFromCoordinates = async (position: { lat: number; lng: number }) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=${GOOGLE_MAPS_API_KEY}&language=ar`
      );
      const data = await response.json();
      if (data.results && data.results[0]) {
        setFormData({ ...formData, address: data.results[0].formatted_address });
      }
    } catch (error) {
      console.error('Error getting address:', error);
    }
  };

  const loadLocations = async (userId: string) => {
    try {
      const response = await fetch(`/api/locations?userId=${userId}`);
      const data = await response.json();
      
      if (data.success) {
        setLocations(data.locations);
      }
    } catch (error) {
      console.error('Error loading locations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveLocation = async () => {
    if (!user || !formData.name || !formData.address) {
      alert('تکایە هەموو خانەکان پڕبکەرەوە');
      return;
    }

    try {
      const locationData = {
        ...formData,
        userId: user.id,
        coordinates: selectedPosition,
        isPrimary: locations.length === 0,
      };

      const response = await fetch('/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(locationData),
      });

      const data = await response.json();
      if (data.success) {
        await loadLocations(user.id);
        setShowAddModal(false);
        setFormData({
          name: '',
          address: '',
          type: 'other',
          icon: 'solar:map-point-bold',
          color: 'blue',
        });
        setSelectedPosition(currentLocation);
      }
    } catch (error) {
      console.error('Error saving location:', error);
      alert('هەڵەیەک ڕوویدا');
    }
  };

  const handleUpdateLocation = async () => {
    if (!editingLocation || !formData.name || !formData.address) {
      alert('تکایە هەموو خانەکان پڕبکەرەوە');
      return;
    }

    try {
      const response = await fetch(`/api/locations/${editingLocation.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        await loadLocations(user.id);
        setShowEditModal(false);
        setEditingLocation(null);
        setFormData({
          name: '',
          address: '',
          type: 'other',
          icon: 'solar:map-point-bold',
          color: 'blue',
        });
      }
    } catch (error) {
      console.error('Error updating location:', error);
      alert('هەڵەیەک ڕوویدا');
    }
  };

  const handleEditLocation = (id: string) => {
    const location = locations.find(loc => loc.id === id);
    if (location) {
      setEditingLocation(location);
      setFormData({
        name: location.name,
        address: location.address,
        type: location.type,
        icon: location.icon,
        color: location.color,
      });
      setSelectedPosition(location.coordinates || currentLocation);
      setShowEditModal(true);
    }
  };

  const handleDeleteLocation = async (id: string) => {
    if (!confirm('دڵنیای لە سڕینەوەی ئەم ناونیشانە؟')) return;

    try {
      const response = await fetch(`/api/locations/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        await loadLocations(user.id);
      }
    } catch (error) {
      console.error('Error deleting location:', error);
      alert('هەڵەیەک ڕوویدا');
    }
  };

  const handleAddLocation = () => {
    setFormData({
      name: '',
      address: '',
      type: 'other',
      icon: 'solar:map-point-bold',
      color: 'blue',
    });
    setSelectedPosition(currentLocation);
    setShowAddModal(true);
  };

  const handleUseCurrentLocation = () => {
    if (!currentLocation) {
      alert('شوێنی ئێستات دەستنەکەوت');
      return;
    }
    setSelectedPosition(currentLocation);
    getAddressFromCoordinates(currentLocation);
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; bgDark: string; textDark: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', bgDark: 'dark:bg-blue-500/20', textDark: 'dark:text-blue-300' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', bgDark: 'dark:bg-indigo-500/20', textDark: 'dark:text-indigo-300' },
      emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', bgDark: 'dark:bg-emerald-500/20', textDark: 'dark:text-emerald-300' },
      amber: { bg: 'bg-amber-100', text: 'text-amber-600', bgDark: 'dark:bg-amber-500/20', textDark: 'dark:text-amber-300' },
    };
    return colors[color] || colors.blue;
  };

  const primaryLocation = locations.find(loc => loc.isPrimary);
  const otherLocations = locations.filter(loc => !loc.isPrimary);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Icon icon="svg-spinners:ring-resize" className="text-6xl text-blue-600" />
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
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

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .map-hover {
          transition: transform 0.7s ease;
        }

        .map-hover:hover {
          transform: scale(1.05);
        }

        @media (max-width: 430px) {
          .max-w-md {
            max-width: 100%;
          }
        }
      `}} />

      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3">
          <div className="flex items-center justify-between h-12">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Icon icon="solar:arrow-right-linear" className="w-6 h-6 text-gray-900" />
            </button>
            <h1 className="text-base font-bold tracking-tight text-gray-900">ناونیشانە پاشەکەوتکراوەکان</h1>
            <div className="w-10 h-10"></div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto hide-scrollbar pb-32">
          {locations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-6">
              <div className="w-32 h-32 bg-blue-50 rounded-3xl flex items-center justify-center mb-6">
                <Icon icon="solar:map-point-bold-duotone" className="w-16 h-16 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">هیچ ناونیشانێک نییە</h2>
              <p className="text-gray-500 text-center mb-8">
                دەستپێبکە بە زیادکردنی یەکەم ناونیشانت بۆ ئاسانکاری لە بووککردندا
              </p>
              <button
                onClick={handleAddLocation}
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all active:scale-95 flex items-center gap-2"
              >
                <Icon icon="solar:map-point-add-bold" className="w-6 h-6" />
                زیادکردنی یەکەم ناونیشان
              </button>
            </div>
          ) : (
            <>
              {/* Map Preview Section */}
              {primaryLocation && primaryLocation.coordinates && (
                <div className="px-4 pt-6 pb-2 animate-scale-in">
                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                    {/* Google Map */}
                    <GoogleMap
                      mapContainerStyle={{ width: '100%', height: '100%' }}
                      center={primaryLocation.coordinates}
                      zoom={15}
                      options={{
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                        zoomControl: true,
                        disableDefaultUI: false,
                      }}
                    >
                      <Marker 
                        position={primaryLocation.coordinates}
                        animation={1}
                      />
                    </GoogleMap>
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                    {/* Map Pin & Context */}
                    <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between text-white pointer-events-none">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg ring-2 ring-white/20">
                          <Icon icon="solar:map-point-bold" className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-white/80 uppercase tracking-wider">ناونیشانی سەرەکی</p>
                          <p className="text-sm font-bold leading-none">{primaryLocation.name}</p>
                        </div>
                      </div>
                      <Icon icon="solar:maximize-square-minimalistic-linear" className="w-5 h-5 text-white/80" />
                    </div>
                  </div>
                </div>
              )}
              {primaryLocation && !primaryLocation.coordinates && (
                <div className="px-4 pt-6 pb-2 animate-scale-in">
                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
                    {/* Map Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center map-hover"
                      style={{
                        backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDfG3XarpdaSSPcABkplIVBTJM12HjX5e6OqAtmUZ0N-reO-y9scRHSAtT8FEXAaCLjzi-qkbNliTFEJCQaxzeEA9CmxScnCLqZ9Me1bTTOX74tvuIgfvrPMbhWe2ZvH18NfbITySdxr8yzQlz5Ethl7ASYD5z_rqLYWiuVgroHuIV5pH4Tm6f6ZLpaDEvt3njTEZLQFjqyqX4sLTFQH7M4XHm9YZkzbbig98rSsSBIZezKXW_GuMPnj6i21PUFFZAhaU9lLsEOHqU8')"
                      }}
                    ></div>
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    {/* Map Pin & Context */}
                    <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg ring-2 ring-white/20">
                          <Icon icon="solar:map-point-bold" className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-white/80 uppercase tracking-wider">ناونیشانی سەرەکی</p>
                          <p className="text-sm font-bold leading-none">{primaryLocation.name}</p>
                        </div>
                      </div>
                      <Icon icon="solar:maximize-square-minimalistic-linear" className="w-5 h-5 text-white/80" />
                    </div>
                  </div>
                </div>
              )}

              {/* Primary Residence Section */}
              {primaryLocation && (
                <div className="mt-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <div className="px-6 pb-2 flex items-baseline justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">نیشتەجێبوونی سەرەکی</h3>
                  </div>
                  <div className="mx-4 overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
                    <div className="group relative flex items-center justify-between p-4 transition-colors hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center gap-4 overflow-hidden flex-1">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${getColorClasses(primaryLocation.color).bg} ${getColorClasses(primaryLocation.color).text}`}>
                          <Icon icon={primaryLocation.icon} className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col gap-0.5 overflow-hidden flex-1">
                          <p className="truncate text-base font-bold text-gray-900">{primaryLocation.name}</p>
                          <p className="truncate text-sm text-gray-500">{primaryLocation.address}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleEditLocation(primaryLocation.id)}
                        className="shrink-0 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-blue-600 transition-colors mr-2"
                      >
                        <Icon icon="solar:pen-bold" className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Locations Section */}
              {otherLocations.length > 0 && (
                <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <div className="px-6 pb-2 flex items-baseline justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">ناونیشانەکانی تر</h3>
                  </div>
                  <div className="mx-4 flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
                    {otherLocations.map((location, index) => (
                      <div
                        key={location.id}
                        className={`group relative flex items-center justify-between p-4 transition-colors hover:bg-gray-50 cursor-pointer ${
                          index < otherLocations.length - 1 ? 'border-b border-gray-100' : ''
                        }`}
                      >
                        <div className="flex items-center gap-4 overflow-hidden flex-1">
                          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${getColorClasses(location.color).bg} ${getColorClasses(location.color).text}`}>
                            <Icon icon={location.icon} className="w-6 h-6" />
                          </div>
                          <div className="flex flex-col gap-0.5 overflow-hidden flex-1">
                            <p className="truncate text-base font-bold text-gray-900">{location.name}</p>
                            <p className="truncate text-sm text-gray-500">{location.address}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleEditLocation(location.id)}
                          className="shrink-0 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-blue-600 transition-colors mr-2"
                        >
                          <Icon icon="solar:pen-bold" className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>

        {/* Fixed Bottom Action */}
        <div className="fixed bottom-0 right-0 max-w-md w-full z-40 bg-gradient-to-t from-gray-50 via-gray-50/95 to-transparent pt-8 pb-8 px-4">
          <button
            onClick={handleAddLocation}
            className="relative w-full overflow-hidden rounded-2xl bg-blue-600 py-4 text-white shadow-lg shadow-blue-600/30 transition-transform active:scale-[0.98] group"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
            <div className="flex items-center justify-center gap-2 font-bold text-lg">
              <Icon icon="solar:map-point-add-bold" className="w-6 h-6" />
              <span>زیادکردنی ناونیشانی نوێ</span>
            </div>
          </button>
        </div>

        {/* Add Location Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center">
            <div className="bg-white rounded-t-3xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-scale-in">
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-3xl z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">ناونیشانی نوێ</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <Icon icon="solar:close-circle-bold" className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Google Map */}
                <div className="rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg">
                  <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={selectedPosition || currentLocation || defaultCenter}
                      zoom={15}
                      onClick={onMapClick}
                      options={{
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                      }}
                    >
                      {selectedPosition && (
                        <Marker 
                          position={selectedPosition}
                          animation={2}
                        />
                      )}
                    </GoogleMap>
                    {/* My Location Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        getCurrentLocation();
                      }}
                      className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-110 border-2 border-gray-200 z-10"
                      title="شوێنی ئێستام"
                    >
                      <Icon icon="solar:location-bold" className="w-6 h-6 text-blue-600" />
                    </button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 flex items-start gap-2">
                  <Icon icon="solar:info-circle-bold" className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-700">
                    کلیک لەسەر نەخشە بکە بۆ دیاریکردنی شوێنی دڵخواز
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ناوی شوێن</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="نموونە: ماڵەوە، کارگە..."
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ناونیشان</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="ناونیشانی تەواو بنووسە..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right resize-none"
                  />
                  <button
                    onClick={handleUseCurrentLocation}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <Icon icon="solar:point-on-map-bold" className="w-4 h-4" />
                    بەکارهێنانی شوێنی ئێستا
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">جۆر</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setFormData({ ...formData, type: 'home', icon: 'solar:home-angle-bold', color: 'blue' })}
                      className={`py-3 px-4 rounded-2xl border-2 transition-all ${
                        formData.type === 'home'
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon icon="solar:home-angle-bold" className="w-6 h-6 mx-auto mb-1" />
                      <span className="text-xs font-semibold">ماڵەوە</span>
                    </button>
                    <button
                      onClick={() => setFormData({ ...formData, type: 'work', icon: 'solar:case-round-bold', color: 'indigo' })}
                      className={`py-3 px-4 rounded-2xl border-2 transition-all ${
                        formData.type === 'work'
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon icon="solar:case-round-bold" className="w-6 h-6 mx-auto mb-1" />
                      <span className="text-xs font-semibold">کارگە</span>
                    </button>
                    <button
                      onClick={() => setFormData({ ...formData, type: 'other', icon: 'solar:map-point-bold', color: 'emerald' })}
                      className={`py-3 px-4 rounded-2xl border-2 transition-all ${
                        formData.type === 'other'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon icon="solar:map-point-bold" className="w-6 h-6 mx-auto mb-1" />
                      <span className="text-xs font-semibold">تر</span>
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-semibold transition-colors"
                  >
                    پاشگەزبوونەوە
                  </button>
                  <button
                    onClick={handleSaveLocation}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-colors"
                  >
                    پاشەکەوتکردن
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Location Modal */}
        {showEditModal && editingLocation && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center">
            <div className="bg-white rounded-t-3xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-scale-in">
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-3xl z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">دەستکاریکردن</h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    <Icon icon="solar:close-circle-bold" className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {/* Google Map */}
                <div className="rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg relative">
                  <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={selectedPosition || currentLocation || defaultCenter}
                      zoom={15}
                      onClick={onMapClick}
                      options={{
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                      }}
                    >
                      {selectedPosition && (
                        <Marker 
                          position={selectedPosition}
                          animation={2}
                        />
                      )}
                    </GoogleMap>
                    {/* My Location Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        getCurrentLocation();
                      }}
                      className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-110 border-2 border-gray-200 z-10"
                      title="شوێنی ئێستام"
                    >
                      <Icon icon="solar:location-bold" className="w-6 h-6 text-blue-600" />
                    </button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 flex items-start gap-2">
                  <Icon icon="solar:info-circle-bold" className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-700">
                    کلیک لەسەر نەخشە بکە بۆ گۆڕینی شوێن
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ناوی شوێن</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ناونیشان</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => handleDeleteLocation(editingLocation.id)}
                    className="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl font-semibold transition-colors border border-red-200"
                  >
                    سڕینەوە
                  </button>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-semibold transition-colors"
                  >
                    پاشگەزبوونەوە
                  </button>
                  <button
                    onClick={handleUpdateLocation}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-colors"
                  >
                    نوێکردنەوە
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </LoadScript>
  );
}
