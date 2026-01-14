import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import admin from 'firebase-admin';
import jwt from 'jsonwebtoken';

// Initialize Firebase Admin
if (!admin.apps.length) {
  const serviceAccount = require('../../../../serviceAccountKey.json');
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'bazari-app-1f2a7.firebasestorage.app'
  });
}

const client = new OAuth2Client(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/google/callback`
);

export async function POST(request: NextRequest) {
  try {
    const { credential } = await request.json();

    if (!credential) {
      return NextResponse.json(
        { success: false, error: 'هیچ زانیاریەک نەهاتووە' },
        { status: 400 }
      );
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    
    if (!payload || !payload.email) {
      return NextResponse.json(
        { success: false, error: 'زانیاری گووگڵ نادروستە' },
        { status: 400 }
      );
    }

    const { email, name, picture, sub: googleId } = payload;

    // Get Firestore database
    const db = admin.firestore();

    // Check if user exists
    const usersRef = db.collection('users');
    const existingUser = await usersRef.where('email', '==', email).limit(1).get();

    let userData;

    if (!existingUser.empty) {
      // User exists, update last login
      const userDoc = existingUser.docs[0];
      userData = userDoc.data();
      
      await userDoc.ref.update({
        lastLogin: admin.firestore.FieldValue.serverTimestamp(),
        googleId: googleId,
        profilePicture: picture || userData.profilePicture,
      });

      userData = {
        ...userData,
        id: userDoc.id,
      };
    } else {
      // Create new user
      const newUser = {
        email,
        fullName: name || email.split('@')[0],
        profilePicture: picture || '',
        googleId,
        phone: '',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        lastLogin: admin.firestore.FieldValue.serverTimestamp(),
        role: 'user',
        isEmailVerified: true, // Google accounts are pre-verified
      };

      const docRef = await usersRef.add(newUser);
      
      userData = {
        ...newUser,
        id: docRef.id,
      };
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const token = jwt.sign(
      { 
        userId: userData.id,
        email: userData.email,
        role: userData.role 
      },
      jwtSecret,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: userData.id,
        email: userData.email,
        fullName: userData.fullName,
        profilePicture: userData.profilePicture,
        role: userData.role,
      },
    });

  } catch (error: any) {
    console.error('Google auth error:', error);
    return NextResponse.json(
      { success: false, error: 'هەڵەیەک ڕوویدا لە چوونەژوورەوە بە گووگڵ' },
      { status: 500 }
    );
  }
}
