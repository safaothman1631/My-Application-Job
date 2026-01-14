'use client';

import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  icon: string;
  flag: string;
}

const languages: Language[] = [
  {
    code: 'ku',
    name: 'Kurdish',
    nativeName: 'کوردی',
    icon: 'twemoji:flag-kurdistan',
    flag: '🟥⚪🟢'
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    icon: 'twemoji:flag-iraq',
    flag: '🇮🇶'
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    icon: 'twemoji:flag-united-states',
    flag: '🇺🇸'
  },
];

export default function LanguagePage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState('ku');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('userLanguage') || 'ku';
    setSelectedLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = async (languageCode: string) => {
    setIsLoading(true);
    setSelectedLanguage(languageCode);
    
    // Save to localStorage
    localStorage.setItem('userLanguage', languageCode);
    
    // Simulate API call to save preference
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsLoading(false);
    
    // Show success message
    const languageName = languages.find(l => l.code === languageCode)?.nativeName;
    alert(`زمان گۆڕدرا بۆ ${languageName}`);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
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
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.4s ease-out forwards;
        }
      `}} />

      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all active:scale-95"
          >
            <Icon icon="solar:alt-arrow-right-bold" className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">زمان</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24">
        {/* Header Card */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm border border-gray-100 animate-scale-in">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Icon icon="solar:global-bold" className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">هەڵبژاردنی زمان</h2>
              <p className="text-sm text-gray-500">
                زمانی دڵخوازت هەڵبژێرە بۆ بەکارهێنانی ئەپڵیکەیشن
              </p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6 flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <Icon icon="solar:info-circle-bold" className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-blue-900 font-medium mb-1">
              گۆڕینی زمان
            </p>
            <p className="text-xs text-blue-700">
              دوای گۆڕینی زمان، هەموو ناوەڕۆکی ئەپڵیکەیشن بە زمانی هەڵبژێردراو پیشان دەدرێت
            </p>
          </div>
        </div>

        {/* Languages List */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              زمانە بەردەستەکان
            </h3>
          </div>
          
          {languages.map((language, index) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              disabled={isLoading}
              className={`w-full flex items-center justify-between p-5 transition-all hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 ${
                index < languages.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-2xl shadow-sm">
                  <Icon icon={language.icon} className="w-8 h-8" />
                </div>
                <div className="text-right">
                  <h4 className="font-bold text-gray-900 text-lg mb-0.5">
                    {language.nativeName}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {language.name}
                  </p>
                </div>
              </div>
              
              {selectedLanguage === language.code ? (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg animate-scale-in">
                  <Icon icon="solar:check-circle-bold" className="w-6 h-6 text-white" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Note */}
        <div className="mt-6 px-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-center text-xs text-gray-500">
            <Icon icon="solar:info-circle-linear" className="inline w-4 h-4 mr-1" />
            لە ئێستادا تەنها کوردی پشتگیری دەکرێت، زمانەکانی تر بەزووانە زیاد دەکرێن
          </p>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 shadow-xl flex items-center gap-4">
            <Icon icon="svg-spinners:ring-resize" className="w-8 h-8 text-blue-600" />
            <p className="text-gray-900 font-semibold">گۆڕینی زمان...</p>
          </div>
        </div>
      )}
    </div>
  );
}
