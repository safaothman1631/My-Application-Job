'use client';

import { useState } from 'react';
import { OnboardingScreen } from '@/components/OnboardingScreen';
import { WelcomeBackLogin } from '@/components/screens/WelcomeBackLogin';
import { CustomerHomeScreen } from '@/components/screens/CustomerHomeScreen';
import { BookServiceScreen, BookingDetailsScreen } from '@/components/screens/BookingFlow';
import { BookingSuccessScreen } from '@/components/BookingSuccessScreen';
import { ProviderDashboardHome } from '@/components/ProviderDashboardHome';
import { AdminPanelScreen } from '@/components/screens/AdminPanelScreen';
import { ProviderProfileScreen, PaywallProfileScreen } from '@/components/screens/ProfileRatingScreen';

type Screen = 'onboarding' | 'login' | 'customer-home' | 'book-service' | 'booking-details' | 'success' | 'provider-dashboard' | 'admin' | 'profile' | 'paywall';

export default function UIShowcase() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl font-bold text-gray-900 mb-4 text-center">
            🎨 Bazari UI Showcase
          </h1>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button onClick={() => setCurrentScreen('onboarding')} className={`px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${currentScreen === 'onboarding' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              Onboarding
            </button>
            <button onClick={() => setCurrentScreen('login')} className={`px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${currentScreen === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              Login
            </button>
            <button onClick={() => setCurrentScreen('customer-home')} className={`px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${currentScreen === 'customer-home' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              Customer Home
            </button>
            <button onClick={() => setCurrentScreen('book-service')} className={`px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${currentScreen === 'book-service' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              Book Service
            </button>
            <button onClick={() => setCurrentScreen('booking-details')} className={`px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${currentScreen === 'booking-details' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              Booking Details
            </button>
            <button onClick={() => setCurrentScreen('success')} className={`px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${currentScreen === 'success' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              Success
            </button>
            <button onClick={() => setCurrentScreen('provider-dashboard')} className={`px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${currentScreen === 'provider-dashboard' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              Provider
            </button>
            <button onClick={() => setCurrentScreen('admin')} className={`px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${currentScreen === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              Admin
            </button>
            <button onClick={() => setCurrentScreen('profile')} className={`px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${currentScreen === 'profile' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              Profile
            </button>
            <button onClick={() => setCurrentScreen('paywall')} className={`px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${currentScreen === 'paywall' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
              Paywall
            </button>
          </div>
        </div>
      </div>

      {/* Screen Content */}
      <div className="pt-32">
        {currentScreen === 'onboarding' && (
          <OnboardingScreen onGetStarted={() => setCurrentScreen('login')} />
        )}

        {currentScreen === 'login' && <WelcomeBackLogin />}

        {currentScreen === 'customer-home' && <CustomerHomeScreen />}

        {currentScreen === 'book-service' && <BookServiceScreen />}

        {currentScreen === 'booking-details' && <BookingDetailsScreen />}

        {currentScreen === 'success' && (
          <BookingSuccessScreen onGoHome={() => setCurrentScreen('customer-home')} />
        )}

        {currentScreen === 'provider-dashboard' && <ProviderDashboardHome />}

        {currentScreen === 'admin' && <AdminPanelScreen />}

        {currentScreen === 'profile' && <ProviderProfileScreen />}

        {currentScreen === 'paywall' && <PaywallProfileScreen />}
      </div>
    </div>
  );
}