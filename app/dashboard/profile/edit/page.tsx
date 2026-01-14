'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  profileImage?: string;
  address?: string;
}

export default function EditProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFullName(parsedUser.fullName || '');
      setEmail(parsedUser.email || '');
      setPhone(parsedUser.phone || '');
      setAddress(parsedUser.address || '');
    }
  }, []);

  const handleSave = () => {
    if (user) {
      const updatedUser = {
        ...user,
        fullName,
        email,
        phone,
        address,
      };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      alert('زانیاریەکان بەسەرکەوتوویی نوێکرانەوە!');
      router.back();
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    <div className="relative w-full max-w-[430px] mx-auto min-h-screen bg-[#F9FAFB] shadow-2xl overflow-hidden flex flex-col font-[family-name:var(--font-lateef)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-colors duration-300">
        <div className="flex items-center justify-between px-4 py-3 w-full">
          <button onClick={() => router.back()} className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors group active:scale-95">
            <Icon icon="solar:arrow-right-bold" className="text-slate-900 group-hover:translate-x-0.5 transition-transform duration-200 text-2xl" />
          </button>
          <h1 className="text-lg font-bold tracking-tight">دەستکاری پرۆفایل</h1>
          <button onClick={() => router.back()} className="text-slate-500 font-semibold text-sm hover:text-slate-700 transition-colors">
            هەڵوەشاندنەوە
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full pb-8 overflow-y-auto no-scrollbar animate-fadeIn">
        {/* Profile Picture Section */}
        <div className="relative py-8 flex flex-col items-center">
          <div className="relative group cursor-pointer">
            <div className="size-32 rounded-full overflow-hidden border-4 border-white shadow-lg ring-1 ring-slate-100">
              <img
                alt={fullName || 'پرۆفایل'}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={user?.profileImage || '/login-avatar.jpeg'}
              />
            </div>
            {/* Edit Badge */}
            <div className="absolute bottom-1 left-1 bg-[#2563EB] text-white p-2.5 rounded-full border-4 border-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-active:scale-95">
              <Icon icon="solar:camera-bold" className="text-[18px]" />
            </div>
          </div>
          <p className="mt-4 text-[#2563EB] font-semibold text-sm cursor-pointer hover:underline">گۆڕینی وێنەی پرۆفایل</p>
        </div>

        {/* Form Fields */}
        <div className="px-5 space-y-6">
          {/* Full Name */}
          <div className="group">
            <label className="block text-sm font-semibold text-slate-700 mb-2 mr-1 text-right">ناوی تەواو</label>
            <div className="relative">
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Icon icon="solar:user-bold" className="text-xl" />
              </span>
              <input
                className="w-full h-14 bg-slate-100 border-none rounded-xl pr-12 pl-4 text-base font-medium text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#2563EB]/50 focus:bg-white transition-all duration-200 text-right"
                placeholder="ناوی تەواوت"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="group">
            <label className="block text-sm font-semibold text-slate-700 mb-2 mr-1 text-right">ئیمەیڵ</label>
            <div className="relative">
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Icon icon="solar:letter-bold" className="text-xl" />
              </span>
              <input
                className="w-full h-14 bg-slate-100 border-none rounded-xl pr-12 pl-4 text-base font-medium text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#2563EB]/50 focus:bg-white transition-all duration-200 text-right"
                placeholder="name@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="group">
            <label className="block text-sm font-semibold text-slate-700 mb-2 mr-1 text-right">ژمارەی مۆبایل</label>
            <div className="relative">
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Icon icon="solar:phone-bold" className="text-xl" />
              </span>
              <input
                className="w-full h-14 bg-slate-100 border-none rounded-xl pr-12 pl-4 text-base font-medium text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#2563EB]/50 focus:bg-white transition-all duration-200 text-right"
                placeholder="+964 (000) 000-0000"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Home Address */}
          <div className="group">
            <label className="block text-sm font-semibold text-slate-700 mb-2 mr-1 text-right">ناونیشانی ماڵەوە</label>
            <div className="relative">
              <span className="absolute right-4 top-4 text-slate-400 pointer-events-none">
                <Icon icon="solar:home-2-bold" className="text-xl" />
              </span>
              <textarea
                className="w-full min-h-[100px] bg-slate-100 border-none rounded-xl pr-12 pl-4 py-4 text-base font-medium text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#2563EB]/50 focus:bg-white resize-none transition-all duration-200 text-right"
                placeholder="شەقام، شار، کۆدی پۆستە"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="px-5 mt-10 mb-6">
          <button onClick={handleSave} className="w-full h-14 bg-[#2563EB] hover:bg-blue-600 active:scale-[0.98] transition-all duration-200 rounded-xl shadow-lg shadow-blue-500/30 text-white font-bold text-lg flex items-center justify-center gap-2 group">
            <span>پاشەکەوتکردن</span>
            <Icon icon="solar:check-circle-bold" className="text-xl opacity-70 group-hover:scale-110 transition-transform" />
          </button>
          <p className="text-center text-xs text-slate-400 mt-4">
            دوا نوێکردنەوە: ئێستا
          </p>
        </div>
      </main>

      {/* Home Indicator */}
      <div className="absolute bottom-1 w-full flex justify-center z-20 pointer-events-none pb-2">
        <div className="w-32 h-1 bg-slate-900/10 rounded-full"></div>
      </div>
    </div>
    </>
  );
}
