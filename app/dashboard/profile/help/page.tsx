'use client';

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface TopicCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  bgColor: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function HelpSupportPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const topics: TopicCard[] = [
    {
      id: '1',
      title: 'پارەدان',
      subtitle: 'وەسڵ، گەڕانەوەی پارە، باج',
      icon: 'solar:card-bold',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: '2',
      title: 'نۆرەکان',
      subtitle: 'گۆڕین، هەڵوەشاندنەوە',
      icon: 'solar:calendar-bold',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: '3',
      title: 'پاراستن',
      subtitle: 'وشەی نهێنی، 2FA، داتا',
      icon: 'solar:shield-check-bold',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    },
    {
      id: '4',
      title: 'کوالیتی',
      subtitle: 'ناکۆکی، فیدباک',
      icon: 'solar:star-bold',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
  ];

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'چۆن دەتوانم کاتی سەردانەکەم بگۆڕم؟',
      answer: 'بڕۆ بۆ "نۆرەکانم"، نۆرە داهاتووەکە هەڵبژێرە، و دوگمەی "گۆڕینی کات" دابگرە. دەتوانیت کاتێکی نوێ هەڵبژێریت تا ٢ کاتژمێر پێش کاتی دیاریکراو.'
    },
    {
      id: '2',
      question: 'چ شێوازێکی پارەدان قبووڵ دەکەن؟',
      answer: 'هەموو کارتەکانی کرێدیت و دیبێت قبووڵ دەکەین (Visa، Mastercard، Amex)، هەروەها ZainCash و FIB Wallet. پارەی کاش بۆ مەبەستی پاراستن پشتگیری ناکرێت.'
    },
    {
      id: '3',
      question: 'چۆن پەیوەندی بە تەکنیشنەکەم بکەم؟',
      answer: 'کاتێک تەکنیشنێک دیاری دەکرێت، دوگمەی "پەیوەندی" یان "پەیام" لە لاپەڕەی وردەکاریەکانی نۆرە دەبینیت. ژمارەی تۆ بۆ پاراستنی تایبەتمەندی شاراوە دەکرێت.'
    },
    {
      id: '4',
      question: 'ئایا خزمەتگوزارییەکەم بیمەکراوە؟',
      answer: 'بەڵێ، هەموو خزمەتگوزارییەکان کە لە ڕێگەی پلاتفۆرمەکەمانەوە نۆر دەکرێن بە گەرەنتی دڵخۆشی پۆشراون، کە تا بڕی ١،٠٠٠ دۆلار لە زیانەکان دەتپارێزێت.'
    },
    {
      id: '5',
      question: 'چۆن دەتوانم هەژمارەکەم بسڕمەوە؟',
      answer: 'بڕۆ بۆ "ڕێکخستنەکان" > "پرایڤەسی و پاراستن" > "سڕینەوەی هەژمار". تێبینی: ئەمە کارێکی هەمیشەییە و هەموو داتاکانت دەسڕێتەوە.'
    },
    {
      id: '6',
      question: 'چۆن دەتوانم گەرەنتی بدەمەوە؟',
      answer: 'ئەگەر بە خزمەتگوزارییەکە دڵخۆش نەبوویت، لە ماوەی ٢٤ کاتژمێر پەیوەندی بە پشتگیری بکە. داواکاری گەڕانەوەی پارەت لە ٥-٧ ڕۆژی کاری پرۆسێس دەکرێت.'
    }
  ];

  const handleTopicClick = (topicId: string) => {
    alert(`باس: ${topics.find(t => t.id === topicId)?.title} - بەزوانە زیاد دەکرێت`);
  };

  const handleEmailSupport = () => {
    alert('پەیوەندی بە ئیمەیڵ - بەزوانە زیاد دەکرێت');
  };

  const handleCallSupport = () => {
    alert('پەیوەندی تەلەفۆنی - بەزوانە زیاد دەکرێت');
  };

  const handleChatSupport = () => {
    alert('چاتی زیندوو - بەزوانە زیاد دەکرێت');
  };

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @media (max-width: 430px) {
          .max-w-md {
            max-width: 100%;
          }
        }
      `}} />

      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <Icon icon="solar:arrow-right-linear" className="w-5 h-5 text-gray-900" />
            </button>
            <h1 className="text-xs font-bold text-gray-900 tracking-wide uppercase">ناوەندی پشتگیری</h1>
            <div className="w-10 h-10"></div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 pt-6 pb-32 hide-scrollbar overflow-y-auto">
          {/* Header Section */}
          <div className="mb-8 animate-fade-in-up">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">چۆن یارمەتیت بدەین؟</h2>
            <p className="text-gray-500 text-sm">ڕاوێژ و وەڵامی پرسیارەکانت لە تیمەکەمان بدۆزەرەوە.</p>
          </div>

          {/* Search Component */}
          <div className="mb-10 relative group z-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="absolute inset-0 bg-blue-600/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex w-full items-center">
              <div className="absolute right-4 flex items-center justify-center text-blue-600 pointer-events-none">
                <Icon icon="solar:magnifer-bold" className="w-5 h-5" />
              </div>
              <input
                className="h-14 w-full rounded-2xl border-0 bg-white pr-12 pl-4 text-base font-medium text-gray-900 placeholder:text-gray-400 shadow-lg focus:ring-2 focus:ring-blue-600/50 focus:bg-white transition-all"
                placeholder="گەڕان بۆ کێشە، بابەت..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Categories Section */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">گەڕان بە بابەتەکان</h3>
              <button className="text-blue-600 text-sm font-semibold hover:opacity-80">هەموویان ببینە</button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {topics.map((topic, index) => (
                <button
                  key={topic.id}
                  onClick={() => handleTopicClick(topic.id)}
                  className="group relative flex flex-col items-start p-5 h-40 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden text-right animate-scale-in"
                  style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                >
                  <div className="absolute top-0 left-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Icon icon={topic.icon} className="w-16 h-16 text-blue-600 transform rotate-12" />
                  </div>
                  <div className={`w-10 h-10 rounded-full ${topic.bgColor} flex items-center justify-center ${topic.color} mb-auto group-hover:scale-110 transition-transform z-10`}>
                    <Icon icon={topic.icon} className="w-5 h-5" />
                  </div>
                  <div className="z-10">
                    <span className="block text-gray-900 font-bold text-base">{topic.title}</span>
                    <span className="text-xs text-gray-500 mt-1 line-clamp-1">{topic.subtitle}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Top Questions Section */}
          <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <h3 className="text-lg font-bold text-gray-900 mb-4">پرسیارە باوەکان</h3>
            <div className="flex flex-col gap-3">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="rounded-xl bg-white border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="flex cursor-pointer items-center justify-between p-4 font-semibold text-gray-900 w-full text-right hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm flex-1">{faq.question}</span>
                    <Icon
                      icon="solar:alt-arrow-down-linear"
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        openFAQ === faq.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFAQ === faq.id && (
                    <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed animate-fade-in-up">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Help Section */}
          <div className="mb-8 rounded-2xl bg-gray-100 p-6 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <p className="text-sm font-medium text-gray-600 mb-4">هێشتا ئەوەت نەدۆزیەوە کە بەدوایدا دەگەڕێیت؟</p>
            <div className="flex items-center justify-center gap-6">
              <button onClick={handleEmailSupport} className="flex flex-col items-center gap-1 group">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:text-blue-600 transition-colors">
                  <Icon icon="solar:letter-bold" className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                </div>
                <span className="text-xs font-semibold text-gray-500">ئیمەیڵ</span>
              </button>
              <button onClick={handleCallSupport} className="flex flex-col items-center gap-1 group">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:text-blue-600 transition-colors">
                  <Icon icon="solar:phone-calling-bold" className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                </div>
                <span className="text-xs font-semibold text-gray-500">پەیوەندی</span>
              </button>
            </div>
          </div>
        </main>

        {/* Floating Chat Button */}
        <div className="fixed bottom-6 left-4 z-50 max-w-md">
          <button
            onClick={handleChatSupport}
            className="flex h-14 items-center gap-2 rounded-full bg-blue-600 pl-6 pr-5 shadow-lg shadow-blue-600/30 transition-transform hover:scale-105 active:scale-95 animate-pulse-slow"
          >
            <Icon icon="solar:chat-round-dots-bold" className="w-6 h-6 text-white" />
            <span className="font-bold text-white">چاتی زیندوو</span>
          </button>
        </div>
      </div>
    </div>
  );
}
