'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { ResetPasswordScreen } from './ResetPasswordScreen';

export function ForgotPasswordScreen({ onBackToLogin }: { 
  onBackToLogin: () => void;
}) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetToken, setResetToken] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSent(true);
        // For demo purposes, show reset screen after a delay
        // In production, user would click link in email
        setTimeout(() => {
          setResetToken(data.token || 'demo-token');
          setShowResetPassword(true);
        }, 2000);
      } else {
        alert(data.error || 'هەڵەیەک ڕوویدا');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      alert('هەڵەیەک ڕوویدا');
    } finally {
      setIsLoading(false);
    }
  };

  // Show Reset Password Screen
  if (showResetPassword) {
    return <ResetPasswordScreen onBackToLogin={onBackToLogin} resetToken={resetToken} />;
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-sans">
      {/* Mobile Frame Container */}
      <div className="max-w-md mx-auto w-full h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl relative overflow-hidden flex flex-col">
        {/* Animated Decorative Blobs */}
        <div className="absolute w-96 h-96 -top-32 -right-32 bg-gradient-to-br from-blue-400/30 to-blue-600/20 rounded-full blur-[50px] animate-pulse"></div>
        <div className="absolute w-80 h-80 -bottom-32 -left-32 bg-gradient-to-tr from-blue-600/20 to-purple-400/20 rounded-full blur-[50px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-64 h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-[60px]"></div>

        {/* Header with Back Button */}
        <div className="relative z-10 flex items-center justify-between px-6 pt-6 pb-4">
          <button
            onClick={onBackToLogin}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all text-slate-900 dark:text-white"
            style={{ transition: 'transform 0.1s ease-out' }}
          >
            <Icon icon="solar:arrow-right-bold" className="text-xl" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-grow flex flex-col px-8 pt-8 pb-6 overflow-y-auto relative z-10 animate-[fadeInScale_0.4s_ease-out]">
          {/* Icon Illustration */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              {/* Outer glow */}
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full scale-110 group-hover:scale-125 transition-transform duration-500"></div>
              {/* Icon container */}
              <div className="relative w-24 h-24 rounded-[2rem] bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 shadow-2xl flex items-center justify-center border border-white/50 dark:border-slate-700/50">
                <Icon icon="solar:lock-password-bold-duotone" className="text-5xl text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          {/* Header Text */}
          <div className="text-center mb-8 space-y-3">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight font-[family-name:var(--font-lateef)]">
              وشەی نهێنیت لەبیر چووە؟
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed px-2 font-[family-name:var(--font-lateef)]">
              نیگەران مەبە، ڕوودەدات. ئیمەیڵ یان ژمارەی مۆبایلت بنووسە بۆ ڕێکخستنەوەی وشەی نهێنی
            </p>
          </div>

          {!isSent ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
              {/* Email/Phone Input */}
              <div className="group">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 mr-1 font-[family-name:var(--font-lateef)]">
                  ئیمەیڵ یان ژمارەی مۆبایل
                </label>
                <div className="relative">
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Icon icon="solar:letter-bold-duotone" className="text-xl" />
                  </div>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pr-12 pl-4 py-4 bg-white/70 dark:bg-slate-800/70 border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all outline-none font-[family-name:var(--font-lateef)] text-right hover:border-slate-300 dark:hover:border-slate-600"
                    placeholder="بۆ نموونە: hello@example.com"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.96)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                className="w-full bg-gradient-to-r from-[#2563EB] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-100 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-lateef)] mt-4 hover:scale-[1.02]"
                style={{ transition: 'transform 0.1s ease-out' }}
              >
                {isLoading ? (
                  <>
                    <Icon icon="svg-spinners:ring-resize" className="text-2xl" />
                    <span className="text-lg">چاوەڕێبە...</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">ناردنی لینکی ڕێکخستنەوە</span>
                    <Icon icon="solar:letter-bold" className="text-xl" />
                  </>
                )}
              </button>

              {/* Footer Links */}
              <div className="mt-6 text-center space-y-4">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-[family-name:var(--font-lateef)]">
                  وشەی نهێنیت یادت هاتەوە؟{' '}
                  <button
                    onClick={onBackToLogin}
                    onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.92)'}
                    onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    className="text-[#2563EB] font-bold hover:underline inline-block cursor-pointer select-none"
                    style={{ transition: 'transform 0.1s ease-out' }}
                  >
                    چوونەژوورەوە
                  </button>
                </p>

                <div className="flex items-center justify-center gap-2">
                  <span className="h-px w-8 bg-slate-200 dark:bg-slate-700"></span>
                  <a className="text-xs text-slate-400 dark:text-slate-500 hover:text-blue-600 transition-colors font-[family-name:var(--font-lateef)]" href="#">
                    کێشەت هەیە؟ پەیوەندی بکە
                  </a>
                  <span className="h-px w-8 bg-slate-200 dark:bg-slate-700"></span>
                </div>
              </div>
            </form>
          ) : (
            /* Success Message */
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Icon icon="solar:check-circle-bold" className="text-5xl text-green-600 dark:text-green-400" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-[family-name:var(--font-lateef)]">
                  لینکەکە نێردرا!
                </h2>
                <p className="text-slate-500 dark:text-slate-400 font-[family-name:var(--font-lateef)]">
                  تکایە ئیمەیڵەکەت چێک بکە بۆ ڕێنماییەکانی ڕێکخستنەوەی وشەی نهێنی
                </p>
              </div>
              <button
                onClick={onBackToLogin}
                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.96)'}
                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                className="w-full bg-gradient-to-r from-[#2563EB] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-100 flex items-center justify-center gap-2 font-[family-name:var(--font-lateef)] mt-4 hover:scale-[1.02]"
                style={{ transition: 'transform 0.1s ease-out' }}
              >
                <span className="text-lg">گەڕانەوە بۆ چوونەژوورەوە</span>
                <Icon icon="solar:arrow-right-bold" className="text-xl" />
              </button>
            </div>
          )}
        </div>

        {/* Home Indicator */}
        <div className="flex justify-center pb-3">
          <div className="w-32 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
