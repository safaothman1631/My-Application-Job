'use client';

export function SuccessConfetti() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Confetti particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10%`,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: ['#2563EB', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6'][
                Math.floor(Math.random() * 5)
              ],
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function BookingSuccessScreen({ onGoHome }: { onGoHome: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl"></div>

      <SuccessConfetti />

      <div className="max-w-md w-full text-center relative z-10">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-6xl">✓</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-4xl font-bold text-white mb-4">
          داواکاری پشتڕاست کرایەوە!
        </h1>
        <p className="text-xl text-white/90 mb-8">
          خزمەتگوزارییەکەت کاتخستراوە. پارەدان سەلامەتکراوە.
        </p>

        {/* Details Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/80">خزمەتگوزاری</span>
            <span className="font-semibold">چاککردنەوەی کارەبا</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/80">بەروار</span>
            <span className="font-semibold">١٥ کانوونی دووەم، ٢٠٢٦</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/80">کات</span>
            <span className="font-semibold">١٠:٠٠ سبەینێ</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onGoHome}
          className="w-full bg-green-500 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:bg-green-600 transition-all active:scale-95 text-lg"
        >
          گەڕانەوە بۆ ماڵەوە
        </button>

        {/* Support text */}
        <p className="mt-6 text-white/70 text-sm">
          پەیامێک بۆ پیشەسازەکەت نێردرا
        </p>
      </div>
    </div>
  );
}
