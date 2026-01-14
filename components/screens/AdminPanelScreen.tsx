'use client';

export function AdminPanelScreen() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-[#1e293b] text-white">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👑</span>
              <span className="font-bold">Admin</span>
            </div>
            
            {/* Tabs */}
            <div className="flex gap-6">
              <button className="px-4 py-2 bg-white/10 rounded-lg font-medium">
                Users
              </button>
              <button className="px-4 py-2 hover:bg-white/5 rounded-lg">
                Providers
              </button>
              <button className="px-4 py-2 hover:bg-white/5 rounded-lg">
                Orders
              </button>
              <button className="px-4 py-2 hover:bg-white/5 rounded-lg">
                Disputes
              </button>
              <button className="px-4 py-2 hover:bg-white/5 rounded-lg">
                Reports
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button className="relative">
              <span className="text-xl">🔔</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                5
              </span>
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
          </div>
        </div>

        {/* Sub Tabs */}
        <div className="px-4 pb-4 flex items-center gap-4">
          <button className="px-4 py-2 bg-[#2563EB] text-white rounded-lg text-sm font-medium flex items-center gap-2">
            <span>👥</span>
            <span>Member</span>
          </button>
          <button className="px-4 py-2 text-white/70 hover:text-white text-sm">
            Paymenteer
          </button>
          <button className="px-4 py-2 text-white/70 hover:text-white text-sm flex items-center gap-2">
            <span>🏢</span>
            <span>Insse</span>
          </button>
          <button className="ml-auto text-white/70">
            <span className="text-xl">⋯</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Service Requests */}
          <div className="col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">
                  Service Requests <span className="text-sm text-gray-500">Pending Approval</span>
                </h2>
                <button className="text-[#2563EB] text-sm font-medium hover:underline">
                  View Details →
                </button>
              </div>

              {/* Request Cards */}
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Ali S.</h3>
                    <p className="text-sm text-gray-600">Electrician</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">2 min ago</p>
                  </div>
                  <button className="text-[#2563EB] text-sm font-medium hover:underline">
                    View Details →
                  </button>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Sarah K.</h3>
                    <p className="text-sm text-gray-600">Cleaner</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">5 min ago</p>
                  </div>
                  <button className="text-[#2563EB] text-sm font-medium hover:underline">
                    View Details →
                  </button>
                </div>
              </div>
            </div>

            {/* Reports Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Reports</h2>
                <button className="text-[#2563EB] text-sm font-medium hover:underline">
                  →
                </button>
              </div>

              {/* Report Icons */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-blue-100 rounded-2xl p-6 flex items-center justify-center">
                  <span className="text-4xl">📊</span>
                </div>
                <div className="bg-yellow-100 rounded-2xl p-6 flex items-center justify-center">
                  <span className="text-4xl">📈</span>
                </div>
                <div className="bg-gray-100 rounded-2xl p-6 flex items-center justify-center">
                  <span className="text-4xl">📄</span>
                </div>
                <div className="bg-blue-200 rounded-2xl p-6 flex items-center justify-center">
                  <span className="text-4xl">🏢</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Reports Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Reports</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">$4,520</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Open Disputes</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-gray-900">5</p>
                    <span className="text-xl">→</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Illustration */}
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6 h-48 flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl">🌳</span>
                <p className="text-sm text-green-800 mt-2">Growing Platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
