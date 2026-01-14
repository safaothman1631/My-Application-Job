'use client';

interface StatsCardProps {
  icon: string;
  title: string;
  value: string | number;
  color: string;
  change?: string;
}

function StatsCard({ icon, title, value, color, change }: StatsCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: `${color}20` }}
        >
          {icon}
        </div>
        {change && (
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            {change}
          </span>
        )}
      </div>
      <h3 className="text-sm text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

export function ProviderDashboardHome() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              H
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">بەخێربێیتەوە حەسەن!</h1>
              <p className="text-sm text-gray-600">ئەمڕۆ ڕۆژێکی باشە بۆ کارکردن 💪</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatsCard
            icon="💰"
            title="قازانجی ئەمڕۆ"
            value="$120"
            color="#22C55E"
            change="+12%"
          />
          <StatsCard
            icon="📋"
            title="داواکاریی نوێ"
            value="3"
            color="#2563EB"
          />
          <StatsCard
            icon="📅"
            title="خشتەی من"
            value="4"
            color="#F59E0B"
          />
          <StatsCard
            icon="⭐"
            title="هەڵسەنگاندن"
            value="4.8"
            color="#8B5CF6"
          />
        </div>

        {/* Quick Actions */}
        <div className="space-y-3 mb-6">
          <button className="w-full bg-blue-600 text-white font-semibold py-4 rounded-2xl shadow-md hover:bg-blue-700 transition-all active:scale-98 flex items-center justify-center gap-2">
            <span>📋</span>
            <span>بینینی داواکاریەکان</span>
          </button>
          <button className="w-full bg-green-600 text-white font-semibold py-4 rounded-2xl shadow-md hover:bg-green-700 transition-all active:scale-98 flex items-center justify-center gap-2">
            <span>📊</span>
            <span>ڕاپۆرتی قازانج</span>
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">چالاکیی دواییان</h2>
          <div className="space-y-4">
            {[
              { icon: '💵', text: 'پارەدانی $120', time: 'پێش ١٠ خولەک' },
              { icon: '⭐', text: 'هەڵسەنگاندنی نوێ (5 ئەستێرە)', time: 'پێش ١ کاتژمێر' },
              { icon: '📋', text: 'داواکاریی تەواو کرا', time: 'پێش ٢ کاتژمێر' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-3 pb-4 border-b border-gray-100 last:border-0">
                <span className="text-2xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
