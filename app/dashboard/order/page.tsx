'use client';

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface OrderDetails {
  orderId: string;
  providerName: string;
  providerImage: string;
  providerRating: number;
  providerReviews: number;
  providerProfession: string;
  serviceName: string;
  serviceDate: string;
  serviceTime: string;
  location: string;
  locationDetails: string;
  laborHours: number;
  laborCost: number;
  partsCost: number;
  partsDescription: string;
  serviceFee: number;
  total: number;
}

export default function OrderCompletePage() {
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetails>({
    orderId: '#29384',
    providerName: 'ئەحمەد کەریم',
    providerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUnFosXVvwYXd4J4wQ5IQMkyKFt6hTlEbcyLwAgjAld80jwcTQ0aWt6U7qABmkczRgLJiZMpm5o_JJ57yhFwGWeWWY1tPOf_FzYYP1MsOrZl-kfxzFvbBT-uE0omsEPNkpJYlvpVXZi-FLlTYXfqwWJ0Ff4CJ_ugUYPAZwMZgH-NiZgpb5CQxH2cnZmMaZCz52Y_z3Jb1Dpm73y9VfHzMt2UFqL4Jyw2w9IThEeq2ziuTvq435aRgvT3Chdn5c7YJ7hfRpjakGmZAV',
    providerRating: 4.9,
    providerReviews: 124,
    providerProfession: 'پیشەوەری مۆتەری ئاو',
    serviceName: 'چاککردنەوەی دڵۆپەی ئاو',
    serviceDate: '٢٤ ئۆکتۆبەر، ٢٠٢٣',
    serviceTime: '٢:٠٠ PM - ٤:١٥ PM',
    location: 'شەقامی سەرەکی ١٢٣، ئەپارتمان ٤B',
    locationDetails: 'سلێمانی، عێراق',
    laborHours: 2.0,
    laborCost: 150000,
    partsCost: 45000,
    partsDescription: 'ڤاڵڤی PVC',
    serviceFee: 10000,
    total: 205000
  });

  const handleDownloadInvoice = () => {
    alert('داگرتنی وەسڵ - ئەم تایبەتمەندییە بەزوانە زیاد دەکرێت');
  };

  const handleRebook = () => {
    router.push('/dashboard/provider');
  };

  const handleReportIssue = () => {
    router.push('/dashboard/profile/help');
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#18181b] text-white flex flex-col relative overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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

        .animate-fade-in {
          animation: fadeIn 0.4s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 0.5s ease-out forwards;
        }

        .receipt-dash {
          background-image: linear-gradient(to left, #52525b 33%, rgba(255,255,255,0) 0%);
          background-position: bottom;
          background-size: 6px 1px;
          background-repeat: repeat-x;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#18181b]/90 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="w-10"></div>
          <h1 className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-500">پیشاندانی وەسڵ</h1>
          <button
            onClick={() => router.back()}
            className="group flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-white/5 text-white transition-colors"
          >
            <Icon icon="solar:arrow-right-linear" className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-4 gap-6 pb-40 hide-scrollbar overflow-y-auto">
        {/* Order Identity Block */}
        <div className="flex flex-col gap-2 mt-2 animate-fade-in">
          <div className="flex items-start justify-between">
            <div className="flex flex-col text-right flex-1">
              <span className="text-zinc-500 text-sm font-medium">ژمارەی ئۆردەر</span>
              <h2 className="text-4xl font-bold tracking-tight text-white mt-1">{order.orderId}</h2>
            </div>
            
            {/* Status Badge */}
            <div className="mt-2 px-4 py-1.5 rounded-full border border-[#0ba6da]/40 bg-[#0ba6da]/10 flex items-center gap-2 shadow-[0_0_10px_-4px_#0ba6da]">
              <span className="text-[#0ba6da] text-xs font-bold uppercase tracking-widest">تەواوبوو</span>
              <div className="w-2 h-2 rounded-full bg-[#0ba6da] animate-pulse"></div>
            </div>
          </div>
          <p className="text-zinc-500 text-sm text-right">سوپاس بۆ کڕینەکەت.</p>
        </div>

        {/* Provider Card */}
        <section className="bg-[#26252C] border border-white/5 rounded-sm p-5 relative overflow-hidden group animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="absolute top-0 left-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Icon icon="solar:user-bold" className="w-16 h-16" />
          </div>
          <div className="flex items-center gap-5 relative z-10">
            <div className="flex-1 min-w-0 text-right">
              <h3 className="text-white font-bold text-xl truncate leading-tight">{order.providerName}</h3>
              <p className="text-zinc-400 text-sm truncate mb-1">{order.providerProfession}</p>
              <div className="flex items-center gap-1 justify-end">
                <span className="text-zinc-600 text-xs pt-0.5 ml-1">({order.providerReviews} هەڵسەنگاندن)</span>
                <span className="text-white text-xs font-bold pt-0.5">{order.providerRating}</span>
                <Icon icon="solar:star-bold" className="w-3.5 h-3.5 text-yellow-500" />
              </div>
            </div>
            <div className="relative shrink-0">
              <img
                alt={order.providerName}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-[#0ba6da]/20 bg-zinc-800"
                src={order.providerImage}
              />
              <div className="absolute -bottom-1 -left-1 bg-[#26252C] ring-4 ring-[#26252C] rounded-full p-0.5 flex items-center justify-center">
                <Icon icon="solar:verified-check-bold" className="w-4 h-4 text-[#0ba6da]" />
              </div>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="bg-[#26252C] border border-white/5 rounded-sm animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="px-5 py-3 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
            <Icon icon="solar:bill-list-bold" className="w-4 h-4 text-zinc-600" />
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">وردەکاریەکانی خزمەتگوزاری</h3>
          </div>
          <div className="divide-y divide-white/5">
            {/* Service */}
            <div className="p-5 grid grid-cols-[1fr_80px] gap-4 text-right">
              <div className="flex items-start gap-2 justify-end">
                <p className="text-white text-sm font-medium leading-tight">{order.serviceName}</p>
                <Icon icon="solar:widget-4-bold" className="w-4 h-4 text-[#0ba6da] mt-0.5" />
              </div>
              <p className="text-zinc-500 text-sm font-medium">خزمەتگوزاری</p>
            </div>

            {/* Date */}
            <div className="p-5 grid grid-cols-[1fr_80px] gap-4 text-right">
              <div className="flex items-start gap-2 justify-end">
                <p className="text-white text-sm font-medium leading-tight">
                  {order.serviceDate}
                  <br/>
                  <span className="text-zinc-500 font-normal">{order.serviceTime}</span>
                </p>
                <Icon icon="solar:calendar-mark-bold" className="w-4 h-4 text-[#0ba6da] mt-0.5" />
              </div>
              <p className="text-zinc-500 text-sm font-medium">بەروار</p>
            </div>

            {/* Location */}
            <div className="p-5 grid grid-cols-[1fr_80px] gap-4 text-right">
              <div className="flex items-start gap-2 justify-end">
                <p className="text-white text-sm font-medium leading-tight">
                  {order.location}
                  <br/>
                  <span className="text-zinc-500 font-normal">{order.locationDetails}</span>
                </p>
                <Icon icon="solar:map-point-bold" className="w-4 h-4 text-[#0ba6da] mt-0.5" />
              </div>
              <p className="text-zinc-500 text-sm font-medium">شوێن</p>
            </div>
          </div>
        </section>

        {/* Payment Summary */}
        <section className="bg-[#26252C] border border-white/5 rounded-sm p-6 shadow-xl relative animate-slide-up" style={{ animationDelay: '0.3s' }}>
          {/* Top Decoration */}
          <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-l from-[#0ba6da]/0 via-[#0ba6da]/50 to-[#0ba6da]/0"></div>
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 px-2 py-1 bg-zinc-800 rounded border border-white/5">
              <span className="text-[10px] text-zinc-300 font-mono tracking-wide">پارەدراوە</span>
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            </div>
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">پوختەی پارەدان</h3>
          </div>

          <div className="space-y-4 font-mono text-sm tracking-wide">
            {/* Labor */}
            <div className="flex justify-between items-baseline group">
              <span className="text-white tabular-nums">{order.laborCost.toLocaleString()} IQD</span>
              <div className="flex-grow mx-3 border-b border-zinc-700/50 relative -top-1 border-dashed"></div>
              <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors">کارکردن ({order.laborHours} کاتژمێر)</span>
            </div>

            {/* Parts */}
            <div className="flex justify-between items-baseline group">
              <span className="text-white tabular-nums">{order.partsCost.toLocaleString()} IQD</span>
              <div className="flex-grow mx-3 border-b border-zinc-700/50 relative -top-1 border-dashed"></div>
              <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors">پارچەکان ({order.partsDescription})</span>
            </div>

            {/* Service Fee */}
            <div className="flex justify-between items-baseline group">
              <span className="text-white tabular-nums">{order.serviceFee.toLocaleString()} IQD</span>
              <div className="flex-grow mx-3 border-b border-zinc-700/50 relative -top-1 border-dashed"></div>
              <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors">کرێی خزمەتگوزاری</span>
            </div>
          </div>

          {/* Total Divider */}
          <div className="my-6 h-px bg-zinc-700 receipt-dash"></div>

          <div className="flex justify-between items-center">
            <span className="text-[#0ba6da] font-bold text-3xl tracking-tight tabular-nums">{order.total.toLocaleString()} IQD</span>
            <span className="text-white font-bold text-lg">کۆی گشتی</span>
          </div>

          {/* Barcode */}
          <div className="mt-8 pt-4 flex flex-col items-center gap-2 opacity-40">
            <div className="h-6 flex items-stretch gap-[3px]">
              <div className="w-[2px] bg-white"></div>
              <div className="w-[1px] bg-white"></div>
              <div className="w-[4px] bg-white"></div>
              <div className="w-[1px] bg-white"></div>
              <div className="w-[2px] bg-white"></div>
              <div className="w-[6px] bg-white"></div>
              <div className="w-[1px] bg-white"></div>
              <div className="w-[3px] bg-white"></div>
              <div className="w-[2px] bg-white"></div>
              <div className="w-[5px] bg-white"></div>
              <div className="w-[1px] bg-white"></div>
              <div className="w-[2px] bg-white"></div>
            </div>
            <p className="text-[9px] font-mono tracking-widest text-zinc-500">REF: 8392-LKJ-2023</p>
          </div>
        </section>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 right-0 left-0 w-full bg-[#18181b]/95 backdrop-blur-xl border-t border-white/10 z-50">
        <div className="p-4 flex flex-col gap-3 pb-8">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleDownloadInvoice}
              className="flex items-center justify-center gap-2 p-3.5 rounded-sm bg-zinc-800 hover:bg-zinc-700 border border-white/10 transition-all active:scale-[0.98]"
            >
              <span className="text-sm font-medium text-white">داگرتنی وەسڵ</span>
              <Icon icon="solar:download-minimalistic-bold" className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={handleRebook}
              className="flex items-center justify-center gap-2 p-3.5 rounded-sm bg-[#0ba6da] hover:bg-[#0ba6da]/90 border border-[#0ba6da] transition-all active:scale-[0.98] shadow-[0_0_15px_-5px_#0ba6da]"
            >
              <span className="text-sm font-bold text-white">دووبارە نۆرکردن</span>
              <Icon icon="solar:refresh-bold" className="w-5 h-5 text-white" />
            </button>
          </div>
          <button
            onClick={handleReportIssue}
            className="w-full py-2 text-xs font-medium text-zinc-500 hover:text-white transition-colors flex items-center justify-center gap-1.5 group"
          >
            <span>ڕاپۆرتکردنی کێشە</span>
            <Icon icon="solar:flag-bold" className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}
