'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import LogoutModal from './LogoutModal';

interface User {
  id: string;
  email: string;
  fullName: string;
  profileImage?: string;
  phone?: string;
}

interface UserStats {
  totalBookings: number;
  totalSpent: number;
  averageRating: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [stats, setStats] = useState<UserStats>({
    totalBookings: 0,
    totalSpent: 0,
    averageRating: 0
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      loadUserStats(parsedUser.id);
    }
  }, []);

  const loadUserStats = async (userId: string) => {
    setIsLoadingStats(true);
    try {
      const response = await fetch(`/api/users/${userId}/stats`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  return (
    <div className="relative w-full max-w-[430px] mx-auto min-h-screen bg-[#F9FAFB] shadow-2xl overflow-hidden flex flex-col font-[family-name:var(--font-lateef)]">


      {/* Profile Header */}
      <div className="px-6 pt-2 pb-6 flex flex-col items-center border-b border-slate-100 bg-white animate-fadeInScale">
        <h1 className="text-lg font-bold text-slate-900 mb-6">پرۆفایلی من</h1>
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full p-1 border-2 border-[#2563EB]/20">
            <img
              alt={user?.fullName || 'بەکارهێنەر'}
              className="w-full h-full rounded-full object-cover"
              src={user?.profileImage || '/login-avatar.jpeg'}
            />
          </div>
          <button className="absolute bottom-1 left-1 bg-[#2563EB] text-white p-1.5 rounded-full border-2 border-white active:scale-95 transition-transform">
            <Icon icon="solar:pen-bold" className="text-[16px]" />
          </button>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">{user?.fullName || 'بەکارهێنەر'}</h2>
        <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1 rounded-full border border-blue-100">
          <Icon icon="solar:star-shine-bold" className="text-[#2563EB] text-[18px]" />
          <span className="text-xs font-semibold text-[#2563EB]">ئەندامی تایبەت</span>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 py-6 bg-white animate-slideUp">
        <div className="flex gap-3 justify-between">
          <div className="flex-1 bg-slate-50 p-3 rounded-2xl flex flex-col items-center text-center border border-slate-100">
            {!isMounted || isLoadingStats ? (
              <div className="h-8 flex items-center justify-center mb-1">
                <Icon icon="svg-spinners:ring-resize" className="text-xl text-blue-600" />
              </div>
            ) : (
              <span className="text-2xl font-bold text-slate-900 mb-1">{stats.totalBookings}</span>
            )}
            <span className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">بووکینگ</span>
          </div>
          <div className="flex-1 bg-slate-50 p-3 rounded-2xl flex flex-col items-center text-center border border-slate-100">
            {!isMounted || isLoadingStats ? (
              <div className="h-8 flex items-center justify-center mb-1">
                <Icon icon="svg-spinners:ring-resize" className="text-xl text-blue-600" />
              </div>
            ) : (
              <span className="text-2xl font-bold text-slate-900 mb-1">
                {stats.totalSpent >= 1000 ? `${(stats.totalSpent / 1000).toFixed(0)}k` : stats.totalSpent}
              </span>
            )}
            <span className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">IQD</span>
          </div>
          <div className="flex-1 bg-slate-50 p-3 rounded-2xl flex flex-col items-center text-center border border-slate-100">
            <div className="flex items-center gap-0.5 mb-1">
              {!isMounted || isLoadingStats ? (
                <div className="h-8 flex items-center justify-center">
                  <Icon icon="svg-spinners:ring-resize" className="text-xl text-blue-600" />
                </div>
              ) : (
                <>
                  <span className="text-2xl font-bold text-slate-900">{stats.averageRating.toFixed(1)}</span>
                  <Icon icon="solar:star-bold" className="text-amber-400 text-sm" />
                </>
              )}
            </div>
            <span className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">هەڵسەنگاندن</span>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto px-6 hide-scrollbar animate-fadeInScale">
        <div className="space-y-1">
          <button onClick={() => router.push('/dashboard/profile/edit')} className="w-full flex items-center gap-4 py-4 border-b border-slate-50 group active:bg-slate-50 rounded-xl transition-all px-2">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#2563EB] group-hover:scale-105 transition-transform">
              <Icon icon="solar:user-bold" className="text-xl" />
            </div>
            <div className="flex-1 text-right">
              <h3 className="font-semibold text-slate-900">دەستکاری پرۆفایل</h3>
            </div>
            <Icon icon="solar:alt-arrow-left-bold" className="text-slate-400 text-xl" />
          </button>

          <button onClick={() => router.push('/dashboard/profile/payment')} className="w-full flex items-center gap-4 py-4 border-b border-slate-50 group active:bg-slate-50 rounded-xl transition-all px-2">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#2563EB] group-hover:scale-105 transition-transform">
              <Icon icon="solar:card-bold" className="text-xl" />
            </div>
            <div className="flex-1 text-right">
              <h3 className="font-semibold text-slate-900">شێوازی پارەدان</h3>
            </div>
            <Icon icon="solar:alt-arrow-left-bold" className="text-slate-400 text-xl" />
          </button>

          <button onClick={() => router.push('/dashboard/profile/address')} className="w-full flex items-center gap-4 py-4 border-b border-slate-50 group active:bg-slate-50 rounded-xl transition-all px-2">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#2563EB] group-hover:scale-105 transition-transform">
              <Icon icon="solar:map-point-bold" className="text-xl" />
            </div>
            <div className="flex-1 text-right">
              <h3 className="font-semibold text-slate-900">ناونیشانەکان</h3>
            </div>
            <Icon icon="solar:alt-arrow-left-bold" className="text-slate-400 text-xl" />
          </button>

          <button onClick={() => router.push('/dashboard/profile/notifications')} className="w-full flex items-center gap-4 py-4 border-b border-slate-50 group active:bg-slate-50 rounded-xl transition-all px-2">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#2563EB] group-hover:scale-105 transition-transform">
              <Icon icon="solar:bell-bold" className="text-xl" />
            </div>
            <div className="flex-1 text-right">
              <h3 className="font-semibold text-slate-900">ڕێکخستنی ئاگادارکردنەوە</h3>
            </div>
            <Icon icon="solar:alt-arrow-left-bold" className="text-slate-400 text-xl" />
          </button>

          <button onClick={() => router.push('/dashboard/profile/language')} className="w-full flex items-center gap-4 py-4 border-b border-slate-50 group active:bg-slate-50 rounded-xl transition-all px-2">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#2563EB] group-hover:scale-105 transition-transform">
              <Icon icon="solar:global-bold" className="text-xl" />
            </div>
            <div className="flex-1 text-right flex items-center justify-between">
              <Icon icon="solar:alt-arrow-left-bold" className="text-slate-400 text-xl" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 font-medium">کوردی</span>
                <h3 className="font-semibold text-slate-900">زمان</h3>
              </div>
            </div>
          </button>

          <button onClick={() => router.push('/dashboard/profile/help')} className="w-full flex items-center gap-4 py-4 group active:bg-slate-50 rounded-xl transition-all px-2">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#2563EB] group-hover:scale-105 transition-transform">
              <Icon icon="solar:help-bold" className="text-xl" />
            </div>
            <div className="flex-1 text-right">
              <h3 className="font-semibold text-slate-900">یارمەتی و پشتگیری</h3>
            </div>
            <Icon icon="solar:alt-arrow-left-bold" className="text-slate-400 text-xl" />
          </button>

          <button onClick={() => setShowLogoutModal(true)} className="w-full flex items-center gap-4 py-4 mt-4 group active:bg-red-50 rounded-xl transition-all px-2">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 group-hover:scale-105 transition-transform">
              <Icon icon="solar:logout-2-bold" className="text-xl" />
            </div>
            <div className="flex-1 text-right">
              <h3 className="font-semibold text-red-500">دەرچوون</h3>
            </div>
            <Icon icon="solar:alt-arrow-left-bold" className="text-red-400 text-xl" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white/90 backdrop-blur-lg border-t border-slate-100 px-8 py-4 flex justify-between items-center z-10 pb-8">
        <button onClick={() => router.push('/dashboard')} className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors active:scale-95">
          <Icon icon="solar:home-2-bold" className="text-2xl" />
          <span className="text-[10px] font-medium">سەرەکی</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors active:scale-95">
          <Icon icon="solar:calendar-mark-bold" className="text-2xl" />
          <span className="text-[10px] font-medium">بووکینگەکان</span>
        </button>
        <div className="relative -top-6">
          <button className="w-14 h-14 bg-[#2563EB] hover:bg-blue-600 rounded-2xl shadow-[0_8px_16px_rgba(37,99,235,0.3)] flex items-center justify-center transform active:scale-90 transition-all">
            <Icon icon="solar:add-circle-bold" className="text-3xl text-white" />
          </button>
        </div>
        <button onClick={() => router.push('/dashboard/messages')} className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors active:scale-95">
          <Icon icon="solar:chat-round-dots-bold" className="text-2xl" />
          <span className="text-[10px] font-medium">پەیامەکان</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#2563EB]">
          <Icon icon="solar:user-circle-bold" className="text-2xl" />
          <span className="text-[10px] font-bold">پرۆفایل</span>
        </button>
      </nav>

      {/* Home Indicator */}
      <div className="absolute bottom-1 w-full flex justify-center z-20 pointer-events-none">
        <div className="w-32 h-1 bg-slate-900/10 rounded-full"></div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInScale {
          animation: fadeInScale 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Logout Modal */}
      <LogoutModal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} />
    </div>
  );
}
