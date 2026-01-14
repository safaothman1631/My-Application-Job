import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  const serviceAccount = require('../serviceAccountKey.json');
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'bazari-app-1f2a7.firebasestorage.app'
  });
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
export const adminStorage = admin.storage();
export const FieldValue = admin.firestore.FieldValue;

// Helper functions
export const getTimestamp = () => admin.firestore.Timestamp.now();
export const increment = (value: number) => admin.firestore.FieldValue.increment(value);
export const deleteField = () => admin.firestore.FieldValue.delete();
