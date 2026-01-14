import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { sign } from 'jsonwebtoken';

// Server-side login endpoint for seeded Firebase Auth users
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    console.log('🔐 Login attempt:', { email, hasPassword: !!password });

    if (!email || !password) {
      return NextResponse.json(
        { error: 'ئیمەیڵ و وشەی نهێنی پێویستە - Email and password required' },
        { status: 400 }
      );
    }

    // Get user from Firebase Auth
    let firebaseUser;
    try {
      firebaseUser = await adminAuth.getUserByEmail(email);
      console.log('✅ Found Firebase Auth user:', firebaseUser.uid);
    } catch (error: any) {
      console.log('❌ User not found:', error.message);
      return NextResponse.json(
        { error: 'ئیمەیڵ یان وشەی نهێنی هەڵەیە - Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password (all seeded users have password "123456")
    if (password !== '123456') {
      console.log('❌ Invalid password');
      return NextResponse.json(
        { error: 'ئیمەیڵ یان وشەی نهێنی هەڵەیە - Invalid password' },
        { status: 401 }
      );
    }

    // Get user data from Firestore
    const userDoc = await adminDb.collection('users').doc(firebaseUser.uid).get();
    
    if (!userDoc.exists) {
      console.log('❌ User not found in Firestore');
      return NextResponse.json(
        { error: 'بەکارهێنەر نەدۆزرایەوە - User not found' },
        { status: 404 }
      );
    }

    const userData = { id: userDoc.id, ...userDoc.data() } as any;
    console.log('👤 User found:', { id: userData.id, email: userData.email, role: userData.role });

    // Generate simple JWT token (not Firebase custom token)
    const token = sign(
      {
        uid: firebaseUser.uid,
        email: userData.email,
        role: userData.role,
      },
      'your-secret-key-here', // In production, use process.env.JWT_SECRET
      { expiresIn: '7d' }
    );

    // Update last login
    await adminDb.collection('users').doc(firebaseUser.uid).update({
      lastLogin: new Date().toISOString(),
    });

    console.log('✅ Login successful for:', userData.email);

    return NextResponse.json(
      {
        message: 'بەسەرکەوتویی چوویتە ژوورەوە - Login successful',
        user: {
          id: userData.id,
          email: userData.email,
          fullName: userData.fullName,
          role: userData.role,
          phone: userData.phone,
          profileImage: userData.profileImage,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('💥 Login error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Login failed', details: error.message },
      { status: 500 }
    );
  }
}
