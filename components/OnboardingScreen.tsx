'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';

export function OnboardingScreen({ onGetStarted }: { onGetStarted: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const slides = [
    {
      title: 'پسپۆڕانی',
      highlight: 'متمانەپێکراو',
      subtitle: 'لە نزیکی خۆتدا بدۆزەرەوە',
      description: 'یارمەتی خێرا بۆ چاککردنەوە و پاککردنەوە و خزمەتگوزاری ماڵەکەت وەربگرە لە پسپۆڕە پشتڕاستکراوەکان',
      image: '/13e6106cc0ae82be3e759fe363823f4c.png',
      color: '#2563EB'
    },
    {
      title: 'وەرگرتنی',
      highlight: 'ئاسان',
      subtitle: 'و کاتژمێرکردن',
      description: 'بە چەند کلیکێک وادەیەک دابنێ و کاتی گونجاو هەڵبژێرە. سیستەمی کاتژمێرکردنی زیرەکانە',
      image: '/c50062e91bbb4bee55ddb16f75e9cc51.png',
      color: '#22C55E'
    },
    {
      title: 'شوێنکەوتنی',
      highlight: 'ڕاستەوخۆ',
      subtitle: 'بۆ هەموو وادەکانت',
      description: 'شوێنی پسپۆڕەکەت بکەوە لە کاتی ڕاستەقینە و ئاگادار بە لە کاتی گەیشتنی',
      image: '/28b7a73aec75c26abaa98f369a7c7383.png',
      color: '#8B5CF6'
    },
    {
      title: 'هەڵسەنگاندن',
      highlight: 'و پێداچوونەوە',
      subtitle: 'بۆ کواڵیتی باشتر',
      description: 'ڕای خۆت دەربارەی خزمەتگوزارییەکان بنووسە و یارمەتی کەسانی تر بدە لە هەڵبژاردنی باشترین',
      image: '/634b33cd14b9f567567c00279d5378c9.png',
      color: '#EAB308'
    },
    {
      title: 'پارەدان و',
      highlight: 'پشتگیری',
      subtitle: 'پارێزراو',
      description: 'پارەدانی سەلامەت و پشتگیری ٢٤/٧ بۆ ئاسوودەیی تەواوی تۆ',
      image: '/c97f8aceee0a5ebe4eb33fe028f2f739.png',
      color: '#F59E0B'
    },
    {
      title: 'چات و',
      highlight: 'پەیوەندی',
      subtitle: 'خێرا و ئاسان',
      description: 'پەیوەندی ڕاستەوخۆ لەگەڵ پسپۆڕەکەت بکە و پرسیارەکانت بکە پێش و دوای وادەکە',
      image: '/b52218dc73cc4140b0c639c9b8418d38.png',
      color: '#06B6D4'
    },
    {
      title: 'خزمەتگوزاری',
      highlight: 'لە دەوروبەرت',
      subtitle: 'هەمیشە لە نزیکی تۆ',
      description: 'هەزاران پسپۆڕ لە شارەکەتدا ئامادەن بۆ یارمەتیدانت. دەست پێ بکە ئێستا!',
      image: '/3bf8cd07c59138c935c9c66f9dffb2ce.png',
      color: '#EC4899'
    }
  ];

  const handleGetStarted = async () => {
    setIsLoading(true);
    
    try {
      // Mark onboarding as seen in localStorage
      localStorage.setItem('hasSeenOnboarding', 'true');
      
      // Small delay for UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Call the parent callback
      onGetStarted();
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    // Navigate to login page or trigger login modal
    localStorage.setItem('hasSeenOnboarding', 'true');
    onGetStarted();
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setDirection('left');
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setDirection('right');
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    setDirection('left');
    setCurrentSlide(slides.length - 1);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC] dark:bg-[#0F172A] font-sans">
      {/* Mobile Frame Container */}
      <div className="max-w-md mx-auto w-full h-full bg-white dark:bg-slate-900 relative overflow-hidden flex flex-col">
        {/* Skip Button */}
        {currentSlide < slides.length - 1 && (
          <button
            onClick={handleSkip}
            className="absolute top-6 left-6 z-20 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-semibold text-sm transition-colors font-[family-name:var(--font-lateef)]"
          >
            تێپەڕاندن
          </button>
        )}

        {/* Decorative Blobs */}
        <div className="absolute w-64 h-64 -top-20 -right-20 bg-blue-400/20 rounded-full blur-[60px] -z-10"></div>
        <div className="absolute w-80 h-80 -bottom-20 -left-20 bg-blue-600/10 rounded-full blur-[60px] -z-10"></div>

        {/* Main Content with Slide Animation */}
        <div className="flex-grow flex flex-col items-center justify-center px-8 pt-12 relative z-10 overflow-hidden">
          <div 
            key={currentSlide}
            className="w-full flex flex-col items-center animate-fadeIn"
          >
            {/* Illustration Container */}
            <div className="relative w-full aspect-square max-w-[300px] mb-8">
              {currentSlideData.image ? (
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative shadow-2xl">
                  <Image 
                    src={currentSlideData.image}
                    alt="Professional Services" 
                    fill
                    className={`object-cover ${
                      currentSlideData.image === '/13e6106cc0ae82be3e759fe363823f4c.png' || 
                      currentSlideData.image === '/c50062e91bbb4bee55ddb16f75e9cc51.png' ||
                      currentSlideData.image === '/c97f8aceee0a5ebe4eb33fe028f2f739.png'
                        ? 'scale-[1.3]' 
                        : 'scale-110'
                    }`}
                    priority
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/20 via-transparent to-transparent pointer-events-none"></div>
                </div>
              ) : (
                <div 
                  className="w-full h-full rounded-[2.5rem] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center shadow-2xl"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentSlideData.color}15, ${currentSlideData.color}30)` 
                  }}
                >
                  <Icon 
                    icon={currentSlideData.icon!} 
                    className="text-9xl"
                    style={{ color: currentSlideData.color }}
                  />
                </div>
              )}
            </div>

            {/* Text Content */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight font-[family-name:var(--font-lateef)]">
                {currentSlideData.title} <br/>
                <span style={{ color: currentSlideData.color || '#2563EB' }}>
                  {currentSlideData.highlight}
                </span> <br/>
                {currentSlideData.subtitle}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-base px-4 leading-relaxed font-[family-name:var(--font-lateef)]">
                {currentSlideData.description}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="px-8 pb-12 pt-6 space-y-6">
          {/* Progress Dots */}
          <div className="flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentSlide ? 'left' : 'right');
                  setCurrentSlide(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-8 bg-[#2563EB]' 
                    : 'w-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          {currentSlide === slides.length - 1 ? (
            // Get Started Button (Last Slide)
            <>
              <button 
                onClick={handleGetStarted}
                disabled={isLoading}
                className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-[family-name:var(--font-lateef)]"
              >
                {isLoading ? (
                  <>
                    <Icon icon="svg-spinners:ring-resize" className="text-xl" />
                    چاوەڕێبە...
                  </>
                ) : (
                  <>
                    دەستپێبکە
                    <Icon icon="material-symbols:arrow-back-rounded" className="text-xl" />
                  </>
                )}
              </button>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-[family-name:var(--font-lateef)]">
                  پێشتر هەژمارت هەیە؟{' '}
                  <button 
                    onClick={handleLogin}
                    className="text-[#2563EB] font-bold hover:underline ml-1"
                  >
                    چوونەژوورەوە
                  </button>
                </p>
              </div>
            </>
          ) : (
            // Next/Previous Buttons (Other Slides)
            <div className="flex gap-3">
              {currentSlide > 0 && (
                <button
                  onClick={handlePrev}
                  className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-5 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 font-[family-name:var(--font-lateef)]"
                >
                  <Icon icon="material-symbols:arrow-forward-rounded" className="text-xl" />
                  پێشتر
                </button>
              )}
              <button
                onClick={handleNext}
                className={`${currentSlide > 0 ? 'flex-1' : 'w-full'} bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center justify-center gap-2 font-[family-name:var(--font-lateef)]`}
              >
                دواتر
                <Icon icon="material-symbols:arrow-back-rounded" className="text-xl" />
              </button>
            </div>
          )}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
