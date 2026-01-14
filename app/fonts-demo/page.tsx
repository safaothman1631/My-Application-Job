'use client';

import { useState } from 'react';

export default function FontsDemo() {
  const [selectedFont, setSelectedFont] = useState('');

  const fonts = [
    { 
      name: 'Cairo', 
      class: 'font-cairo',
      description: 'مۆدێرن، جوان و گونجاو بۆ تایتل و تێکست'
    },
    { 
      name: 'Tajawal', 
      class: 'font-tajawal',
      description: 'سادە و خوێندنەوەی ئاسانی هەیە'
    },
    { 
      name: 'Noto Sans Arabic', 
      class: 'font-noto-arabic',
      description: 'پرۆفیشناڵ و بەرفراوان بەکاردێت'
    },
    { 
      name: 'Almarai', 
      class: 'font-almarai',
      description: 'مینیمالیست و مۆدێرن'
    },
    { 
      name: 'IBM Plex Sans Arabic', 
      class: 'font-ibm-arabic',
      description: 'کۆرپۆرەیت و پرۆفیشناڵ'
    },
    { 
      name: 'Amiri', 
      class: 'font-amiri',
      description: 'کلاسیک و فەرمی'
    },
    { 
      name: 'Lateef', 
      class: 'font-lateef',
      description: 'سادە و ڕوون'
    },
    { 
      name: 'Harmattan', 
      class: 'font-harmattan',
      description: 'گونجاو بۆ UI مۆدێرن'
    },
    { 
      name: 'Markazi Text', 
      class: 'font-markazi',
      description: 'یەکجار جوان بۆ تایتلەکان'
    },
    { 
      name: 'Vazirmatn', 
      class: 'font-vazir',
      description: 'جوان و گونجاو بۆ ئەپەکان'
    }
  ];

  const sampleText = {
    title: 'پسپۆڕانی متمانەپێکراو',
    subtitle: 'لە نزیکی خۆتدا بدۆزەرەوە',
    body: 'یارمەتی خێرا بۆ چاککردنەوە و پاککردنەوە و خزمەتگوزاری ماڵەکەت وەربگرە لە پسپۆڕە پشتڕاستکراوەکان',
    button: 'دەستپێبکە'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            10 فۆنتی جوانترین بۆ کوردی
          </h1>
          <p className="text-slate-600 text-lg">
            فۆنتێک هەڵبژێرە بۆ هەموو ئەپەکە
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          {fonts.map((font, index) => (
            <div 
              key={index}
              onClick={() => setSelectedFont(font.name)}
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer border-4 ${
                selectedFont === font.name 
                  ? 'border-blue-500 scale-[1.02]' 
                  : 'border-transparent hover:border-blue-200'
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">
                    {index + 1}. {font.name}
                  </h2>
                  <p className="text-sm text-slate-500">{font.description}</p>
                </div>
                {selectedFont === font.name && (
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    ✓ هەڵبژێردراوە
                  </div>
                )}
              </div>

              <div className={font.class} style={{ fontFamily: font.name }}>
                {/* Title Sample */}
                <div className="mb-6">
                  <label className="text-xs text-slate-400 uppercase mb-2 block">Title (Bold)</label>
                  <h3 className="text-3xl font-bold text-slate-900">
                    {sampleText.title}
                  </h3>
                </div>

                {/* Subtitle Sample */}
                <div className="mb-6">
                  <label className="text-xs text-slate-400 uppercase mb-2 block">Subtitle (Semibold)</label>
                  <h4 className="text-xl font-semibold text-blue-600">
                    {sampleText.subtitle}
                  </h4>
                </div>

                {/* Body Text Sample */}
                <div className="mb-6">
                  <label className="text-xs text-slate-400 uppercase mb-2 block">Body Text (Regular)</label>
                  <p className="text-base text-slate-600 leading-relaxed">
                    {sampleText.body}
                  </p>
                </div>

                {/* Button Sample */}
                <div>
                  <label className="text-xs text-slate-400 uppercase mb-2 block">Button</label>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">
                    {sampleText.button}
                  </button>
                </div>

                {/* Character Samples */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <label className="text-xs text-slate-400 uppercase mb-2 block">Sample Characters</label>
                  <p className="text-2xl text-slate-700">
                    ئ ا ب پ ت ج چ ح خ د ر ڕ ز ژ س ش ع غ ف ق ک گ ل ڵ م ن و ۆ ه ە ی ێ
                  </p>
                  <p className="text-lg text-slate-500 mt-2">
                    1 2 3 4 5 6 7 8 9 0 ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩ ٠
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedFont && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4">
            <p className="text-center font-bold">
              فۆنتی هەڵبژێردراو: <span className="text-yellow-300">{selectedFont}</span>
            </p>
            <p className="text-center text-sm text-blue-100 mt-1">
              ئەم فۆنتە بەکار بهێنە بۆ هەموو ئەپەکە
            </p>
          </div>
        )}
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Tajawal:wght@400;500;700;900&family=Noto+Sans+Arabic:wght@400;500;600;700&family=Almarai:wght@400;700;800&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=Amiri:wght@400;700&family=Lateef:wght@400;700&family=Harmattan:wght@400;700&family=Markazi+Text:wght@400;500;600;700&family=Vazirmatn:wght@400;500;700;900&display=swap');
        
        .font-cairo { font-family: 'Cairo', sans-serif; }
        .font-tajawal { font-family: 'Tajawal', sans-serif; }
        .font-noto-arabic { font-family: 'Noto Sans Arabic', sans-serif; }
        .font-almarai { font-family: 'Almarai', sans-serif; }
        .font-ibm-arabic { font-family: 'IBM Plex Sans Arabic', sans-serif; }
        .font-amiri { font-family: 'Amiri', serif; }
        .font-lateef { font-family: 'Lateef', serif; }
        .font-harmattan { font-family: 'Harmattan', sans-serif; }
        .font-markazi { font-family: 'Markazi Text', serif; }
        .font-vazir { font-family: 'Vazirmatn', sans-serif; }
      `}</style>
    </div>
  );
}
