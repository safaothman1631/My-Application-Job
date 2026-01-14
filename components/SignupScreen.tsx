'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';

export function SignupScreen({ onSignup, onBackToLogin }: { 
  onSignup: (name: string, email: string, phone: string, password: string) => void;
  onBackToLogin: () => void;
}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert('تکایە ڕێککەوتننامە قبوڵ بکە');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          fullName,
          phone,
          role: 'customer'
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('تۆمارکردن سەرکەوتوو بوو! تکایە بچۆ ژوورەوە');
        // Call parent handler
        onSignup(fullName, email, phone, password);
      } else {
        alert(data.error || 'هەڵەیەک ڕوویدا');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('هەڵەیەک ڕوویدا لە تۆمارکردن');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-sans">
      {/* Mobile Frame Container */}
      <div className="max-w-md mx-auto w-full h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl relative overflow-hidden flex flex-col">
        {/* Animated Decorative Blobs */}
        <div className="absolute w-96 h-96 -top-32 -right-32 bg-gradient-to-br from-blue-500/25 to-indigo-500/20 rounded-full blur-[50px] animate-pulse"></div>
        <div className="absolute w-80 h-80 -bottom-32 -left-32 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-[50px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-64 h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-[60px]"></div>

        {/* Main Content */}
        <div className="flex-grow flex flex-col px-8 pt-12 pb-6 overflow-y-auto relative z-10 animate-[fadeInScale_0.4s_ease-out]">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-3 font-[family-name:var(--font-lateef)]">
              دروستکردنی ئەکاونت
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-[family-name:var(--font-lateef)]">
              بەشداریی لە کۆمەڵگەی پیشەیی و کڕیارانمان بکە
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {/* Full Name Input */}
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 mr-1 font-[family-name:var(--font-lateef)]">
                ناوی تەواو
              </label>
              <div className="relative">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Icon icon="solar:user-bold-duotone" className="text-xl" />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pr-12 pl-4 py-4 bg-white/70 dark:bg-slate-800/70 border-2 border-indigo-100 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all outline-none font-[family-name:var(--font-lateef)] text-right hover:border-indigo-200 dark:hover:border-slate-600"
                  placeholder="ناوی تەواوت بنووسە"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 mr-1 font-[family-name:var(--font-lateef)]">
                ئیمەیڵ
              </label>
              <div className="relative">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Icon icon="solar:letter-bold-duotone" className="text-xl" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-12 pl-4 py-4 bg-white/70 dark:bg-slate-800/70 border-2 border-indigo-100 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all outline-none font-[family-name:var(--font-lateef)] text-right hover:border-indigo-200 dark:hover:border-slate-600"
                  placeholder="بۆ نموونە: hello@example.com"
                  required
                />
              </div>
            </div>

            {/* Phone Input */}
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 mr-1 font-[family-name:var(--font-lateef)]">
                ژمارەی مۆبایل
              </label>
              <div className="relative">
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Icon icon="solar:phone-bold-duotone" className="text-xl" />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pr-12 pl-4 py-4 bg-white/70 dark:bg-slate-800/70 border-2 border-indigo-100 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all outline-none font-[family-name:var(--font-lateef)] text-right hover:border-indigo-200 dark:hover:border-slate-600"
                  placeholder="+964 750 123 4567"
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
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Icon icon="solar:lock-password-bold-duotone" className="text-xl" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-12 pl-12 py-4 bg-white/70 dark:bg-slate-800/70 border-2 border-indigo-100 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all outline-none font-[family-name:var(--font-lateef)] text-right hover:border-indigo-200 dark:hover:border-slate-600"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors p-1 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-lg"
                >
                  <Icon icon={showPassword ? "solar:eye-bold" : "solar:eye-closed-bold"} className="text-xl" />
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 pt-2 mr-1">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded border-indigo-200 text-indigo-600 focus:ring-indigo-500/20 bg-white/70 dark:bg-slate-800/70 dark:border-slate-700 transition-all cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-slate-500 dark:text-slate-400 leading-tight font-[family-name:var(--font-lateef)] text-right cursor-pointer">
                ڕازیم بە{' '}
                <a className="text-indigo-600 font-semibold hover:underline transition-colors">مەرجەکان</a>
                {' '}و{' '}
                <a className="text-indigo-600 font-semibold hover:underline transition-colors">سیاسەتی تایبەتێتی</a>
              </label>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={isLoading}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.96)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-100 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-lateef)] mt-6 hover:scale-[1.02]"
              style={{ transition: 'transform 0.1s ease-out' }}
            >
              {isLoading ? (
                <>
                  <Icon icon="svg-spinners:ring-resize" className="text-2xl" />
                  <span className="text-lg">چاوەڕێبە...</span>
                </>
              ) : (
                <>
                  <span className="text-lg">دروستکردنی ئەکاونت</span>
                  <Icon icon="solar:user-plus-bold" className="text-xl" />
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

          {/* Google Signup Button */}
          <button
            onClick={handleGoogleSignup}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            className="w-full flex items-center justify-center gap-3 py-4 bg-white/80 dark:bg-slate-800/80 border-2 border-indigo-100 dark:border-slate-700 rounded-2xl hover:bg-white dark:hover:bg-slate-800 hover:border-indigo-200 dark:hover:border-slate-600 hover:shadow-lg transition-all duration-100 mb-6 group hover:scale-[1.02]"
            style={{ transition: 'transform 0.1s ease-out' }}
          >
            <Icon icon="flat-color-icons:google" className="text-2xl group-hover:scale-110 transition-transform" />
            <span className="font-bold text-slate-700 dark:text-slate-200 font-[family-name:var(--font-lateef)]">
              بەردەوام بە لەگەڵ گووگڵ
            </span>
          </button>

          {/* Login Link */}
          <div className="mt-auto text-center pt-4">
            <p className="text-slate-600 dark:text-slate-400 text-sm font-[family-name:var(--font-lateef)]">
              پێشتر هەژمارت هەیە؟{' '}
              <button
                onClick={onBackToLogin}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.92)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                className="text-indigo-600 font-bold hover:underline hover:text-indigo-700 inline-block cursor-pointer select-none"
                style={{ transition: 'transform 0.1s ease-out' }}
              >
                چوونەژوورەوە
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
