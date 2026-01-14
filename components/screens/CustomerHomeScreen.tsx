'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';

export function CustomerHomeScreen() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('hasSeenOnboarding');
    window.location.reload();
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const handleNotifications = () => {
    console.log('Opening notifications');
  };

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB] font-sans">
      {/* Mobile Frame Container */}
      <div className="max-w-md mx-auto w-full flex-1 overflow-hidden relative flex flex-col">
        {/* Top Bar */}
        <div className="bg-[#2563EB] pt-12 pb-8 px-6 rounded-b-[2.5rem] shadow-sm relative z-10 flex-shrink-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23F59E0B'/%3E%3Ccircle cx='50' cy='35' r='15' fill='%23FFF'/%3E%3Cpath d='M25 75 Q50 60 75 75 L75 100 L25 100 Z' fill='%23FFF'/%3E%3C/svg%3E"
                  alt="Profile"
                  className="size-12 rounded-full border-2 border-white/20 object-cover"
                />
                <div className="absolute bottom-0 right-0 size-3 bg-green-400 border-2 border-[#2563EB] rounded-full" />
              </div>
              <div>
                <div className="text-white/80 text-xs font-medium mb-0.5">
                  Welcome Back!
                </div>
                <div className="flex items-center gap-1">
                  <h1 className="text-white text-lg font-bold">
                    Safa Othman
                  </h1>
                  <Icon
                    icon="solar:alt-arrow-down-bold"
                    className="text-white/70 size-4"
                  />
                </div>
              </div>
            </div>
            <button 
              onClick={handleNotifications}
              className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Icon icon="solar:bell-bold" className="text-white size-6" />
              <span className="absolute top-2 right-2 size-2.5 bg-red-500 border-2 border-[#2563EB] rounded-full" />
            </button>
          </div>
          <div className="bg-white rounded-2xl flex items-center px-4 py-3.5 shadow-lg shadow-[#2563EB]/10">
            <Icon icon="solar:magnifer-linear" className="text-gray-400 size-6 mr-3" />
            <input
              type="text"
              placeholder="What service do you need?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none"
            />
            <button className="p-1.5 bg-gray-100 rounded-lg">
              <Icon icon="solar:tuning-2-bold" className="text-gray-900 size-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-24 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 text-lg">Categories</h2>
              <button className="text-[#2563EB] text-sm font-medium">See All</button>
            </div>
            <div className="grid grid-cols-3 gap-y-6 gap-x-4">
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="size-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center transition-transform group-active:scale-95 shadow-sm">
                  <Icon icon="solar:lightbulb-bolt-bold" className="size-8" />
                </div>
                <span className="text-xs font-medium text-gray-900 text-center">Electrician</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="size-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center transition-transform group-active:scale-95 shadow-sm">
                  <Icon icon="solar:bath-bold" className="size-8" />
                </div>
                <span className="text-xs font-medium text-gray-900 text-center">Plumber</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="size-16 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center transition-transform group-active:scale-95 shadow-sm">
                  <Icon icon="solar:broom-bold" className="size-8" />
                </div>
                <span className="text-xs font-medium text-gray-900 text-center">Cleaning</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="size-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center transition-transform group-active:scale-95 shadow-sm">
                  <Icon icon="solar:wheel-bold" className="size-8" />
                </div>
                <span className="text-xs font-medium text-gray-900 text-center">Mechanic</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="size-16 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center transition-transform group-active:scale-95 shadow-sm">
                  <Icon icon="solar:paint-roller-bold" className="size-8" />
                </div>
                <span className="text-xs font-medium text-gray-900 text-center">Painting</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="size-16 rounded-2xl bg-gray-100 text-gray-600 flex items-center justify-center transition-transform group-active:scale-95 shadow-sm">
                  <Icon icon="solar:menu-dots-square-bold" className="size-8" />
                </div>
                <span className="text-xs font-medium text-gray-900 text-center">More</span>
              </div>
            </div>
          </section>
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 text-lg">Recommended Pros</h2>
              <button className="text-[#2563EB] text-sm font-medium">View All</button>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200/40 flex items-center gap-4">
                <div className="relative">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Ahmed Kareem"
                    className="size-14 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                    <Icon icon="solar:verified-check-bold" className="text-blue-500 size-4" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 truncate">Ahmed Kareem</h3>
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                      $25/hr
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1.5">Electrician</p>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center text-amber-500 font-bold">
                      <Icon icon="solar:star-bold" className="size-3 mr-1" />
                      4.9
                    </div>
                    <div className="flex items-center">
                      <Icon icon="solar:map-point-bold" className="size-3 mr-1 text-gray-400" />
                      1.2 km
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200/40 flex items-center gap-4">
                <div className="relative">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Fatima Ali"
                    className="size-14 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                    <Icon icon="solar:verified-check-bold" className="text-blue-500 size-4" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 truncate">Fatima Ali</h3>
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                      $18/hr
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1.5">House Cleaner</p>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center text-amber-500 font-bold">
                      <Icon icon="solar:star-bold" className="size-3 mr-1" />
                      4.8
                    </div>
                    <div className="flex items-center">
                      <Icon icon="solar:map-point-bold" className="size-3 mr-1 text-gray-400" />
                      2.4 km
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200/40 flex items-center gap-4">
                <div className="relative">
                  <img
                    src="https://randomuser.me/api/portraits/men/86.jpg"
                    alt="Hassan Jamil"
                    className="size-14 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 truncate">Hassan Jamil</h3>
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                      $30/hr
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1.5">Plumber</p>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center text-amber-500 font-bold">
                      <Icon icon="solar:star-bold" className="size-3 mr-1" />
                      4.7
                    </div>
                    <div className="flex items-center">
                      <Icon icon="solar:map-point-bold" className="size-3 mr-1 text-gray-400" />
                      3.1 km
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#F9FAFB] border-t border-gray-200 px-6 py-3 pb-6 flex justify-between items-center z-50">
          <button className="flex flex-col items-center gap-1 text-[#2563EB]">
            <Icon icon="solar:home-2-bold" className="size-6" />
            <span className="text-[10px] font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#2563EB] transition-colors">
            <Icon icon="solar:calendar-linear" className="size-6" />
            <span className="text-[10px] font-medium">Bookings</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#2563EB] transition-colors">
            <div className="size-10 bg-[#2563EB] rounded-full flex items-center justify-center -mt-6 shadow-lg shadow-[#2563EB]/30 border-4 border-[#F9FAFB]">
              <Icon icon="solar:add-circle-bold" className="size-6 text-white" />
            </div>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#2563EB] transition-colors">
            <Icon icon="solar:chat-round-dots-linear" className="size-6" />
            <span className="text-[10px] font-medium">Inbox</span>
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#2563EB] transition-colors"
            >
              <Icon icon="solar:user-linear" className="size-6" />
              <span className="text-[10px] font-medium">Profile</span>
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setShowProfileMenu(false)}
                ></div>
                
                <div className="absolute bottom-full right-0 mb-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                  <div className="px-4 py-3 bg-gradient-to-r from-[#2563EB] to-blue-600 text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/50">
                        <img 
                          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23F59E0B'/%3E%3Ccircle cx='50' cy='35' r='15' fill='%23FFF'/%3E%3Cpath d='M25 75 Q50 60 75 75 L75 100 L25 100 Z' fill='%23FFF'/%3E%3C/svg%3E"
                          alt="User"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Safa Othman</p>
                        <p className="text-xs opacity-90">Baghdad</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left">
                      <Icon icon="solar:user-bold" className="size-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">My Profile</span>
                    </button>

                    <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left">
                      <Icon icon="solar:settings-bold" className="size-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Settings</span>
                    </button>

                    <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left">
                      <Icon icon="solar:question-circle-bold" className="size-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Help & Support</span>
                    </button>

                    <div className="my-2 border-t border-gray-100"></div>

                    <button 
                      onClick={handleLogout}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition-colors text-left"
                    >
                      <Icon icon="solar:logout-bold" className="size-5 text-red-600" />
                      <span className="text-sm font-semibold text-red-600">Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
