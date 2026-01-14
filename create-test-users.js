const admin = require('firebase-admin');
const bcrypt = require('bcrypt');

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'bazari-app-1f2a7.firebasestorage.app'
  });
}

const db = admin.firestore();

async function createUser(email, password, fullName, role) {
  try {
    console.log(`\n🔄 دروستکردنی ${role}: ${email}...`);
    
    // Check if user already exists in Firestore
    const existingUser = await db.collection('users')
      .where('email', '==', email)
      .limit(1)
      .get();
    
    if (!existingUser.empty) {
      console.log(`⚠️  بەکارهێنەر پێشتر دروستکراوە!`);
      return;
    }
    
    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: fullName,
    });
    
    console.log(`✅ Firebase Auth UID: ${userRecord.uid}`);
    
    // Hash password for Firestore
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user document in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      id: userRecord.uid,
      email: email,
      password: hashedPassword,
      fullName: fullName,
      role: role,
      phoneNumber: null,
      profileImage: null,
      isActive: true,
      emailVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    
    console.log(`✅ بەسەرکەوتوویی دروستکرا لە Firestore!`);
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log(`👤 Role: ${role}`);
    
  } catch (error) {
    console.error(`❌ هەڵە: ${error.message}`);
  }
}

async function createAllUsers() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 دروستکردنی بەکارهێنەران بۆ تاقیکردنەوە');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Create customer
  await createUser(
    'customer@bazari.com',
    '123456',
    'Customer Test',
    'customer'
  );
  
  // Create provider
  await createUser(
    'provider@bazari.com',
    '123456',
    'Provider Test',
    'provider'
  );
  
  // Create another customer
  await createUser(
    'sara@bazari.com',
    '123456',
    'سارا محمد',
    'customer'
  );
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ تەواو بوو!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  console.log('📋 لیستی بەکارهێنەران:\n');
  console.log('1️⃣  Admin:');
  console.log('   Email: admin@bazari.com');
  console.log('   Password: admin123\n');
  
  console.log('2️⃣  Customer:');
  console.log('   Email: customer@bazari.com');
  console.log('   Password: 123456\n');
  
  console.log('3️⃣  Provider:');
  console.log('   Email: provider@bazari.com');
  console.log('   Password: 123456\n');
  
  console.log('4️⃣  Customer (کوردی):');
  console.log('   Email: sara@bazari.com');
  console.log('   Password: 123456\n');
  
  process.exit(0);
}

createAllUsers();
