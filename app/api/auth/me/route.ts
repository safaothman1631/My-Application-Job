import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth-middleware';
import { firestoreService } from '@/lib/firestore';

export async function GET(req: NextRequest) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult; // Unauthorized
  }

  const { user } = authResult;

  try {
    const userData: any = await firestoreService.findById('users', user.uid);

    if (!userData) {
      return NextResponse.json(
        { error: 'بەکارهێنەر نەدۆزرایەوە - User not found' },
        { status: 404 }
      );
    }

    // Remove sensitive data
    delete userData.password;

    return NextResponse.json(
      {
        user: {
          id: userData.id,
          email: userData.email,
          fullName: userData.fullName,
          role: userData.role,
          phoneNumber: userData.phoneNumber,
          profileImage: userData.profileImage,
          isVerified: userData.isVerified,
          isActive: userData.isActive,
          createdAt: userData.createdAt,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get me error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to get user', details: error.message },
      { status: 500 }
    );
  }
}
