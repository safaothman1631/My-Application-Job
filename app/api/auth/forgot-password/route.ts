import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'ئیمەیڵ پێویستە - Email required' },
        { status: 400 }
      );
    }

    // Generate password reset link
    const link = await adminAuth.generatePasswordResetLink(email);

    // In production, you would send this via email
    // For now, return it in response (ONLY FOR DEVELOPMENT)
    return NextResponse.json(
      {
        message: 'لینکی گۆڕینی وشەی نهێنی نێردرا - Password reset link sent',
        // Remove this in production and send via email instead
        resetLink: link,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Forgot password error:', error);
    
    if (error.code === 'auth/user-not-found') {
      return NextResponse.json(
        { error: 'ئەم ئیمەیڵە تۆمار نەکراوە - Email not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to send reset link', details: error.message },
      { status: 500 }
    );
  }
}
