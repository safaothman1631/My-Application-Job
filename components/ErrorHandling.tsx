'use client';

import { useEffect, useState } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setHasError(true);
      setError(new Error(event.message));
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 max-w-md w-full text-center">
          <div className="text-8xl mb-6">❌</div>
          <h1 className="text-3xl font-bold text-white mb-4">هەڵەیەک ڕوویدا!</h1>
          <p className="text-white/70 mb-6">
            {error?.message || 'کێشەیەکی نەخوازراو ڕوویدا'}
          </p>
          <button
            onClick={() => {
              setHasError(false);
              setError(null);
              window.location.reload();
            }}
            className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
          >
            دووبارە هەوڵبدەرەوە 🔄
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

interface RetryButtonProps {
  onRetry: () => void;
  loading?: boolean;
}

export function RetryButton({ onRetry, loading = false }: RetryButtonProps) {
  return (
    <button
      onClick={onRetry}
      disabled={loading}
      className="px-6 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-500 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
    >
      {loading ? (
        <>
          <span className="animate-spin">⏳</span>
          چاوەڕێبە...
        </>
      ) : (
        <>
          <span>🔄</span>
          دووبارە هەوڵبدەرەوە
        </>
      )}
    </button>
  );
}

interface OfflineBannerProps {
  isOnline: boolean;
}

export function OfflineBanner({ isOnline }: OfflineBannerProps) {
  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white py-3 px-4 z-50 text-center font-bold animate-pulse">
      ⚠️ ئینتەرنێت نییە - چاوەڕوانی پەیوەندی...
    </div>
  );
}

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
