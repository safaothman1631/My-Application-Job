'use client';

import { useState } from 'react';

interface WelcomeBackLoginProps {
  onLogin?: (userData: any) => void;
}

export function WelcomeBackLogin({ onLogin }: WelcomeBackLoginProps = {}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('تکایە ئیمەیڵ و وشەی نهێنیت داخڵ بکە');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        
        // Call the parent's onLogin handler if provided
        if (onLogin) {
          onLogin(data.user);
        } else {
          // Fallback: reload the page to trigger auth check
          window.location.reload();
        }
      } else {
        const data = await res.json();
        setError(data.message || 'هەڵەیەک ڕوویدا، تکایە دووبارە هەوڵبدەوە');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('هەڵەیەک ڕوویدا لە پەیوەندیکردن بە سێرڤەر');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Welcome Back!
        </h1>

        {/* Illustration - Person with phone in circular green background */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-64 h-64">
            {/* Background circles */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-green-400 rounded-full"></div>
            
            {/* Plants/leaves */}
            <div className="absolute bottom-8 left-4 w-16 h-20 bg-green-500 rounded-full opacity-70"></div>
            <div className="absolute bottom-8 right-4 w-16 h-20 bg-green-500 rounded-full opacity-70"></div>
            
            {/* Person */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
              {/* Head */}
              <div className="w-16 h-16 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full mb-2">
                {/* Hair */}
                <div className="w-12 h-8 bg-gray-800 rounded-t-full mx-auto"></div>
                {/* Face */}
                <div className="w-2 h-2 bg-gray-800 rounded-full absolute top-10 left-6"></div>
                <div className="w-2 h-2 bg-gray-800 rounded-full absolute top-10 right-6"></div>
                <div className="w-4 h-1 bg-gray-700 rounded-full absolute top-12 left-1/2 -translate-x-1/2"></div>
              </div>
              
              {/* Body */}
              <div className="w-20 h-24 bg-blue-600 rounded-t-3xl relative">
                {/* Phone in hand */}
                <div className="absolute -right-4 top-4 w-8 h-12 bg-yellow-300 rounded-lg border-2 border-gray-800"></div>
              </div>
            </div>

            {/* City buildings in background */}
            <div className="absolute top-20 right-8 w-8 h-16 bg-blue-200/50 rounded-t-lg"></div>
            <div className="absolute top-16 right-16 w-6 h-20 bg-blue-300/50 rounded-t-lg"></div>
            <div className="absolute top-20 left-8 w-8 h-16 bg-blue-200/50 rounded-t-lg"></div>
          </div>
        </div>

        {/* Login Form */}
        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <input
              type="text"
              placeholder="Enter your email or phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3.5 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#2563EB] text-white font-semibold py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-all active:scale-98 shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>

          {/* Google Login */}
          <button className="w-full bg-white border-2 border-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl hover:bg-gray-50 transition-all active:scale-98 flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <button className="text-[#2563EB] text-sm font-medium hover:underline">
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
