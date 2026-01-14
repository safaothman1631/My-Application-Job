import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { sign } from 'jsonwebtoken';

const JWT_SECRET = 'bazari-secret-key-2026';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    console.log('🔐 داواکاری چوونەژوورەوە:', email);

    if (!email || !password) {
      return NextResponse.json(
        { error: 'ئیمەیڵ و وشەی نهێنی پێویستە' },
        { status: 400 }
      );
    }

    // دۆزینەوەی بەکارهێنەر لە Firebase Auth
    let firebaseUser;
    try {
      firebaseUser = await adminAuth.getUserByEmail(email);
    } catch (error) {
      console.log('❌ بەکارهێنەر نەدۆزرایەوە');
      return NextResponse.json(
        { error: 'ئیمەیڵ یان وشەی نهێنی هەڵەیە' },
        { status: 401 }
      );
    }

    // پشکنینی وشەی نهێنی (هەموو بەکارهێنەرانی تاقیکردنەوە وشەی نهێنییان 123456 یە)
    if (password !== '123456') {
      return NextResponse.json(
        { error: 'وشەی نهێنی هەڵەیە' },
        { status: 401 }
      );
    }

    // وەرگرتنی زانیاری بەکارهێنەر لە Firestore
    const userDoc = await adminDb.collection('users').doc(firebaseUser.uid).get();
    
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'بەکارهێنەر نەدۆزرایەوە' },
        { status: 404 }
      );
    }

    const userData = { id: userDoc.id, ...userDoc.data() } as any;

    // دروستکردنی JWT token
    const token = sign(
      {
        uid: firebaseUser.uid,
        email: userData.email,
        role: userData.role,
        fullName: userData.fullName,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('✅ سەرکەوتوو:', userData.email, '- ڕۆڵ:', userData.role);

    return NextResponse.json({
      message: 'بەسەرکەوتوویی چوویتە ژوورەوە',
      user: {
        id: userData.id,
        email: userData.email,
        fullName: userData.fullName,
        role: userData.role,
        phone: userData.phone,
      },
      token,
    });
  } catch (error: any) {
    console.error('💥 هەڵە:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا', details: error.message },
      { status: 500 }
    );
  }
}
