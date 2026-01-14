'use client';

import { useState } from 'react';

export function BookServiceScreen() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3">
        <button className="text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Book Service</h1>
        <button className="ml-auto text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Step 1: Date & Time */}
        <button className="w-full bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-xl">📅</span>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Select Date & Time</h3>
            </div>
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Step 2: Your Address */}
        <button className="w-full bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-xl">📍</span>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Your Address</h3>
              <p className="text-sm text-gray-500">123 St. Baghdad</p>
            </div>
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Step 3: Issue Details */}
        <button className="w-full bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-xl">📝</span>
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Issue Details</h3>
              <p className="text-sm text-gray-500">Pipe leaking in the kitchen</p>
            </div>
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Cost Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
          <h3 className="font-bold text-gray-900 mb-4">Cost Summary</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Service Fee</span>
              <span className="font-semibold text-gray-900">$30</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-semibold text-gray-900">$2</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-gray-900 text-lg">$32</span>
            </div>
          </div>

          {/* Confirm Button */}
          <button className="w-full bg-[#2563EB] text-white font-semibold py-3.5 rounded-xl hover:bg-[#1d4ed8] transition-all active:scale-98 mt-6 shadow-md">
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  );
}

export function BookingDetailsScreen() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
        <div className="absolute inset-0 bg-[url('/electrician-working.jpg')] bg-cover bg-center opacity-80"></div>
        <div className="absolute top-4 right-4">
          <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <span className="text-white text-xl">ℹ️</span>
          </button>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-sm opacity-90">Your 6 qualification.</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 -mt-6">
        {/* Main Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Book Service</h2>

          {/* Steps */}
          <div className="space-y-3">
            <button className="w-full bg-gray-50 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">📅</span>
                <span className="font-medium text-gray-900">Select Date & Time</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className="w-full bg-gray-50 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">📍</span>
                <span className="font-medium text-gray-900">Your Address</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className="w-full bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-xl">✅</span>
                  <span className="font-medium text-gray-900">Issue Details</span>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            <button className="w-full bg-gray-50 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">🍊</span>
                <span className="font-medium text-gray-900">Desking</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
