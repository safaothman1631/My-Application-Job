'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';

export function ResetPasswordScreen({ onBackToLogin, resetToken }: { 
  onBackToLogin: () => void;
  resetToken?: string;
}) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate password strength
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const labels = ['', 'لاواز', 'مامناوەند', 'بەهێز', 'زۆر بەهێز'];
    return { strength, label: labels[strength] };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert('وشەی نهێنیەکان یەکسان نین');
      return;
    }

    if (newPassword.length < 8) {
      alert('وشەی نهێنی دەبێت لانیکەم ٨ پیت بێت');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: resetToken,
          newPassword
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('وشەی نهێنی بە سەرکەوتوویی نوێکرایەوە!');
        onBackToLogin();
      } else {
        alert(data.error || 'هەڵەیەک ڕوویدا');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      alert('هەڵەیەک ڕوویدا');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-sans">
      {/* Mobile Frame Container */}
      <div className="max-w-md mx-auto w-full h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl relative overflow-hidden flex flex-col">
        {/* Animated Decorative Blobs */}
        <div className="absolute w-96 h-96 -top-32 -right-32 bg-gradient-to-br from-blue-400/30 to-blue-600/20 rounded-full blur-[50px] animate-pulse"></div>
        <div className="absolute w-80 h-80 -bottom-32 -left-32 bg-gradient-to-tr from-blue-600/20 to-purple-400/20 rounded-full blur-[50px] animate-pulse" style={{ animationDelay: '1s' }}></div>

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
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              <div className="relative w-24 h-24 rounded-[2rem] bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 shadow-2xl flex items-center justify-center border border-white/50 dark:border-slate-700/50 group-hover:scale-105 transition-transform duration-300">
                <Icon icon="solar:lock-password-unlocked-bold-duotone" className="text-5xl text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 font-[family-name:var(--font-lateef)]">
              ڕێکخستنەوەی وشەی نهێنی
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base font-[family-name:var(--font-lateef)]">
              وشەی نهێنیێکی بەهێزی نوێ دروست بکە
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 mr-1 font-[family-name:var(--font-lateef)]">
                وشەی نهێنی نوێ
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pr-4 pl-12 py-4 bg-white/70 dark:bg-slate-800/70 border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all outline-none font-[family-name:var(--font-lateef)] text-right"
                  placeholder="لانیکەم ٨ پیت"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors p-1 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg"
                >
                  <Icon icon={showNewPassword ? "solar:eye-bold" : "solar:eye-closed-bold"} className="text-xl" />
                </button>
              </div>

              {/* Password Strength Indicator */}
              {newPassword && (
                <div className="mt-3 flex items-center gap-2 px-1">
                  <div className={`h-1.5 flex-1 rounded-full transition-all ${passwordStrength.strength >= 1 ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-600'}`}></div>
                  <div className={`h-1.5 flex-1 rounded-full transition-all ${passwordStrength.strength >= 2 ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-600'}`}></div>
                  <div className={`h-1.5 flex-1 rounded-full transition-all ${passwordStrength.strength >= 3 ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-600'}`}></div>
                  <div className={`h-1.5 flex-1 rounded-full transition-all ${passwordStrength.strength >= 4 ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-600'}`}></div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-2 font-[family-name:var(--font-lateef)]">
                    {passwordStrength.label}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="group">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 mr-1 font-[family-name:var(--font-lateef)]">
                دووبارەکردنەوەی وشەی نهێنی
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pr-4 pl-12 py-4 bg-white/70 dark:bg-slate-800/70 border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 transition-all outline-none font-[family-name:var(--font-lateef)] text-right"
                  placeholder="دووبارە بینووسەوە"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors p-1 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg"
                >
                  <Icon icon={showConfirmPassword ? "solar:eye-bold" : "solar:eye-closed-bold"} className="text-xl" />
                </button>
              </div>
            </div>

            {/* Submit Button */}
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
                  <span className="text-lg">نوێکردنەوەی وشەی نهێنی</span>
                  <Icon icon="solar:arrow-left-bold" className="text-xl" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-400 dark:text-slate-500 font-[family-name:var(--font-lateef)]">
              کێشەت هەیە؟{' '}
              <a className="text-[#2563EB] hover:text-blue-700 font-semibold transition-colors" href="#">
                پەیوەندی بکە
              </a>
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
