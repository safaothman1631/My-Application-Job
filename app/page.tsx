'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingScreen } from '@/components/OnboardingScreen';
import { LoginScreen } from '@/components/LoginScreen';
import { SignupScreen } from '@/components/SignupScreen';
import { ForgotPasswordScreen } from '@/components/ForgotPasswordScreen';
import { WelcomeBackLogin } from '@/components/screens/WelcomeBackLogin';
import { CustomerHomeScreen } from '@/components/screens/CustomerHomeScreen';
import { ProviderDashboard } from '@/components/ProviderDashboard';

export default function Home() {
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userStr = localStorage.getItem('currentUser');
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    
    if (token && userStr) {
      // User is logged in, redirect to dashboard
      router.push('/dashboard');
      return;
    } else if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    } else {
      // User has seen onboarding but not logged in - show login screen
      setShowLogin(true);
    }
    setIsLoading(false);
  }, [router]);

  const handleGetStarted = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShowOnboarding(false);
    setShowLogin(true);
  };

  const handleLoginSubmit = async (email: string, password: string) => {
    // Login is handled in LoginScreen component via API
    // After successful login, redirect to dashboard
    router.push('/dashboard');
  };

  const handleSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const handleSignupSubmit = async (name: string, email: string, phone: string, password: string) => {
    // Signup is now handled in SignupScreen component via API
    // After successful signup, show login screen
    setShowSignup(false);
    setShowLogin(true);
  };

  const handleBackToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const handleForgotPassword = () => {
    setShowLogin(false);
    setShowForgotPassword(true);
  };

  const handleBackToLoginFromForgot = () => {
    setShowForgotPassword(false);
    setShowLogin(true);
  };

  const handleLogin = (userData: any) => {
    console.log('handleLogin called with userData:', userData);
    console.log('userData.role:', userData.role);
    setUser(userData);
    if (userData.role === 'admin') {
      setTimeout(() => {
        window.location.href = 'http://localhost:3001';
      }, 1000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-teal-900 to-cyan-900">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-4 border-cyan-300 border-t-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
        </div>
      </div>
    );
  }

  // Show onboarding for first-time users
  if (showOnboarding) {
    return <OnboardingScreen onGetStarted={handleGetStarted} />;
  }

  // Show signup screen
  if (showSignup) {
    return (
      <SignupScreen 
        onSignup={handleSignupSubmit}
        onBackToLogin={handleBackToLogin}
      />
    );
  }

  // Show forgot password screen
  if (showForgotPassword) {
    return (
      <ForgotPasswordScreen 
        onBackToLogin={handleBackToLoginFromForgot}
      />
    );
  }

  // Show new login screen after onboarding
  if (showLogin) {
    return (
      <LoginScreen 
        onLogin={handleLoginSubmit}
        onSignup={handleSignup}
        onForgotPassword={handleForgotPassword}
      />
    );
  }

  // Show appropriate dashboard based on user role
  if (user) {
    console.log('Rendering dashboard for user:', user);
    console.log('User role:', user.role);
    if (user.role === 'customer') {
      return <CustomerHomeScreen />;
    } else if (user.role === 'provider') {
      return <ProviderDashboard user={user} onLogout={handleLogout} />;
    }
  }

  // Default: Show login screen (shouldn't reach here due to logic above)
  return (
    <LoginScreen 
      onLogin={handleLoginSubmit}
      onSignup={handleSignup}
      onForgotPassword={handleForgotPassword}
    />
  );
}
