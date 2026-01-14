import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = 'bazari-secret-key-2026';

async function verifyToken(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.split('Bearer ')[1];
    const decoded = verify(token, JWT_SECRET) as any;
    return decoded;
  } catch (error) {
    console.error('هەڵە لە پشکنینی token:', error);
    return null;
  }
}

export async function GET(req: NextRequest) {
  try {
    // Verify authentication
    const decodedToken = await verifyToken(req);
    
    if (!decodedToken) {
      return NextResponse.json(
        { 
          success: false,
          error: 'تکایە بچۆ ژوورەوە - Please login' 
        },
        { status: 401 }
      );
    }

    const userId = decodedToken.uid;

    // Get user to check role
    const userDoc = await adminDb.collection('users').doc(userId).get();
    const userData = userDoc.data();

    if (!userData) {
      return NextResponse.json(
        { success: false, error: 'بەکارهێنەر نەدۆزرایەوە - User not found' },
        { status: 404 }
      );
    }

    // Fetch bookings based on user role
    let query: any = adminDb.collection('bookings');

    if (userData.role === 'customer') {
      query = query.where('customerId', '==', userId);
    } else if (userData.role === 'provider') {
      query = query.where('providerId', '==', userId);
    }

    // Get all bookings (we'll sort client-side to avoid needing Firebase index)
    const bookingsSnapshot = await query.get();
    const bookings = bookingsSnapshot.docs
      .map((doc: any) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          completedAt: data.completedAt?.toDate?.()?.toISOString() || null,
        };
      })
      .sort((a: any, b: any) => {
        // Sort by createdAt descending (newest first)
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

    return NextResponse.json({
      success: true,
      data: bookings,
      total: bookings.length
    });
  } catch (error: any) {
    console.error('Get my bookings error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'هەڵەیەک ڕوویدا - Failed to fetch bookings', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}
