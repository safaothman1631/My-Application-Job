'use client';

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    
    // Redirect to home/login page
    router.push('/');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }

        .animate-ping-slow {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .backdrop-blur-custom {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
      `}} />

      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-custom transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-[340px] transform overflow-hidden rounded-[32px] bg-white shadow-2xl transition-all animate-fade-in-up">
        <div className="flex flex-col items-center p-8 pt-10">
          {/* Icon with ripple effect */}
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-red-100 opacity-75 animate-ping-slow"></div>
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500 border border-red-100">
              <Icon icon="solar:logout-2-bold" className="w-8 h-8" />
            </div>
          </div>

          {/* Text Content */}
          <h3 className="mb-2 text-center text-[22px] font-bold tracking-tight text-gray-900">
            چوونەدەرەوە
          </h3>
          <p className="mb-8 text-center text-[15px] leading-relaxed text-gray-500">
            دڵنیای لە چوونەدەرەوە؟ پێویستە دووبارە بچیتە ژوورەوە بۆ دەستگەیشتن بە داتاکانت.
          </p>

          {/* Actions */}
          <div className="flex w-full flex-col gap-3">
            {/* Primary Destructive Action */}
            <button
              onClick={handleLogout}
              className="group relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-red-500 px-6 py-4 text-[17px] font-bold text-white shadow-lg shadow-red-500/30 transition-all hover:bg-red-600 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              type="button"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              <span>چوونەدەرەوە</span>
            </button>

            {/* Secondary Cancel Action */}
            <button
              onClick={onClose}
              className="mt-1 flex w-full items-center justify-center rounded-2xl bg-transparent px-6 py-3.5 text-[17px] font-semibold text-gray-500 transition-colors hover:text-gray-800 hover:bg-gray-100 active:scale-[0.98]"
              type="button"
            >
              هەڵوەشاندنەوە
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
