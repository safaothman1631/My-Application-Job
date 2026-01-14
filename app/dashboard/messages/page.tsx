'use client';

import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

export default function MessagesPage() {
  const router = useRouter();

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
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
        .animate-fadeInScale {
          animation: fadeInScale 0.3s ease-out;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    <div className="relative w-full max-w-[430px] mx-auto min-h-screen bg-[#F9FAFB] shadow-2xl overflow-hidden flex flex-col font-[family-name:var(--font-lateef)]">
      {/* Header */}
      <div className="px-6 pt-4 pb-2 animate-fadeInScale">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900">پەیامەکان</h1>
          <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors active:scale-95">
            <Icon icon="solar:pen-new-square-bold" className="text-xl text-slate-600" />
          </button>
        </div>

        {/* Search */}
        <div className="relative group">
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <Icon icon="solar:magnifer-bold" className="text-xl text-slate-400 group-focus-within:text-[#2563EB] transition-colors" />
          </div>
          <input
            className="w-full h-12 pr-12 pl-4 bg-white rounded-2xl border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] focus:ring-1 focus:ring-[#2563EB]/20 text-sm placeholder-slate-400 transition-all text-right outline-none"
            placeholder="گەڕان لە گفتوگۆکان..."
            type="text"
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto px-4 mt-4 space-y-1 animate-fadeInScale hide-scrollbar">
        {/* Active Message */}
        <button onClick={() => router.push('/dashboard/messages/chat')} className="w-full flex items-center gap-4 p-3 rounded-3xl hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition-all relative">
          <div className="relative">
            <img
              alt="ئەحمەد"
              className="w-14 h-14 rounded-full object-cover"
              src="/login-avatar.jpeg"
            />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0 text-right">
            <div className="flex justify-between items-start mb-0.5">
              <span className="text-xs font-semibold text-[#2563EB]">٢:٤٥ PM</span>
              <h3 className="font-bold text-slate-900 truncate">ئەحمەد - کارەبا</h3>
            </div>
            <div className="flex justify-between items-center">
              <div className="w-2.5 h-2.5 bg-[#2563EB] rounded-full shrink-0 mr-2"></div>
              <p className="text-sm font-semibold text-slate-900 truncate">کاتژمێر ٤ لەوێ دەبم بۆ چاککردنەوە...</p>
            </div>
          </div>
        </button>

        {/* Other Messages */}
        <button className="w-full flex items-center gap-4 p-3 rounded-3xl hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition-all">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              <Icon icon="solar:user-circle-bold" className="text-[#2563EB] text-3xl" />
            </div>
          </div>
          <div className="flex-1 min-w-0 text-right">
            <div className="flex justify-between items-start mb-0.5">
              <span className="text-xs text-slate-400">١١:٣٠ AM</span>
              <h3 className="font-semibold text-slate-900 truncate">سارا - مۆتەری ئاو</h3>
            </div>
            <p className="text-sm text-slate-500 truncate">سوپاس بۆ پارەدانە خێراکە!</p>
          </div>
        </button>

        <button className="w-full flex items-center gap-4 p-3 rounded-3xl hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition-all">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
              <Icon icon="solar:settings-bold" className="text-orange-600 text-3xl" />
            </div>
          </div>
          <div className="flex-1 min-w-0 text-right">
            <div className="flex justify-between items-start mb-0.5">
              <span className="text-xs text-slate-400">دوێنێ</span>
              <h3 className="font-semibold text-slate-900 truncate">مایک - پسپۆڕی گەرمکەر</h3>
            </div>
            <p className="text-sm text-slate-500 truncate">پارچەکانی ئەیر کەندیشن داواکران.</p>
          </div>
        </button>

        <button className="w-full flex items-center gap-4 p-3 rounded-3xl hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition-all">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
              <Icon icon="solar:palette-2-bold" className="text-purple-600 text-3xl" />
            </div>
          </div>
          <div className="flex-1 min-w-0 text-right">
            <div className="flex justify-between items-start mb-0.5">
              <span className="text-xs text-slate-400">سێشەممە</span>
              <h3 className="font-semibold text-slate-900 truncate">ئیلینا - رەنگکار</h3>
            </div>
            <p className="text-sm text-slate-500 truncate">کام پالێتی رەنگت هەڵبژاردووە؟</p>
          </div>
        </button>

        <button className="w-full flex items-center gap-4 p-3 rounded-3xl hover:bg-slate-50 active:bg-slate-100 cursor-pointer transition-all">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
              <Icon icon="solar:leaf-bold" className="text-emerald-600 text-3xl" />
            </div>
          </div>
          <div className="flex-1 min-w-0 text-right">
            <div className="flex justify-between items-start mb-0.5">
              <span className="text-xs text-slate-400">١٢ ئۆکتۆبەر</span>
              <h3 className="font-semibold text-slate-900 truncate">جۆن - باخچەوانی</h3>
            </div>
            <p className="text-sm text-slate-500 truncate">نرخی باخچەی دواوە ئامادەیە.</p>
          </div>
        </button>
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
        <button className="flex flex-col items-center gap-1 text-[#2563EB]">
          <Icon icon="solar:chat-round-dots-bold" className="text-2xl" />
          <span className="text-[10px] font-bold">پەیامەکان</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors active:scale-95">
          <Icon icon="solar:user-circle-bold" className="text-2xl" />
          <span className="text-[10px] font-medium">پرۆفایل</span>
        </button>
      </nav>

      {/* Home Indicator */}
      <div className="absolute bottom-1 w-full flex justify-center z-20 pointer-events-none">
        <div className="w-32 h-1 bg-slate-900/10 rounded-full"></div>
      </div>
    </div>
    </>
  );
}
