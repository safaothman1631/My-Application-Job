'use client';

import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { useState } from 'react';

export default function ChatPage() {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending:', message);
      setMessage('');
    }
  };

  return (
    <div className="relative w-full max-w-[430px] mx-auto min-h-screen bg-[#F9FAFB] shadow-2xl overflow-hidden flex flex-col font-[family-name:var(--font-lateef)]">
      {/* Chat Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10 animate-slideDown">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-1 -mr-2 text-slate-600 hover:text-slate-900 active:scale-95 transition-all">
            <Icon icon="solar:arrow-right-bold" className="text-2xl" />
          </button>
          <div className="relative">
            <img
              alt="ئەحمەد کەریم"
              className="w-10 h-10 rounded-full object-cover"
              src="/login-avatar.jpeg"
            />
            <div className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="text-right">
            <h2 className="font-bold text-slate-900 text-base leading-tight">ئەحمەد کەریم</h2>
            <p className="text-[12px] text-green-500 font-medium">ئۆنلاینە</p>
          </div>
        </div>
        <button className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full text-[#2563EB] hover:bg-slate-200 active:scale-95 transition-all">
          <Icon icon="solar:phone-calling-bold" className="text-xl" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 bg-slate-50 hide-scrollbar animate-fadeInScale">
        {/* Date Separator */}
        <div className="flex justify-center">
          <span className="px-3 py-1 bg-white text-[11px] font-semibold text-slate-400 rounded-full uppercase tracking-wider shadow-sm">ئەمڕۆ</span>
        </div>

        {/* Received Message */}
        <div className="flex items-end gap-2 max-w-[85%] animate-slideInRight">
          <div className="bg-white p-4 rounded-2xl rounded-br-none shadow-sm border border-slate-100">
            <p className="text-sm text-slate-700 leading-relaxed text-right">
              سڵاو! لە ڕێگام بۆ شوێنەکەت بۆ چاککردنەوەی ئەیر کەندیشن. ١٥ خولەک دیگە لەوێ دەبم.
            </p>
            <span className="text-[10px] text-slate-400 mt-1 block text-left">10:30 AM</span>
          </div>
        </div>

        {/* Sent Message */}
        <div className="flex flex-col items-start gap-1 animate-slideInLeft">
          <div className="max-w-[85%] bg-[#2563EB] p-4 rounded-2xl rounded-bl-none shadow-md shadow-blue-500/10">
            <p className="text-sm text-white leading-relaxed text-right">
              زۆر باشە، سوپاس! پێشتر شوێنی دەوروبەری ئامێرەکەم پاککردۆتەوە.
            </p>
            <div className="flex justify-start items-center gap-1 mt-1">
              <Icon icon="solar:check-read-bold" className="text-[14px] text-blue-200" />
              <span className="text-[10px] text-blue-100">10:32 AM</span>
            </div>
          </div>
        </div>

        {/* Received Message */}
        <div className="flex items-end gap-2 max-w-[85%] animate-slideInRight">
          <div className="bg-white p-4 rounded-2xl rounded-br-none shadow-sm border border-slate-100">
            <p className="text-sm text-slate-700 leading-relaxed text-right">
              زۆر باشە. تکایە وێنەیەکی خێرام بنێرە لە لەیبڵی مۆدێلی یەکەی دەرەوە ئەگەر دەتوانیت؟
            </p>
            <span className="text-[10px] text-slate-400 mt-1 block text-left">10:33 AM</span>
          </div>
        </div>

        {/* Sent Message with Image */}
        <div className="flex flex-col items-start gap-1 animate-slideInLeft">
          <div className="max-w-[85%] bg-[#2563EB] p-2 rounded-2xl rounded-bl-none shadow-md shadow-blue-500/10">
            <img
              alt="وێنەی ئەیر کەندیشن"
              className="w-full rounded-xl mb-2 aspect-video object-cover"
              src="/login-avatar.jpeg"
            />
            <div className="px-2 pb-1">
              <p className="text-sm text-white leading-relaxed text-right">بێگومان، ئەمە وایە.</p>
              <div className="flex justify-start items-center gap-1 mt-1">
                <Icon icon="solar:check-read-bold" className="text-[14px] text-blue-200" />
                <span className="text-[10px] text-blue-100">10:35 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Typing Indicator */}
        <div className="flex items-end gap-2 max-w-[85%] animate-pulse">
          <div className="bg-white p-4 rounded-2xl rounded-br-none shadow-sm border border-slate-100">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t border-slate-100 pb-8">
        <div className="flex items-center gap-3">
          <button className="w-11 h-11 flex items-center justify-center bg-slate-100 text-slate-500 rounded-full active:scale-95 transition-transform hover:bg-slate-200">
            <Icon icon="solar:camera-bold" className="text-xl" />
          </button>
          <div className="flex-1 relative">
            <input
              className="w-full bg-slate-100 border-none rounded-2xl py-3 px-4 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#2563EB]/20 outline-none text-right"
              placeholder="پەیامێک بنووسە..."
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
          </div>
          <button onClick={handleSend} className="w-11 h-11 flex items-center justify-center bg-[#2563EB] text-white rounded-full shadow-lg shadow-blue-500/30 active:scale-95 transition-transform hover:bg-blue-600">
            <Icon icon="solar:plain-2-bold" className="text-xl rotate-180" />
          </button>
        </div>
      </div>

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
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeInScale {
          animation: fadeInScale 0.3s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.4s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.4s ease-out;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
