'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { initializeGoogleAuth, GoogleAuthResponse } from '@/lib/google-auth';

export function LoginScreen({ onLogin, onSignup, onForgotPassword }: { 
  onLogin: (email: string, password: string) => void;
  onSignup: () => void;
  onForgotPassword: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store token and user data
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        
        // Call parent handler to trigger redirect
        onLogin(email, password);
      } else {
        alert(data.error || 'هەڵەیەک ڕوویدا');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('هەڵەیەک ڕوویدا لە چوونەژوورەوە');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initialize Google Auth
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    
    if (clientId) {
      initializeGoogleAuth({
        clientId,
        onSuccess: handleGoogleSuccess,
        onError: (error) => {
          console.error('Google auth error:', error);
          setIsGoogleLoading(false);
        },
      });
    }
  }, []);

  const handleGoogleSuccess = async (response: GoogleAuthResponse) => {
    setIsGoogleLoading(true);
    
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Store token and user data
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        
        // Call parent handler
        onLogin(data.user.email, '');
      } else {
        alert(data.error || 'هەڵەیەک ڕوویدا لە چوونەژوورەوە بە گووگڵ');
      }
    } catch (error) {
      console.error('Google login error:', error);
      alert('هەڵەیەک ڕوویدا لە چوونەژوورەوە بە گووگڵ');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    if (typeof window === 'undefined' || !window.google) {
      alert('گووگڵ هێشتا ئامادە نییە، تکایە چاوەڕێبە...');
      return;
    }

    setIsGoogleLoading(true);
    
    window.google.accounts.id.prompt((notification: any) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // If prompt not shown, try alternative method
        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'google-signin-button-temp';
        buttonContainer.style.position = 'fixed';
        buttonContainer.style.top = '-9999px';
        document.body.appendChild(buttonContainer);

        window.google.accounts.id.renderButton(buttonContainer, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
        });

        // Trigger click on hidden button
        setTimeout(() => {
          const button = buttonContainer.querySelector('div[role="button"]') as HTMLElement;
          button?.click();
          setTimeout(() => buttonContainer.remove(), 1000);
        }, 100);
      }
      setIsGoogleLoading(false);
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-sans">
      {/* Mobile Frame Container */}
      <div className="max-w-md mx-auto w-full h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl relative overflow-hidden flex flex-col">
        {/* Animated Decorative Blobs */}
        <div className="absolute w-96 h-96 -top-32 -right-32 bg-gradient-to-br from-blue-400/30 to-blue-600/20 rounded-full blur-[50px] animate-pulse"></div>
        <div className="absolute w-80 h-80 -bottom-32 -left-32 bg-gradient-to-tr from-blue-600/20 to-purple-400/20 rounded-full blur-[50px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-64 h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-[60px]"></div>

        {/* Main Content */}
        <div className="flex-grow flex flex-col px-8 pt-16 pb-6 overflow-y-auto relative z-10 animate-[fadeInScale_0.4s_ease-out]">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent mb-8 font-[family-name:var(--font-lateef)]">
              بەخێربێیتەوە!
            </h1>
            
            {/* Avatar/Illustration */}
            <div className="relative w-44 h-44 mx-auto mb-6 group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 flex items-center justify-center shadow-2xl overflow-hidden ring-4 ring-white/50 dark:ring-slate-800/50 group-hover:scale-105 transition-transform duration-300">
                <Image 
                  src="/login-avatar.jpeg"
                  alt="User Avatar" 
                  fill
                  className="object-contain scale-95"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5 mb-8">
            {/* Email/Phone Input */}
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 mr-1 font-[family-name:var(--font-lateef)]">
                ئیمەیڵ یان ژمارەی مۆبایل
              </label>
              <div className="relative">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2563EB] transition-colors">
                  <Icon icon="solar:letter-bold-duotone" className="text-xl" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-12 pl-4 py-4 bg-white/70 dark:bg-slate-800/70 border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-slate-900 dark:text-white placeholder:text-slate-400 transition-all outline-none font-[family-name:var(--font-lateef)] text-right hover:border-slate-300 dark:hover:border-slate-600"
                  placeholder="بۆ نموونە: hello@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 mr-1 font-[family-name:var(--font-lateef)]">
                وشەی نهێنی
              </label>
              <div className="relative">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2563EB] transition-colors">
                  <Icon icon="solar:lock-password-bold-duotone" className="text-xl" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-12 pl-12 py-4 bg-white/70 dark:bg-slate-800/70 border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-slate-900 dark:text-white placeholder:text-slate-400 transition-all outline-none font-[family-name:var(--font-lateef)] text-right hover:border-slate-300 dark:hover:border-slate-600"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#2563EB] transition-colors p-1 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg"
                >
                  <Icon icon={showPassword ? "solar:eye-bold" : "solar:eye-closed-bold"} className="text-xl" />
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.96)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              className="w-full bg-gradient-to-r from-[#2563EB] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-100 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-lateef)] mt-8 hover:scale-[1.02]"
              style={{ transition: 'transform 0.1s ease-out' }}
            >
              {isLoading ? (
                <>
                  <Icon icon="svg-spinners:ring-resize" className="text-2xl" />
                  <span className="text-lg">چاوەڕێبە...</span>
                </>
              ) : (
                <>
                  <span className="text-lg">چوونەژوورەوە</span>
                  <Icon icon="solar:arrow-left-bold" className="text-xl" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t-2 border-slate-200 dark:border-slate-800"></div>
            <span className="flex-shrink mx-4 text-slate-500 text-xs font-bold font-[family-name:var(--font-lateef)] bg-white/80 dark:bg-slate-800/80 px-3 py-1 rounded-full">
              یان بەردەوام بە لەگەڵ
            </span>
            <div className="flex-grow border-t-2 border-slate-200 dark:border-slate-800"></div>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            className="w-full flex items-center justify-center gap-3 py-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg transition-all duration-100 mb-6 group hover:scale-[1.02]"
            style={{ transition: 'transform 0.1s ease-out' }}
          >
            <Icon icon="flat-color-icons:google" className="text-2xl group-hover:scale-110 transition-transform" />
            <span className="font-bold text-slate-700 dark:text-slate-200 font-[family-name:var(--font-lateef)]">
              بەردەوام بە لەگەڵ گووگڵ
            </span>
          </button>

          {/* Forgot Password Link */}
          <div className="text-center mb-6">
            <button
              onClick={onForgotPassword}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.92)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              className="text-[#2563EB] font-bold text-sm hover:underline font-[family-name:var(--font-lateef)] hover:text-blue-700 inline-block cursor-pointer select-none"
              style={{ transition: 'transform 0.1s ease-out' }}
            >
              وشەی نهێنیت لەبیر چووە؟
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-auto text-center pt-4">
            <p className="text-slate-600 dark:text-slate-400 text-sm font-[family-name:var(--font-lateef)]">
              هەژمارت نییە؟{' '}
              <button
                onClick={onSignup}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.92)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                className="text-[#2563EB] font-bold hover:underline hover:text-blue-700 inline-block cursor-pointer select-none"
                style={{ transition: 'transform 0.1s ease-out' }}
              >
                تۆمارکردن
              </button>
            </p>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="flex justify-center pb-3">
          <div className="w-32 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
