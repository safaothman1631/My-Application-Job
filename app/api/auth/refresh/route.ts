import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth-middleware';
import { signJWT } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;

  try {
    // Generate new token with same payload
    const newToken = await signJWT({
      uid: user.uid,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json(
      {
        message: 'توکێن نوێکرایەوە - Token refreshed',
        token: newToken,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Refresh token error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to refresh token', details: error.message },
      { status: 500 }
    );
  }
}
