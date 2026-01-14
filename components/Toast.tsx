'use client';

import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

let toastCallback: ((toast: ToastProps) => void) | null = null;

export function showToast(message: string, type: ToastProps['type'] = 'info', duration = 3000) {
  if (toastCallback) {
    toastCallback({ message, type, duration });
  }
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<(ToastProps & { id: number })[]>([]);

  useEffect(() => {
    toastCallback = (toast: ToastProps) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { ...toast, id }]);
      
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, toast.duration || 3000);
    };

    return () => {
      toastCallback = null;
    };
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getColor(toast.type)} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-up`}
        >
          <span className="text-2xl">{getIcon(toast.type)}</span>
          <p className="flex-1 font-medium">{toast.message}</p>
          <button
            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
            className="text-white/80 hover:text-white text-xl"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
