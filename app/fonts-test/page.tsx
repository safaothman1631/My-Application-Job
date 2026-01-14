'use client';

import { Tajawal, IBM_Plex_Sans_Arabic, Almarai, Amiri, Scheherazade_New } from 'next/font/google';

const tajawal = Tajawal({ 
  subsets: ['arabic'], 
  weight: ['400', '500', '700'],
  display: 'swap'
});

const ibm = IBM_Plex_Sans_Arabic({ 
  subsets: ['arabic'], 
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});

const almarai = Almarai({ 
  subsets: ['arabic'], 
  weight: ['400', '700', '800'],
  display: 'swap'
});

const amiri = Amiri({ 
  subsets: ['arabic'], 
  weight: ['400', '700'],
  display: 'swap'
});

const scheherazade = Scheherazade_New({ 
  subsets: ['arabic'], 
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});

export default function FontsTest() {
  const sampleText = "بەڕێوەبردنی بەکارهێنەران - بەزاری پیشەسازی ١٢٣٤٥";
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          تاقیکردنەوەی فۆنتەکان
        </h1>

        {/* Font 1: Tajawal */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white/60 text-sm font-mono">1. Tajawal</h2>
            <span className="text-white/40 text-xs">مۆدێرن و سووک</span>
          </div>
          <div className={tajawal.className}>
            <p className="text-white text-2xl mb-3">{sampleText}</p>
            <p className="text-white text-lg mb-2">چوونەژوورەوە بۆ سیستەمی بەڕێوەبردن</p>
            <p className="text-white/80 text-base">ژمارەی تەلەفۆن: +٩٦٤٧٥٠١٢٣٤٥٦٧</p>
          </div>
        </div>

        {/* Font 2: IBM Plex Sans Arabic */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white/60 text-sm font-mono">2. IBM Plex Sans Arabic</h2>
            <span className="text-white/40 text-xs">پرۆفیشناڵ و ڕوون</span>
          </div>
          <div className={ibm.className}>
            <p className="text-white text-2xl mb-3">{sampleText}</p>
            <p className="text-white text-lg mb-2">چوونەژوورەوە بۆ سیستەمی بەڕێوەبردن</p>
            <p className="text-white/80 text-base">ژمارەی تەلەفۆن: +٩٦٤٧٥٠١٢٣٤٥٦٧</p>
          </div>
        </div>

        {/* Font 3: Almarai */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white/60 text-sm font-mono">3. Almarai</h2>
            <span className="text-white/40 text-xs">کلین و مۆدێرن</span>
          </div>
          <div className={almarai.className}>
            <p className="text-white text-2xl mb-3">{sampleText}</p>
            <p className="text-white text-lg mb-2">چوونەژوورەوە بۆ سیستەمی بەڕێوەبردن</p>
            <p className="text-white/80 text-base">ژمارەی تەلەفۆن: +٩٦٤٧٥٠١٢٣٤٥٦٧</p>
          </div>
        </div>

        {/* Font 4: Amiri */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white/60 text-sm font-mono">4. Amiri</h2>
            <span className="text-white/40 text-xs">کلاسیک و جوان</span>
          </div>
          <div className={amiri.className}>
            <p className="text-white text-2xl mb-3">{sampleText}</p>
            <p className="text-white text-lg mb-2">چوونەژوورەوە بۆ سیستەمی بەڕێوەبردن</p>
            <p className="text-white/80 text-base">ژمارەی تەلەفۆن: +٩٦٤٧٥٠١٢٣٤٥٦٧</p>
          </div>
        </div>

        {/* Font 5: Scheherazade New */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white/60 text-sm font-mono">5. Scheherazade New</h2>
            <span className="text-white/40 text-xs">ترادیشناڵ</span>
          </div>
          <div className={scheherazade.className}>
            <p className="text-white text-2xl mb-3">{sampleText}</p>
            <p className="text-white text-lg mb-2">چوونەژوورەوە بۆ سیستەمی بەڕێوەبردن</p>
            <p className="text-white/80 text-base">ژمارەی تەلەفۆن: +٩٦٤٧٥٠١٢٣٤٥٦٧</p>
          </div>
        </div>

        <div className="text-center pt-8">
          <a 
            href="http://localhost:3002" 
            className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all"
          >
            گەڕانەوە بۆ پەیجی سەرەکی
          </a>
        </div>
      </div>
    </div>
  );
}
