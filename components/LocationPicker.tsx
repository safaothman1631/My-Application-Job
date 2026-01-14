'use client';

import { useState, useEffect } from 'react';

interface LocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  defaultLocation?: { lat: number; lng: number };
}

export function LocationPicker({ onLocationSelect, defaultLocation }: LocationPickerProps) {
  const [location, setLocation] = useState(defaultLocation || { lat: 36.1911, lng: 44.0094 }); // Erbil coordinates
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = () => {
    setLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(newLocation);
          reverseGeocode(newLocation.lat, newLocation.lng);
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('❌ کێشە لە وەرگرتنی شوێن. تکایە لە Settingsـدا مۆڵەت بدە');
          setLoading(false);
        }
      );
    } else {
      alert('❌ وێبگەڕەکەت GPS پشتگیری ناکات');
      setLoading(false);
    }
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    // In production, use Google Maps Geocoding API or similar
    // For now, just show coordinates
    const addressText = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    setAddress(addressText);
    onLocationSelect({ lat, lng, address: addressText });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-white font-bold mb-2">شوێنی تۆ 📍</label>
        <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
          <div className="aspect-video bg-white/5 rounded-xl mb-4 flex items-center justify-center text-6xl">
            🗺️
          </div>
          
          <div className="space-y-3">
            <div className="text-white text-sm">
              <span className="text-white/50">Latitude:</span> {location.lat.toFixed(6)}
            </div>
            <div className="text-white text-sm">
              <span className="text-white/50">Longitude:</span> {location.lng.toFixed(6)}
            </div>
            {address && (
              <div className="text-white text-sm">
                <span className="text-white/50">ناونیشان:</span> {address}
              </div>
            )}
          </div>

          <button
            onClick={getCurrentLocation}
            disabled={loading}
            className="w-full mt-4 px-4 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-500 text-white rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                چاوەڕێبە...
              </>
            ) : (
              <>
                <span>📍</span>
                بەکارهێنانی شوێنی ئێستا
              </>
            )}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-white font-bold mb-2">یان ناونیشانەکە بنووسە</label>
        <input
          type="text"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            onLocationSelect({ ...location, address: e.target.value });
          }}
          placeholder="ناونیشانی تەواو..."
          className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20"
        />
      </div>
    </div>
  );
}

// Calculate distance between two coordinates (Haversine formula)
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 10) / 10; // Round to 1 decimal
}
