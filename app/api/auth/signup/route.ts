import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';
import { firestoreService } from '@/lib/firestore';
import { signJWT } from '@/lib/jwt';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, fullName, role = 'customer' } = body;

    // Validation
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'زانیاری پێویست دابین نەکراوە - Required fields missing' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'وشەی نهێنی دەبێت لانیکەم ٦ پیت بێت - Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await firestoreService.findOne('users', 'email', email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'ئەم ئیمەیڵە پێشتر بەکارهاتووە - Email already in use' },
        { status: 409 }
      );
    }

    // Create Firebase Auth user
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: fullName,
    });

    // Hash password for Firestore (backup)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user document in Firestore
    const userData = await firestoreService.create(
      'users',
      {
        email,
        password: hashedPassword,
        fullName,
        role,
        phoneNumber: body.phoneNumber || null,
        isVerified: false,
        isActive: true,
        profileImage: null,
      },
      userRecord.uid
    );

    // Generate JWT token
    const token = await signJWT({
      uid: userRecord.uid,
      email,
      role,
    });

    return NextResponse.json(
      {
        message: 'بەسەرکەوتویی تۆمارکرا - Registration successful',
        user: {
          id: userRecord.uid,
          email,
          fullName,
          role,
        },
        token,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Registration failed', details: error.message },
      { status: 500 }
    );
  }
}
