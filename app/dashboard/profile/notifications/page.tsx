'use client';

import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { useState } from 'react';

export default function NotificationsPage() {
  const router = useRouter();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [orderStatus, setOrderStatus] = useState(true);
  const [promos, setPromos] = useState(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}} />
    <div className="relative w-full max-w-[430px] mx-auto min-h-screen bg-[#F9FAFB] shadow-2xl overflow-hidden flex flex-col font-[family-name:var(--font-lateef)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 px-4 py-3 animate-fadeIn">
        <div className="relative flex items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center justify-center w-10 h-10 -mr-2 rounded-full hover:bg-slate-100 transition-colors active:scale-95">
            <Icon icon="solar:arrow-right-bold" className="text-2xl text-slate-900" />
          </button>
          <h1 className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 text-lg font-bold text-slate-900">ڕێکخستنی ئاگادارکردنەوە</h1>
          <div className="w-10"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full px-4 pb-8 pt-4 overflow-y-auto animate-fadeIn">
        {/* Intro Text */}
        <div className="mb-6">
          <p className="text-sm text-slate-500 leading-relaxed px-1 text-right">
            دەستکاری بکە چۆن دەتەوێت ئاگادارکردنەوە بکرێت دەربارەی نوێکردنەوە، گەیشتنی خزمەتگوزاری و پێشکەشکراوەکان.
          </p>
        </div>

        {/* Section 1: Delivery Channels */}
        <div className="mb-6">
          <div className="px-1 mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-right">کەناڵەکانی ئاگادارکردنەوە</h3>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
            {/* Push Notifications */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
              <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                <input checked={pushEnabled} onChange={(e) => setPushEnabled(e.target.checked)} className="sr-only peer" type="checkbox"/>
                <div className="w-[50px] h-[30px] bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[#2563EB] transition-colors duration-300 ease-in-out"></div>
                <div className="absolute left-[2px] top-[2px] bg-white w-[26px] h-[26px] rounded-full shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] peer-checked:translate-x-[20px]"></div>
              </label>
              <div className="flex items-start gap-3 flex-1 text-right">
                <div className="flex flex-col">
                  <span className="text-base font-medium text-slate-900 leading-tight">ئاگادارکردنەوەی پوش</span>
                  <span className="text-sm text-slate-500 mt-0.5 font-normal leading-normal">ئاگادارکردنەوەی کاتی ڕاستەقینە لەسەر ئامێرەکەت</span>
                </div>
                <div className="mt-1 flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-[#2563EB] shrink-0">
                  <Icon icon="solar:bell-bing-bold" className="text-xl" />
                </div>
              </div>
            </div>

            {/* Email Notifications */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
              <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                <input checked={emailEnabled} onChange={(e) => setEmailEnabled(e.target.checked)} className="sr-only peer" type="checkbox"/>
                <div className="w-[50px] h-[30px] bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[#2563EB] transition-colors duration-300 ease-in-out"></div>
                <div className="absolute left-[2px] top-[2px] bg-white w-[26px] h-[26px] rounded-full shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] peer-checked:translate-x-[20px]"></div>
              </label>
              <div className="flex items-start gap-3 flex-1 text-right">
                <div className="flex flex-col">
                  <span className="text-base font-medium text-slate-900 leading-tight">ئاگادارکردنەوەی ئیمەیڵ</span>
                  <span className="text-sm text-slate-500 mt-0.5 font-normal leading-normal">وەرگرتنی پوختە و وەسڵ</span>
                </div>
                <div className="mt-1 flex items-center justify-center w-8 h-8 rounded-full bg-purple-50 text-purple-600 shrink-0">
                  <Icon icon="solar:letter-bold" className="text-xl" />
                </div>
              </div>
            </div>

            {/* SMS Updates */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
              <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                <input checked={smsEnabled} onChange={(e) => setSmsEnabled(e.target.checked)} className="sr-only peer" type="checkbox"/>
                <div className="w-[50px] h-[30px] bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[#2563EB] transition-colors duration-300 ease-in-out"></div>
                <div className="absolute left-[2px] top-[2px] bg-white w-[26px] h-[26px] rounded-full shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] peer-checked:translate-x-[20px]"></div>
              </label>
              <div className="flex items-start gap-3 flex-1 text-right">
                <div className="flex flex-col">
                  <span className="text-base font-medium text-slate-900 leading-tight">نوێکردنەوەی SMS</span>
                  <span className="text-sm text-slate-500 mt-0.5 font-normal leading-normal">نوێکردنەوەی پەلە یەک دەربارەی گەیشتنی تەکنیشن</span>
                </div>
                <div className="mt-1 flex items-center justify-center w-8 h-8 rounded-full bg-green-50 text-green-600 shrink-0">
                  <Icon icon="solar:chat-line-bold" className="text-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Content Preferences */}
        <div className="mb-8">
          <div className="px-1 mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 text-right">ناوەڕۆکی ئاگادارکردنەوەکان</h3>
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
            {/* Order Status Updates */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
              <div className="shrink-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input checked={orderStatus} onChange={(e) => setOrderStatus(e.target.checked)} className="sr-only peer" type="checkbox"/>
                  <div className="w-[50px] h-[30px] bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[#2563EB] transition-colors duration-300 ease-in-out"></div>
                  <div className="absolute left-[2px] top-[2px] bg-white w-[26px] h-[26px] rounded-full shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] peer-checked:translate-x-[20px]"></div>
                </label>
              </div>
              <div className="flex flex-col justify-center pl-4 text-right flex-1">
                <p className="text-slate-900 text-base font-medium leading-tight">نوێکردنەوەی دۆخی داواکاری</p>
                <p className="text-slate-500 text-sm font-normal leading-normal mt-1">شوێنکەوتنی پێشڕەوی داواکاریەکانت</p>
              </div>
            </div>

            {/* Promotional Offers */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
              <div className="shrink-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input checked={promos} onChange={(e) => setPromos(e.target.checked)} className="sr-only peer" type="checkbox"/>
                  <div className="w-[50px] h-[30px] bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[#2563EB] transition-colors duration-300 ease-in-out"></div>
                  <div className="absolute left-[2px] top-[2px] bg-white w-[26px] h-[26px] rounded-full shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] peer-checked:translate-x-[20px]"></div>
                </label>
              </div>
              <div className="flex flex-col justify-center pl-4 text-right flex-1">
                <p className="text-slate-900 text-base font-medium leading-tight">پێشکەشکراوەکان</p>
                <p className="text-slate-500 text-sm font-normal leading-normal mt-1">داشکاندنی تایبەت و ڕێنمایی وەرزی</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="px-4 text-center">
          <p className="text-xs text-slate-400 text-right leading-relaxed">
            ئاگادارکردنەوەی سیستەم کە پەیوەندیدارە بە پاراستنی ئەکاونت ناتوانرێت لەکاری بخرێت.
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
