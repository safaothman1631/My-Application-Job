import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { firestoreService } from '@/lib/firestore';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, idToken } = body;

    console.log('🔐 Login attempt:', { email, hasPassword: !!password, hasIdToken: !!idToken });

    // Validation
    if (!email || (!password && !idToken)) {
      console.log('❌ Missing email or credentials');
      return NextResponse.json(
        { error: 'ئیمەیڵ و وشەی نهێنی پێویستە' },
        { status: 400 }
      );
    }

    let userId: string;
    let userData: any;

    // If idToken provided (Firebase client-side login), verify it
    if (idToken) {
      try {
        console.log('🔑 Verifying Firebase ID token...');
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        userId = decodedToken.uid;
        console.log('✅ Token verified for UID:', userId);
        
        // Find user in Firestore
        const userDoc = await adminDb.collection('users').doc(userId).get();
        if (!userDoc.exists) {
          return NextResponse.json(
            { error: 'بەکارهێنەر نەدۆزرایەوە' },
            { status: 404 }
          );
        }
        userData = { id: userDoc.id, ...userDoc.data() };
      } catch (error) {
        console.log('❌ Invalid ID token:', error);
        return NextResponse.json(
          { error: 'وشەی نهێنی هەڵەیە' },
          { status: 401 }
        );
      }
    } else if (password) {
      // Password-based login - verify with Firestore
      console.log('🔍 Searching for user by email:', email);
      const usersRef = adminDb.collection('users');
      const querySnapshot = await usersRef.where('email', '==', email).limit(1).get();
      
      if (querySnapshot.empty) {
        console.log('❌ User not found');
        return NextResponse.json(
          { error: 'ئیمەیڵ یان وشەی نهێنی هەڵەیە' },
          { status: 401 }
        );
      }

      const userDoc = querySnapshot.docs[0];
      userData = { id: userDoc.id, ...userDoc.data() };

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, userData.password || '');
      
      if (!isPasswordValid) {
        console.log('❌ Invalid password');
        return NextResponse.json(
          { error: 'ئیمەیڵ یان وشەی نهێنی هەڵەیە' },
          { status: 401 }
        );
      }

      userId = userDoc.id;
      console.log('✅ Password verified for user:', userId);
    } else {
      return NextResponse.json(
        { error: 'ئیمەیڵ و وشەی نهێنی پێویستە' },
        { status: 400 }
      );
    }

    // Check if account is active (if field exists)
    if (userData.hasOwnProperty('isActive') && !userData.isActive) {
      console.log('❌ Account is disabled');
      return NextResponse.json(
        { error: 'هەژمارەکەت لەکارخراوە' },
        { status: 403 }
      );
    }

    console.log('✅ Login successful for user:', userData.email);

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const token = jwt.sign(
      { 
        userId: userData.id,
        email: userData.email,
        role: userData.role || 'user'
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    // Update last login
    await adminDb.collection('users').doc(userId).update({
      lastLogin: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'بەسەرکەوتویی چوویتە ژوورەوە',
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
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Login failed', details: error.message },
      { status: 500 }
    );
  }
}
