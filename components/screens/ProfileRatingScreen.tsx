'use client';

export function ProviderProfileScreen() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3">
        <button className="text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Provider Profile</h1>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-br from-blue-100 to-blue-200 h-32"></div>

      <div className="px-6 -mt-16">
        {/* Avatar & Basic Info */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-24 h-24 -mt-12 bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                A
              </div>
            </div>
            
            <div className="flex-1 pt-2">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold text-gray-900">Ahmed Kareem</h2>
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-blue-500 text-xl">🔵</span>
              </div>
              <p className="text-gray-600 mb-2">Electrician</p>
              
              {/* Badges */}
              <div className="flex gap-2 mb-3">
                <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                  <span>✓</span>
                  <span>Verified</span>
                </span>
                <span className="px-3 py-1 bg-[#2563EB] text-white text-xs font-semibold rounded-full flex items-center gap-1">
                  <span>🛡️</span>
                  <span>Guaranteed</span>
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4].map(i => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                  <span className="text-gray-300 text-lg">⭐</span>
                </div>
                <span className="text-sm text-gray-600">2218</span>
                <button className="ml-auto text-[#2563EB] text-sm font-medium hover:underline">
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-1 text-sm">
            <span className="text-blue-500">🔄</span>
            <span className="font-medium">Regional</span>
          </div>
        </div>

        {/* Review Quote */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <p className="text-gray-700 italic mb-2">"Great service, very professional!"</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mb-6">
          <button className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-blue-500">
            <span className="text-xl">👍</span>
            <span className="absolute -bottom-1 -right-1 bg-white px-1 text-xs font-bold text-gray-900">3</span>
          </button>
          <button className="w-12 h-12 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-blue-500 relative">
            <span className="text-xl">0</span>
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white px-1.5 py-0.5 text-xs font-bold rounded-full">Cotteri</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="bg-white border-2 border-[#2563EB] text-[#2563EB] font-semibold py-3 rounded-xl hover:bg-blue-50 transition-all">
            Chat
          </button>
          <button className="bg-[#2563EB] text-white font-semibold py-3 rounded-xl hover:bg-[#1d4ed8] transition-all shadow-md">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export function PaywallProfileScreen() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <button className="text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Paywall Profile</h1>
        <div className="w-6"></div>
      </div>

      {/* Profile Header Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
        <div className="absolute inset-0 bg-[url('/office-bg.jpg')] bg-cover bg-center opacity-80"></div>
      </div>

      <div className="px-6 -mt-16">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
              ⭐ TrustEdo
            </span>
            <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
              🛡️ Guaranteed
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Services</h2>

          {/* Service Cards */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 relative overflow-hidden">
              <div className="absolute right-4 top-4 text-6xl opacity-20">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-1">Wiring Repair</h3>
              <p className="text-2xl font-bold text-gray-900">$20<span className="text-sm text-gray-600">/hr</span></p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 relative overflow-hidden">
              <div className="absolute right-4 top-4 text-6xl opacity-20">🔌</div>
              <h3 className="font-semibold text-gray-900 mb-1">Socket Installation</h3>
              <p className="text-2xl font-bold text-gray-900">$15<span className="text-sm text-gray-600">/hr</span></p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 relative overflow-hidden">
              <div className="absolute right-4 top-4 text-6xl opacity-20">🔧</div>
              <h3 className="font-semibold text-gray-900 mb-1">Isael Details</h3>
              <p className="text-2xl font-bold text-gray-900">$15<span className="text-sm text-gray-600">/hr</span></p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Reviews</h3>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
              Z
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Zainab H.</h4>
              <p className="text-sm text-gray-600 mb-2">Great service, very professional!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
