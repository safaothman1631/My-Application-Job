import { NextRequest, NextResponse } from 'next/server';
import { authenticate, requireRole } from '@/lib/auth-middleware';
import { firestoreService } from '@/lib/firestore';
import { FieldValue } from '@/lib/firebase-admin';

// Anti-Fraud Detection System

interface FraudFlag {
  userId: string;
  type: 'fake_review' | 'cancel_abuse' | 'refund_abuse' | 'pattern_suspicious';
  severity: 'low' | 'medium' | 'high';
  description: string;
  evidence: any;
}

// POST Flag user for fraud
export async function POST(req: NextRequest) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;
  
  const roleCheck = requireRole(user, ['admin']);
  if (roleCheck) return roleCheck;

  try {
    const body = await req.json();
    const { userId, type, severity, description, evidence } = body;

    if (!userId || !type || !severity) {
      return NextResponse.json(
        { error: 'زانیاری پێویست نییە - Required fields missing' },
        { status: 400 }
      );
    }

    // Create fraud flag
    const flag = await firestoreService.create('fraudFlags', {
      userId,
      type,
      severity,
      description: description || '',
      evidence: evidence || {},
      flaggedBy: user.uid,
      flaggedAt: FieldValue.serverTimestamp(),
      resolved: false,
    });

    // Update user's fraud score
    const targetUser = await firestoreService.findById('users', userId);
    if (targetUser) {
      const currentScore = targetUser.fraudScore || 0;
      const severityPoints = { low: 10, medium: 25, high: 50 };
      const newScore = currentScore + severityPoints[severity];

      await firestoreService.update('users', userId, {
        fraudScore: newScore,
        isSuspicious: newScore >= 50,
        isBanned: newScore >= 100,
      });

      // If banned, cancel all pending bookings
      if (newScore >= 100) {
        const bookings = await firestoreService.findAll('bookings', [
          { field: targetUser.role === 'provider' ? 'providerId' : 'customerId', operator: '==', value: userId },
          { field: 'status', operator: 'in', value: ['pending', 'confirmed'] }
        ], { limit: 100 });

        for (const booking of bookings.data || []) {
          await firestoreService.update('bookings', booking.id, {
            status: 'cancelled',
            cancelReason: 'بەهۆی چالاکی گوماناوی - Account banned for suspicious activity',
          });
        }
      }
    }

    return NextResponse.json(
      {
        message: 'بەکارهێنەر نیشانەکرا - User flagged successfully',
        flag,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Flag user error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to flag user', details: error.message },
      { status: 500 }
    );
  }
}

// GET Check fraud patterns (automated detection)
export async function GET(req: NextRequest) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;
  
  const roleCheck = requireRole(user, ['admin']);
  if (roleCheck) return roleCheck;

  try {
    const suspiciousPatterns = [];

    // 1. Detect fake reviews (same user reviewing same provider multiple times)
    const reviews = await firestoreService.findAll('reviews', [], { limit: 10000 });
    const reviewCounts: Record<string, Record<string, number>> = {};
    
    for (const review of reviews.data || []) {
      const key = `${review.customerId}-${review.providerId}`;
      reviewCounts[key] = (reviewCounts[key] || 0) + 1;
      
      if (reviewCounts[key] > 2) {
        suspiciousPatterns.push({
          type: 'fake_review',
          userId: review.customerId,
          evidence: { reviewCount: reviewCounts[key], providerId: review.providerId },
        });
      }
    }

    // 2. Detect cancellation abuse (high cancellation rate)
    const bookings = await firestoreService.findAll('bookings', [], { limit: 10000 });
    const userBookings: Record<string, { total: number; cancelled: number }> = {};
    
    for (const booking of bookings.data || []) {
      const userId = booking.customerId;
      if (!userBookings[userId]) {
        userBookings[userId] = { total: 0, cancelled: 0 };
      }
      userBookings[userId].total++;
      if (booking.status === 'cancelled') {
        userBookings[userId].cancelled++;
      }
    }

    for (const [userId, stats] of Object.entries(userBookings)) {
      const cancelRate = stats.total > 0 ? (stats.cancelled / stats.total) * 100 : 0;
      if (stats.total >= 5 && cancelRate > 50) {
        suspiciousPatterns.push({
          type: 'cancel_abuse',
          userId,
          evidence: { ...stats, cancelRate: Math.round(cancelRate) },
        });
      }
    }

    // 3. Detect refund abuse (multiple refund requests)
    // This would check payment records for refunds
    // Placeholder for now

    return NextResponse.json({
      suspiciousPatterns,
      totalFlags: suspiciousPatterns.length,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Fraud detection error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to detect fraud', details: error.message },
      { status: 500 }
    );
  }
}
