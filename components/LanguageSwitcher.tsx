'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2 items-center bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => setLanguage('ku')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          language === 'ku' 
            ? 'bg-[#16a34a] text-white' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        کوردی
      </button>
      <button
        onClick={() => setLanguage('ar')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          language === 'ar' 
            : 'bg-[#16a34a] text-white' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        العربية
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          language === 'en' 
            ? 'bg-[#16a34a] text-white' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        English
      </button>
    </div>
  );
}
