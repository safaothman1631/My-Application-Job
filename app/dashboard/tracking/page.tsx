'use client';

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ServiceTrackingPage() {
  const router = useRouter();
  const [eta, setEta] = useState(12);

  useEffect(() => {
    // Simulate ETA countdown
    const interval = setInterval(() => {
      setEta((prev) => (prev > 0 ? prev - 1 : 0));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleCall = () => {
    alert('پەیوەندی تەلەفۆنی - ئەم تایبەتمەندییە بەزوانە زیاد دەکرێت');
  };

  const handleMessage = () => {
    router.push('/dashboard/messages/chat');
  };

  const handleInfo = () => {
    alert('زانیاری زیاتر - ئەم تایبەتمەندییە بەزوانە زیاد دەکرێت');
  };

  const handleSupport = () => {
    router.push('/dashboard/profile/help');
  };

  return (
    <div dir="rtl" className="relative w-full h-screen flex flex-col overflow-hidden bg-[#131315]">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-ring {
          0% {
            transform: scale(0.33);
            opacity: 0.8;
          }
          80%, 100% {
            opacity: 0;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .pulse-ring {
          position: absolute;
          height: 100%;
          width: 100%;
          border-radius: 50%;
          background-color: #19b3e6;
          opacity: 0.6;
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        .slide-up {
          animation: slideUp 0.5s ease-out forwards;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* Map Layer (Background) */}
      <div className="absolute inset-0 z-0 bg-[#111618]">
        {/* Map Image */}
        <div
          className="w-full h-full bg-cover bg-center opacity-60 mix-blend-overlay"
          style={{
            backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDo-GXRGWjHFS9y0WDEpcznGynU_Qg96NWrbTg1lbQ6rGQmJP7hYKVJEEhbsLLorpfKSdMTdFhiSQApqSYRSi-krjTpbOcyYnM1tW76e9lJjDnlmoPncIeBock3Iwb07jkD6h6zxEhQbucQvyoyZvwAco2dmEpxhPchbNl-ZptrdkCTI8o7uF7JlSg88YsibUYF5Bz8bVHdSYSmHh31RkqqHsclP4f9Hz4lLCu2zkdy-3mL9u20sagCPHvtSFOfmqPsFxIY6ZSYPHPx')"
          }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#131315]/40 pointer-events-none"></div>

        {/* Route Line */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_8px_rgba(25,179,230,0.6)]" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100,200 Q180,350 220,550 T280,700"
            fill="none"
            stroke="#19b3e6"
            strokeDasharray="10 4"
            strokeLinecap="round"
            strokeWidth="4"
          />
        </svg>

        {/* Provider Marker (Moving) */}
        <div className="absolute top-[30%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center float-animation">
          <div className="bg-[#1c1c1e] text-white text-[10px] font-bold px-2 py-1 rounded-full mb-2 shadow-lg border border-white/10 whitespace-nowrap">
            بەرەو تۆ
          </div>
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="relative z-10 bg-white text-[#131315] rounded-full p-2 shadow-lg ring-4 ring-[#19b3e6]/30">
              <Icon icon="solar:delivery-bold" className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* User Marker (Location) */}
        <div className="absolute bottom-[25%] right-[25%] z-10">
          <div className="relative w-6 h-6">
            <div className="pulse-ring absolute inset-[-12px] w-[48px] h-[48px] -ml-[12px] -mt-[12px]"></div>
            <div className="relative z-10 w-full h-full bg-[#19b3e6] border-[3px] border-white rounded-full shadow-lg"></div>
          </div>
        </div>
      </div>

      {/* Top Navigation Bar */}
      <div className="absolute top-0 w-full z-20 pt-12 pb-6 px-6 bg-gradient-to-b from-[#131315]/90 to-transparent flex justify-between items-center">
        <button
          onClick={handleSupport}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2c2c2e]/50 backdrop-blur-md border border-white/5 text-white shadow-lg active:scale-95 transition-transform"
        >
          <Icon icon="solar:help-bold" className="w-5 h-5" />
        </button>
        <h1 className="text-white text-base font-bold tracking-tight drop-shadow-md">شوێنپێی خزمەتگوزاری</h1>
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2c2c2e]/50 backdrop-blur-md border border-white/5 text-white shadow-lg active:scale-95 transition-transform"
        >
          <Icon icon="solar:arrow-right-linear" className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Overlay Card */}
      <div className="absolute bottom-0 w-full z-30 slide-up">
        {/* Floating Container */}
        <div className="mx-2 mb-2 bg-[#1c1c1e] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col relative">
          {/* Status Bar Gradient Line */}
          <div className="h-1 w-full bg-[#2c2c2e] relative">
            <div className="absolute right-0 top-0 bottom-0 w-[66%] bg-gradient-to-l from-[#19b3e6]/50 to-[#19b3e6] shadow-[0_0_10px_rgba(25,179,230,0.5)]"></div>
          </div>

          {/* Main Content */}
          <div className="p-6 pb-8 flex flex-col gap-6">
            {/* Header Section: ETA & Status */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1 flex-1 text-right">
                <div className="flex items-center gap-2 justify-end">
                  <span className="text-orange-400 text-xs font-bold uppercase tracking-wider">لە ڕێگادایە</span>
                  <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></div>
                </div>
                <h2 className="text-white text-3xl font-extrabold leading-tight tracking-tight">
                  {eta} <span className="text-lg text-gray-400 font-medium">خولەک</span>
                </h2>
                <p className="text-gray-500 text-sm font-medium mt-0.5">دەگاتە کاتژمێر ١:٤٥ PM</p>
              </div>

              {/* Visual Status Stepper */}
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-1 flex-row-reverse">
                  <div className="h-1.5 w-6 rounded-full bg-[#19b3e6]"></div>
                  <div className="h-1.5 w-6 rounded-full bg-[#19b3e6] shadow-lg shadow-[#19b3e6]/50"></div>
                  <div className="h-1.5 w-6 rounded-full bg-[#2c2c2e]"></div>
                </div>
                <span className="text-[10px] text-gray-400 font-semibold tracking-wide mt-1 uppercase">هەنگاو ٢/٣</span>
              </div>
            </div>

            {/* Service Provider Info Card */}
            <div className="flex items-center gap-4 p-3 rounded-xl bg-[#2c2c2e]/40 border border-white/5">
              <button
                onClick={handleInfo}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2c2c2e] text-gray-400 border border-white/5 hover:bg-[#3c3c3e] transition-colors"
              >
                <Icon icon="solar:info-circle-bold" className="w-5 h-5" />
              </button>

              <div className="flex-1 min-w-0 text-right">
                <h3 className="text-white font-bold text-base truncate">مایکڵ رێنۆڵدز</h3>
                <div className="flex items-center gap-2 mt-0.5 justify-end flex-wrap">
                  <span className="text-gray-400 text-xs font-mono bg-white/5 px-1.5 rounded text-[10px] tracking-wide border border-white/5">4XG-992</span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                  <span className="text-gray-400 text-xs truncate">پسپۆڕی مۆتەری ئاو</span>
                </div>
              </div>

              <div className="relative">
                <div
                  className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden border border-white/10 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB57Gcobk_m-_spo9PkPS20flHP7YXfHHZ2hdwJ8_KkamISFz_6Q7qHGfO9ih3N1T6zrD-6cMQZFE4bouA8R1mzqbDGCNqdMkU3ujKCwyQXj-pjX52wGk7KFDcR7zxb2p1-lHQvwtUvvCk8TxerPmB_H4lJgk2LCXSoH2KGxU0rtTvXCor-e9G_VS_naP5dR1znuRNQ3CpOVLGMkcjWWXiFErdKNrHOZRyTD4V5DyXMDgyEZP8iiGOCmn-7nXYBcERozj4vBPxi-3JC')"
                  }}
                ></div>
                <div className="absolute -bottom-1 -left-1 bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center shadow-sm">
                  <Icon icon="solar:star-bold" className="w-2.5 h-2.5 ml-0.5" />
                  4.9
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCall}
                className="group relative flex items-center justify-center gap-2 h-14 rounded-xl bg-[#2c2c2e] hover:bg-[#3c3c3e] text-white font-bold transition-all border border-white/5 active:scale-[0.98]"
              >
                <span className="text-base">پەیوەندی</span>
                <Icon icon="solar:phone-calling-bold" className="w-5 h-5 text-[#19b3e6] group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={handleMessage}
                className="group relative flex items-center justify-center gap-2 h-14 rounded-xl bg-[#19b3e6] hover:bg-[#19b3e6]/90 text-[#131315] font-bold transition-all shadow-lg shadow-[#19b3e6]/20 active:scale-[0.98]"
              >
                <span className="text-base">پەیام</span>
                <Icon icon="solar:chat-round-dots-bold" className="w-5 h-5 text-[#131315] group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Home Indicator Safe Area */}
        <div className="h-6 w-full flex justify-center items-start pointer-events-none">
          <div className="w-1/3 h-1 bg-white/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
