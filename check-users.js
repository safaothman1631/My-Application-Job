const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'bazari-app-1f2a7.firebasestorage.app'
});

const db = admin.firestore();

async function listAllUsers() {
  try {
    console.log('\n📋 بینینی هەموو بەکارهێنەران لە Firestore:\n');
    
    const usersSnapshot = await db.collection('users').get();
    
    if (usersSnapshot.empty) {
      console.log('❌ هیچ بەکارهێنەرێک نییە لە دیتابەیس!');
      return;
    }
    
    console.log(`✅ ${usersSnapshot.size} بەکارهێنەر دۆزرایەوە:\n`);
    
    usersSnapshot.forEach((doc) => {
      const user = doc.data();
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`👤 ناو: ${user.fullName}`);
      console.log(`📧 ئیمەیڵ: ${user.email}`);
      console.log(`🔑 رۆڵ: ${user.role}`);
      console.log(`🆔 ID: ${doc.id}`);
      console.log(`✅ Active: ${user.isActive}`);
      console.log(`📅 دروستکراوە: ${user.createdAt}`);
      console.log(`🔐 پاسوۆرد هاش: ${user.password ? user.password.substring(0, 30) + '...' : 'نییە'}`);
      console.log('');
    });
    
    // Also list Firebase Auth users
    console.log('\n📋 بینینی هەموو بەکارهێنەران لە Firebase Auth:\n');
    const listUsersResult = await admin.auth().listUsers(1000);
    
    console.log(`✅ ${listUsersResult.users.length} بەکارهێنەر لە Firebase Auth:\n`);
    
    listUsersResult.users.forEach((userRecord) => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`📧 ئیمەیڵ: ${userRecord.email}`);
      console.log(`🆔 UID: ${userRecord.uid}`);
      console.log(`✅ Verified: ${userRecord.emailVerified}`);
      console.log(`📅 دروستکراوە: ${userRecord.metadata.creationTime}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ هەڵە:', error.message);
  }
  
  process.exit(0);
}

listAllUsers();
