'use client';

import { useState } from 'react';

const API_URL = 'http://localhost:3002/api';

export function Login({ onLogin }: { onLogin: (user: any) => void }) {
  const [email, setEmail] = useState('customer1@bazari.com');
  const [password, setPassword] = useState('123456');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      console.log('🔐 چوونەژوورەوە...', { email });
      
      const response = await fetch(`${API_URL}/auth/login-simple`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        console.log('✅ سەرکەوتوو بوو');
        onLogin(data.user);
      } else {
        setError(data.error || 'ئیمەیڵ یان وشەی نهێنی هەڵەیە');
      }
    } catch (err: any) {
      console.error('❌ هەڵە:', err);
      setError('هەڵەیەک ڕوویدا - تکایە دڵنیابەرەوە کە سێرڤەرەکە کاردەکات');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-lg animate-shake">
          <p className="text-red-800 text-sm font-semibold">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-white mb-2">
          ئیمەیڵ
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <span className="text-teal-500 text-xl">📧</span>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            required
            dir="ltr"
            className="w-full pl-4 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-200 text-left"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-white mb-2">
          وشەی نهێنی
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <span className="text-teal-500 text-xl">🔒</span>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="وشەی نهێنی"
            required
            className="w-full pl-4 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-200"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold py-4 rounded-xl hover:from-teal-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-teal-300 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            چاوەڕێبە...
          </span>
        ) : (
          'چوونەژوورەوە'
        )}
      </button>
    </form>
  );
}
