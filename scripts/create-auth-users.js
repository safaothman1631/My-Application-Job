// Create Firebase Auth users
const admin = require('firebase-admin');

const serviceAccount = require('../../backend/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const createUsers = async () => {
  console.log('👥 Creating Firebase Auth users...');

  const users = [
    // Customers
    { uid: 'customer1', email: 'customer1@bazari.com', password: '123456', displayName: 'ئاکام محمد' },
    { uid: 'customer2', email: 'customer2@bazari.com', password: '123456', displayName: 'سارا احمد' },
    { uid: 'customer3', email: 'customer3@bazari.com', password: '123456', displayName: 'کاروان حسین' },
    
    // Providers
    { uid: 'provider1', email: 'provider1@bazari.com', password: '123456', displayName: 'عەلی کەریم - کارەبای پیشەیی' },
    { uid: 'provider2', email: 'provider2@bazari.com', password: '123456', displayName: 'محمد رەشید - پایپچی پسپۆڕ' },
    { uid: 'provider3', email: 'provider3@bazari.com', password: '123456', displayName: 'سامان فەرهاد - دارتاشی شارەزا' },
    { uid: 'provider4', email: 'provider4@bazari.com', password: '123456', displayName: 'ڕێبەر ئەحمەد - بۆیاخچی' },
    { uid: 'provider5', email: 'provider5@bazari.com', password: '123456', displayName: 'دلێر حەمە - پاککەرەوە' },
  ];

  try {
    for (const user of users) {
      try {
        // Check if user exists
        try {
          await admin.auth().getUser(user.uid);
          console.log(`✓ User ${user.email} already exists`);
        } catch (error) {
          // User doesn't exist, create it
          await admin.auth().createUser({
            uid: user.uid,
            email: user.email,
            password: user.password,
            displayName: user.displayName,
            emailVerified: true,
          });
          console.log(`✓ Created user: ${user.email}`);
        }
      } catch (error) {
        console.error(`✗ Failed to create ${user.email}:`, error.message);
      }
    }

    console.log('');
    console.log('✅ All users created successfully!');
    console.log('');
    console.log('🔐 Login credentials:');
    console.log('   Email: customer1@bazari.com | Password: 123456');
    console.log('   Email: customer2@bazari.com | Password: 123456');
    console.log('   Email: customer3@bazari.com | Password: 123456');
    console.log('   Email: provider1@bazari.com | Password: 123456');
    console.log('   Email: provider2@bazari.com | Password: 123456');
    console.log('   Email: provider3@bazari.com | Password: 123456');
    console.log('   Email: provider4@bazari.com | Password: 123456');
    console.log('   Email: provider5@bazari.com | Password: 123456');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

createUsers();
