'use client';

interface LoadingSkeletonProps {
  type?: 'card' | 'list' | 'text' | 'full';
  count?: number;
}

export function LoadingSkeleton({ type = 'card', count = 1 }: LoadingSkeletonProps) {
  if (type === 'full') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-teal-900 to-cyan-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6 animate-bounce">⏳</div>
          <p className="text-white text-2xl font-bold">چاوەڕێبە...</p>
          <p className="text-teal-200 text-sm mt-2">داتاکان دەهێنرێتەوە</p>
        </div>
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 animate-pulse">
            <div className="w-16 h-16 bg-white/20 rounded-xl mb-4"></div>
            <div className="h-6 bg-white/20 rounded mb-3"></div>
            <div className="h-4 bg-white/20 rounded mb-2"></div>
            <div className="h-4 bg-white/20 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-4">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl"></div>
              <div className="flex-1">
                <div className="h-5 bg-white/20 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-white/20 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div className="space-y-2 animate-pulse">
        {[...Array(count)].map((_, i) => (
          <div key={i} className="h-4 bg-white/20 rounded w-full"></div>
        ))}
      </div>
    );
  }

  return null;
}
