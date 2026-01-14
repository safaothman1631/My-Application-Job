// Design System - Bazari Color Palette & Styling

export const colors = {
  // Primary Colors
  primary: '#2563EB',      // Blue
  secondary: '#22C55E',    // Green
  accent: '#F59E0B',       // Orange
  
  // Background Colors
  background: '#F9FAFB',   // Light grey
  card: '#FFFFFF',         // White
  
  // Text Colors
  textDark: '#111827',     // Dark grey
  textGrey: '#6B7280',     // Medium grey
  textLight: '#9CA3AF',    // Light grey
  
  // Status Colors
  success: '#22C55E',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#2563EB',
  
  // Category Colors
  electrician: '#EAB308',  // Yellow
  plumber: '#3B82F6',      // Blue
  cleaning: '#8B5CF6',     // Purple
  mechanic: '#EF4444',     // Red
  phoneRepair: '#10B981',  // Green
  more: '#6B7280',         // Grey
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
};

export const borderRadius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
};

export const typography = {
  h1: {
    fontSize: '32px',
    fontWeight: '700',
    lineHeight: '1.2',
  },
  h2: {
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '1.3',
  },
  h3: {
    fontSize: '20px',
    fontWeight: '600',
    lineHeight: '1.4',
  },
  body: {
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '1.5',
  },
  small: {
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '1.5',
  },
  tiny: {
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '1.5',
  },
};

export const animations = {
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'bounce 0.5s ease-in-out',
  fadeIn: 'fadeIn 0.3s ease-in',
  slideUp: 'slideUp 0.3s ease-out',
};

// Tailwind classes helpers
export const cardStyle = 'bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow';
export const buttonPrimary = 'bg-[#2563EB] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-[#1d4ed8] transition-all active:scale-95';
export const buttonSecondary = 'bg-[#22C55E] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-[#16a34a] transition-all active:scale-95';
export const inputStyle = 'w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none transition-all';
export const badgeVerified = 'inline-flex items-center gap-1 bg-[#22C55E] text-white text-xs font-medium px-2 py-1 rounded-full';
export const badgeGuaranteed = 'inline-flex items-center gap-1 bg-[#2563EB] text-white text-xs font-medium px-2 py-1 rounded-full';
