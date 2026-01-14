// Success Animation Component (Using CSS instead of Lottie for simplicity)

'use client';

import { useEffect, useState } from 'react';

interface SuccessAnimationProps {
  show: boolean;
  message?: string;
  onComplete?: () => void;
}

export function SuccessAnimation({ show, message = 'سەرکەوتوو بوو!', onComplete }: SuccessAnimationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center animate-fadeIn">
      <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-3xl p-8 shadow-2xl border border-white/20 text-center max-w-sm transform animate-bounce-in">
        <div className="text-8xl mb-4 animate-scale">🎉</div>
        <h2 className="text-3xl font-bold text-white mb-2">{message}</h2>
        <p className="text-white/80">داواکاریەکەت بەسەرکەوتویی تۆمارکرا</p>
        
        <div className="mt-6 flex justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-white/30 border-t-white animate-spin"></div>
        </div>
      </div>
    </div>
  );
}

// Add these animations to your globals.css:
/*
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes bounce-in {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes scale {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-bounce-in {
  animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.animate-scale {
  animation: scale 1s ease-in-out infinite;
}
*/
