'use client';

interface TrustBadgesProps {
  verified?: boolean;
  guaranteed?: boolean;
  fastResponse?: boolean;
  vip?: boolean;
  trustScore?: number;
}

export function TrustBadges({
  verified = false,
  guaranteed = false,
  fastResponse = false,
  vip = false,
  trustScore = 0,
}: TrustBadgesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {verified && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
          ✓ پشتڕاستکراوە
        </span>
      )}
      
      {guaranteed && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
          🛡️ گارانتیدار
        </span>
      )}
      
      {fastResponse && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
          ⚡ وەڵامی خێرا
        </span>
      )}
      
      {vip && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
          👑 VIP
        </span>
      )}
      
      {trustScore > 0 && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-500 text-white text-xs font-bold rounded-full">
          💯 {trustScore.toFixed(0)}% باوەڕ
        </span>
      )}
    </div>
  );
}

// Trust Score Calculator
export function calculateTrustScore(provider: {
  completedJobs?: number;
  rating?: number;
  verified?: boolean;
  averageResponseTime?: number; // in minutes
}): number {
  const {
    completedJobs = 0,
    rating = 0,
    verified = false,
    averageResponseTime = 999,
  } = provider;

  // Completed Jobs Score (40%)
  const jobsScore = Math.min((completedJobs / 100) * 100, 100) * 0.4;

  // Average Rating Score (30%)
  const ratingScore = (rating / 5) * 100 * 0.3;

  // Verification Score (20%)
  const verificationScore = verified ? 20 : 0;

  // Response Speed Score (10%)
  const speedScore = averageResponseTime < 30 ? 10 : averageResponseTime < 60 ? 7 : averageResponseTime < 120 ? 5 : 2;

  return jobsScore + ratingScore + verificationScore + speedScore;
}
