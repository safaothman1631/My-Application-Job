'use client';

import { useState } from 'react';
import { TERMS_AND_CONDITIONS_KU, PRIVACY_POLICY_KU, DISCLAIMER_KU } from '@/lib/legal-content';

interface LegalModalProps {
  type: 'terms' | 'privacy' | 'disclaimer' | null;
  onClose: () => void;
}

export function LegalModal({ type, onClose }: LegalModalProps) {
  if (!type) return null;

  const content = {
    terms: { title: 'مەرجەکان و ڕێکارەکان', text: TERMS_AND_CONDITIONS_KU },
    privacy: { title: 'سیاسەتی تایبەتێتی', text: PRIVACY_POLICY_KU },
    disclaimer: { title: 'دووبەرەکی', text: DISCLAIMER_KU },
  };

  const { title, text } = content[type];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="bg-gradient-to-br from-blue-900 via-teal-900 to-cyan-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 px-6 py-4 flex items-center justify-between sticky top-0">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-red-500/20 hover:bg-red-500/40 rounded-xl flex items-center justify-center text-white text-xl transition-all duration-300"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/20">
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-white/90 font-sans text-sm md:text-base leading-relaxed">
                  {text}
                </pre>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={onClose}
                className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
              >
                تێگەیشتم ✓
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LegalFooter({ onLegalClick }: { onLegalClick: (type: 'terms' | 'privacy' | 'disclaimer') => void }) {
  return (
    <div className="text-center mt-8 text-white/50 text-sm space-y-2">
      <p>© 2026 بەزاری - هەموو مافێک پارێزراوە 💙</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => onLegalClick('terms')}
          className="hover:text-teal-400 transition-colors underline"
        >
          مەرجەکان
        </button>
        <button
          onClick={() => onLegalClick('privacy')}
          className="hover:text-teal-400 transition-colors underline"
        >
          تایبەتێتی
        </button>
        <button
          onClick={() => onLegalClick('disclaimer')}
          className="hover:text-teal-400 transition-colors underline"
        >
          دووبەرەکی
        </button>
      </div>
    </div>
  );
}
