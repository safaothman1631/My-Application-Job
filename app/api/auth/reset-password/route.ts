import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth-middleware';
import { adminAuth } from '@/lib/firebase-admin';
import { firestoreService } from '@/lib/firestore';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;

  try {
    const body = await req.json();
    const { oldPassword, newPassword } = body;

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { error: 'وشەی نهێنی کۆن و نوێ پێویستە - Old and new password required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'وشەی نهێنی نوێ دەبێت لانیکەم ٦ پیت بێت - New password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Get user from Firestore
    const userData: any = await firestoreService.findById('users', user.uid);

    if (!userData) {
      return NextResponse.json(
        { error: 'بەکارهێنەر نەدۆزرایەوە - User not found' },
        { status: 404 }
      );
    }

    // Verify old password
    const isOldPasswordValid = await bcrypt.compare(oldPassword, userData.password);

    if (!isOldPasswordValid) {
      return NextResponse.json(
        { error: 'وشەی نهێنی کۆن هەڵەیە - Old password is incorrect' },
        { status: 401 }
      );
    }

    // Update password in Firebase Auth
    await adminAuth.updateUser(user.uid, {
      password: newPassword,
    });

    // Hash and update password in Firestore
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await firestoreService.update('users', user.uid, {
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: 'وشەی نهێنی بەسەرکەوتویی گۆڕدرا - Password changed successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to reset password', details: error.message },
      { status: 500 }
    );
  }
}
