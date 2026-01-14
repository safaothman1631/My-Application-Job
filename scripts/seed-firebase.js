// Seed Firebase Firestore with test data
const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('../../backend/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const seedData = async () => {
  console.log('🌱 Starting Firebase seed...');

  try {
    // Clear existing data (optional)
    console.log('🗑️  Clearing old data...');
    
    // 1. Create Categories
    console.log('📁 Creating categories...');
    const categories = [
      { id: 'electrician', name: 'کارەبا', nameEn: 'Electrician', icon: '⚡', serviceCount: 0 },
      { id: 'plumber', name: 'پایپ', nameEn: 'Plumber', icon: '🔧', serviceCount: 0 },
      { id: 'carpenter', name: 'دارتاش', nameEn: 'Carpenter', icon: '🪚', serviceCount: 0 },
      { id: 'painter', name: 'بۆیاخچی', nameEn: 'Painter', icon: '🎨', serviceCount: 0 },
      { id: 'cleaner', name: 'پاککەرەوە', nameEn: 'Cleaner', icon: '🧹', serviceCount: 0 },
      { id: 'other', name: 'هیتر', nameEn: 'Other', icon: '🔨', serviceCount: 0 },
    ];

    for (const category of categories) {
      await db.collection('categories').doc(category.id).set(category);
    }

    // 2. Create Users (Customers & Providers)
    console.log('👥 Creating users...');
    const users = [
      // Customers
      {
        id: 'customer1',
        email: 'customer1@bazari.com',
        fullName: 'ئاکام محمد',
        role: 'customer',
        phone: '+9647501234567',
        profileImage: null,
        location: { lat: 36.1911, lng: 44.0092, address: 'سلێمانی، شەقامی سالم' },
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'customer2',
        email: 'customer2@bazari.com',
        fullName: 'سارا احمد',
        role: 'customer',
        phone: '+9647509876543',
        profileImage: null,
        location: { lat: 36.1856, lng: 44.0025, address: 'سلێمانی، گەڕەکی بەختیار' },
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'customer3',
        email: 'customer3@bazari.com',
        fullName: 'کاروان حسین',
        role: 'customer',
        phone: '+9647502345678',
        profileImage: null,
        location: { lat: 36.1950, lng: 44.0150, address: 'سلێمانی، ماڵپەڕی سەرچنار' },
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },

      // Providers
      {
        id: 'provider1',
        email: 'provider1@bazari.com',
        fullName: 'عەلی کەریم - کارەبای پیشەیی',
        role: 'provider',
        phone: '+9647701234567',
        profileImage: null,
        location: { lat: 36.1920, lng: 44.0100, address: 'سلێمانی، گەڕەکی کانی قوتابخانە' },
        verified: true,
        rating: 4.8,
        completedJobs: 127,
        responseTime: 15, // minutes
        joinedDate: admin.firestore.FieldValue.serverTimestamp(),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'provider2',
        email: 'provider2@bazari.com',
        fullName: 'محمد رەشید - پایپچی پسپۆڕ',
        role: 'provider',
        phone: '+9647709876543',
        profileImage: null,
        location: { lat: 36.1880, lng: 44.0080, address: 'سلێمانی، شەقامی مەولەوی' },
        verified: true,
        rating: 4.9,
        completedJobs: 94,
        responseTime: 20,
        joinedDate: admin.firestore.FieldValue.serverTimestamp(),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'provider3',
        email: 'provider3@bazari.com',
        fullName: 'سامان فەرهاد - دارتاشی شارەزا',
        role: 'provider',
        phone: '+9647702345678',
        profileImage: null,
        location: { lat: 36.1905, lng: 44.0120, address: 'سلێمانی، تەلارانی' },
        verified: true,
        rating: 4.7,
        completedJobs: 76,
        responseTime: 25,
        joinedDate: admin.firestore.FieldValue.serverTimestamp(),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'provider4',
        email: 'provider4@bazari.com',
        fullName: 'ڕێبەر ئەحمەد - بۆیاخچی',
        role: 'provider',
        phone: '+9647703456789',
        profileImage: null,
        location: { lat: 36.1870, lng: 44.0060, address: 'سلێمانی، باخی ئازادی' },
        verified: false,
        rating: 4.5,
        completedJobs: 45,
        responseTime: 30,
        joinedDate: admin.firestore.FieldValue.serverTimestamp(),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'provider5',
        email: 'provider5@bazari.com',
        fullName: 'دلێر حەمە - پاککەرەوە',
        role: 'provider',
        phone: '+9647704567890',
        profileImage: null,
        location: { lat: 36.1890, lng: 44.0110, address: 'سلێمانی، شەقامی مامۆستا' },
        verified: true,
        rating: 4.6,
        completedJobs: 112,
        responseTime: 18,
        joinedDate: admin.firestore.FieldValue.serverTimestamp(),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
    ];

    for (const user of users) {
      await db.collection('users').doc(user.id).set(user);
    }

    // 3. Create Services
    console.log('🛠️  Creating services...');
    const services = [
      {
        id: 'service1',
        providerId: 'provider1',
        providerName: 'عەلی کەریم - کارەبای پیشەیی',
        title: 'چاککردنەوەی کێشەکانی کارەبا',
        description: 'چاککردنەوەی هەموو جۆرە کێشەیەکی کارەبا لە ماڵەوە، دامەزراندنی لایت، سویچ، پڕایز، بریکەر، و هیتر',
        category: 'electrician',
        categoryName: 'کارەبا',
        price: 25000,
        priceType: 'hourly',
        rating: 4.8,
        reviewCount: 34,
        location: { lat: 36.1920, lng: 44.0100, address: 'سلێمانی، گەڕەکی کانی قوتابخانە' },
        images: [],
        verified: true,
        available: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'service2',
        providerId: 'provider1',
        providerName: 'عەلی کەریم - کارەبای پیشەیی',
        title: 'دامەزراندنی ئامێری کارەبایی',
        description: 'دامەزراندن و چاککردنەوەی ئەیر کەندیشن، فریج، مەکینە، و هەموو ئامێرێکی کارەبایی',
        category: 'electrician',
        categoryName: 'کارەبا',
        price: 30000,
        priceType: 'hourly',
        rating: 4.9,
        reviewCount: 28,
        location: { lat: 36.1920, lng: 44.0100, address: 'سلێمانی، گەڕەکی کانی قوتابخانە' },
        images: [],
        verified: true,
        available: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'service3',
        providerId: 'provider2',
        providerName: 'محمد رەشید - پایپچی پسپۆڕ',
        title: 'چاککردنەوەی پایپی ئاو',
        description: 'چاککردنەوەی دڵۆپکردن، گۆڕینی پایپی کۆن، دامەزراندنی فلتەر، چاککردنەوەی یاخود گۆڕینی شیرەکان',
        category: 'plumber',
        categoryName: 'پایپ',
        price: 20000,
        priceType: 'hourly',
        rating: 4.9,
        reviewCount: 42,
        location: { lat: 36.1880, lng: 44.0080, address: 'سلێمانی، شەقامی مەولەوی' },
        images: [],
        verified: true,
        available: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'service4',
        providerId: 'provider2',
        providerName: 'محمد رەشید - پایپچی پسپۆڕ',
        title: 'خزمەتگوزاری حەمام و مەتبەخ',
        description: 'دامەزراندن و چاککردنەوەی سینک، کۆمۆد، شاوەر، بۆیلەر، دەستشۆر، و هەموو ئامێرەکانی حەمام و مەتبەخ',
        category: 'plumber',
        categoryName: 'پایپ',
        price: 25000,
        priceType: 'hourly',
        rating: 4.8,
        reviewCount: 36,
        location: { lat: 36.1880, lng: 44.0080, address: 'سلێمانی، شەقامی مەولەوی' },
        images: [],
        verified: true,
        available: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'service5',
        providerId: 'provider3',
        providerName: 'سامان فەرهاد - دارتاشی شارەزا',
        title: 'دروستکردنی دەرگا و پەنجەرە',
        description: 'دروستکردن و دامەزراندنی دەرگای دار و ئەڵومینیۆم، پەنجەرە، کابینەت، و هەموو کارێکی دارتاشی',
        category: 'carpenter',
        categoryName: 'دارتاش',
        price: 35000,
        priceType: 'project',
        rating: 4.7,
        reviewCount: 25,
        location: { lat: 36.1905, lng: 44.0120, address: 'سلێمانی، تەلارانی' },
        images: [],
        verified: true,
        available: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'service6',
        providerId: 'provider3',
        providerName: 'سامان فەرهاد - دارتاشی شارەزا',
        title: 'دروستکردنی فەرنیچەر',
        description: 'دروستکردنی مێز، کورسی، رەف، کابینەت، و هەموو جۆرە فەرنیچەرێک بە داواکاری',
        category: 'carpenter',
        categoryName: 'دارتاش',
        price: 50000,
        priceType: 'project',
        rating: 4.8,
        reviewCount: 19,
        location: { lat: 36.1905, lng: 44.0120, address: 'سلێمانی، تەلارانی' },
        images: [],
        verified: true,
        available: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'service7',
        providerId: 'provider4',
        providerName: 'ڕێبەر ئەحمەد - بۆیاخچی',
        title: 'رەنگکردنی ناوماڵ',
        description: 'رەنگکردنی دیوار و سقف بە کوالیتی بەرز، کارێکی خاوێن و پاک، گەرەنتی کوالیتی',
        category: 'painter',
        categoryName: 'بۆیاخچی',
        price: 15000,
        priceType: 'hourly',
        rating: 4.5,
        reviewCount: 18,
        location: { lat: 36.1870, lng: 44.0060, address: 'سلێمانی، باخی ئازادی' },
        images: [],
        verified: false,
        available: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'service8',
        providerId: 'provider4',
        providerName: 'ڕێبەر ئەحمەد - بۆیاخچی',
        title: 'رەنگکردنی دەرەوەی بینا',
        description: 'رەنگکردنی فاساد بە رەنگی بەرزە کوالیتی، دژی کەش و هەوا، گەرەنتی ١ ساڵ',
        category: 'painter',
        categoryName: 'بۆیاخچی',
        price: 20000,
        priceType: 'hourly',
        rating: 4.6,
        reviewCount: 14,
        location: { lat: 36.1870, lng: 44.0060, address: 'سلێمانی، باخی ئازادی' },
        images: [],
        verified: false,
        available: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'service9',
        providerId: 'provider5',
        providerName: 'دلێر حەمە - پاککەرەوە',
        title: 'پاککردنەوەی ماڵ',
        description: 'پاککردنەوەی تەواوی ماڵ، ژوور، حەمام، مەتبەخ، پەنجەرە، بە ئامێری نوێ',
        category: 'cleaner',
        categoryName: 'پاککەرەوە',
        price: 30000,
        priceType: 'project',
        rating: 4.6,
        reviewCount: 38,
        location: { lat: 36.1890, lng: 44.0110, address: 'سلێمانی، شەقامی مامۆستا' },
        images: [],
        verified: true,
        available: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'service10',
        providerId: 'provider5',
        providerName: 'دلێر حەمە - پاککەرەوە',
        title: 'پاککردنەوەی نەشیمەن',
        description: 'پاککردنەوەی نەشیمەن، فەرش، مۆبل، بە ئامێری تایبەت و مادەی پاککەرەوەی کوالیتی',
        category: 'cleaner',
        categoryName: 'پاککەرەوە',
        price: 40000,
        priceType: 'project',
        rating: 4.7,
        reviewCount: 29,
        location: { lat: 36.1890, lng: 44.0110, address: 'سلێمانی، شەقامی مامۆستا' },
        images: [],
        verified: true,
        available: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
    ];

    for (const service of services) {
      await db.collection('services').doc(service.id).set(service);
    }

    // Update category counts
    await db.collection('categories').doc('electrician').update({ serviceCount: 2 });
    await db.collection('categories').doc('plumber').update({ serviceCount: 2 });
    await db.collection('categories').doc('carpenter').update({ serviceCount: 2 });
    await db.collection('categories').doc('painter').update({ serviceCount: 2 });
    await db.collection('categories').doc('cleaner').update({ serviceCount: 2 });

    // 4. Create Bookings
    console.log('📅 Creating bookings...');
    const bookings = [
      {
        id: 'booking1',
        customerId: 'customer1',
        customerName: 'ئاکام محمد',
        customerPhone: '+9647501234567',
        providerId: 'provider1',
        providerName: 'عەلی کەریم - کارەبای پیشەیی',
        serviceId: 'service1',
        serviceTitle: 'چاککردنەوەی کێشەکانی کارەبا',
        date: '2026-01-15',
        time: '10:00',
        address: 'سلێمانی، شەقامی سالم، بینای ١٢، نهۆمی ٣',
        notes: 'لایتی ناوهۆڵ ناکارە، تکایە ئامێری تایبەت بهێنە',
        price: 50000,
        commission: 7500, // 15%
        totalPrice: 57500,
        status: 'pending',
        paymentStatus: 'escrow',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'booking2',
        customerId: 'customer2',
        customerName: 'سارا احمد',
        customerPhone: '+9647509876543',
        providerId: 'provider2',
        providerName: 'محمد رەشید - پایپچی پسپۆڕ',
        serviceId: 'service3',
        serviceTitle: 'چاککردنەوەی پایپی ئاو',
        date: '2026-01-14',
        time: '14:00',
        address: 'سلێمانی، گەڕەکی بەختیار، ماڵی کۆنە',
        notes: 'پایپی حەمام دڵۆپ دەکات',
        price: 40000,
        commission: 6000,
        totalPrice: 46000,
        status: 'accepted',
        paymentStatus: 'escrow',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'booking3',
        customerId: 'customer3',
        customerName: 'کاروان حسین',
        customerPhone: '+9647502345678',
        providerId: 'provider3',
        providerName: 'سامان فەرهاد - دارتاشی شارەزا',
        serviceId: 'service5',
        serviceTitle: 'دروستکردنی دەرگا و پەنجەرە',
        date: '2026-01-12',
        time: '09:00',
        address: 'سلێمانی، ماڵپەڕی سەرچنار',
        notes: 'دەرگای ناوماڵ دەوێت',
        price: 350000,
        commission: 52500,
        totalPrice: 402500,
        status: 'completed',
        paymentStatus: 'released',
        completedAt: admin.firestore.FieldValue.serverTimestamp(),
        createdAt: admin.firestore.Timestamp.fromDate(new Date('2026-01-10')),
      },
      {
        id: 'booking4',
        customerId: 'customer1',
        customerName: 'ئاکام محمد',
        customerPhone: '+9647501234567',
        providerId: 'provider5',
        providerName: 'دلێر حەمە - پاککەرەوە',
        serviceId: 'service9',
        serviceTitle: 'پاککردنەوەی ماڵ',
        date: '2026-01-13',
        time: '08:00',
        address: 'سلێمانی، شەقامی سالم، بینای ١٢، نهۆمی ٣',
        notes: 'ماڵی ٣ ژوور',
        price: 90000,
        commission: 13500,
        totalPrice: 103500,
        status: 'completed',
        paymentStatus: 'released',
        completedAt: admin.firestore.FieldValue.serverTimestamp(),
        createdAt: admin.firestore.Timestamp.fromDate(new Date('2026-01-11')),
      },
      {
        id: 'booking5',
        customerId: 'customer2',
        customerName: 'سارا احمد',
        customerPhone: '+9647509876543',
        providerId: 'provider4',
        providerName: 'ڕێبەر ئەحمەد - بۆیاخچی',
        serviceId: 'service7',
        serviceTitle: 'رەنگکردنی ناوماڵ',
        date: '2026-01-16',
        time: '11:00',
        address: 'سلێمانی، گەڕەکی بەختیار، ماڵی کۆنە',
        notes: 'دوو ژوور دەوێت رەنگ بکرێن',
        price: 120000,
        commission: 18000,
        totalPrice: 138000,
        status: 'pending',
        paymentStatus: 'escrow',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
    ];

    for (const booking of bookings) {
      await db.collection('bookings').doc(booking.id).set(booking);
    }

    // 5. Create Reviews
    console.log('⭐ Creating reviews...');
    const reviews = [
      {
        id: 'review1',
        bookingId: 'booking3',
        customerId: 'customer3',
        customerName: 'کاروان حسین',
        providerId: 'provider3',
        serviceId: 'service5',
        rating: 5,
        comment: 'کارێکی زۆر باش، کەسێکی پسپۆڕ و دڵسۆز، بە کوالیتی زۆر بەرز کاری کرد، زۆر سوپاس',
        createdAt: admin.firestore.Timestamp.fromDate(new Date('2026-01-12')),
      },
      {
        id: 'review2',
        bookingId: 'booking4',
        customerId: 'customer1',
        customerName: 'ئاکام محمد',
        providerId: 'provider5',
        serviceId: 'service9',
        rating: 5,
        comment: 'ماڵەکەم وەک ئاوێنە بووە، زۆر پاک و خاوێن، خزمەتگوزاری نایاب 👌',
        createdAt: admin.firestore.Timestamp.fromDate(new Date('2026-01-13')),
      },
    ];

    for (const review of reviews) {
      await db.collection('reviews').doc(review.id).set(review);
    }

    // 6. Create Messages
    console.log('💬 Creating messages...');
    const messages = [
      {
        id: 'msg1',
        bookingId: 'booking1',
        senderId: 'customer1',
        senderName: 'ئاکام محمد',
        receiverId: 'provider1',
        receiverName: 'عەلی کەریم',
        content: 'سڵاو، کەی دەتوانی بێیت؟',
        read: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'msg2',
        bookingId: 'booking1',
        senderId: 'provider1',
        senderName: 'عەلی کەریم',
        receiverId: 'customer1',
        receiverName: 'ئاکام محمد',
        content: 'سڵاو، سبەینێ کاتژمێر ١٠ باشە؟',
        read: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'msg3',
        bookingId: 'booking1',
        senderId: 'customer1',
        senderName: 'ئاکام محمد',
        receiverId: 'provider1',
        receiverName: 'عەلی کەریم',
        content: 'بەڵێ زۆر باشە، چاوەڕوانت دەبم',
        read: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'msg4',
        bookingId: 'booking2',
        senderId: 'customer2',
        senderName: 'سارا احمد',
        receiverId: 'provider2',
        receiverName: 'محمد رەشید',
        content: 'کێشەکە زۆر قورسە؟',
        read: true,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'msg5',
        bookingId: 'booking2',
        senderId: 'provider2',
        senderName: 'محمد رەشید',
        receiverId: 'customer2',
        receiverName: 'سارا احمد',
        content: 'نەخێر کێشەیەکی ئاسایە، زوو چاک دەبێتەوە',
        read: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
    ];

    for (const message of messages) {
      await db.collection('messages').doc(message.id).set(message);
    }

    // 7. Create Notifications
    console.log('🔔 Creating notifications...');
    const notifications = [
      {
        id: 'notif1',
        userId: 'customer1',
        type: 'booking',
        title: 'داواکاری نوێ',
        message: 'داواکاریەکەت بۆ خزمەتگوزاری "چاککردنەوەی کێشەکانی کارەبا" بە سەرکەوتوویی نێردرا',
        read: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'notif2',
        userId: 'provider1',
        type: 'booking',
        title: 'داواکاری نوێ',
        message: 'داواکاریەکی نوێت هەیە لە ئاکام محمد',
        read: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      {
        id: 'notif3',
        userId: 'customer2',
        type: 'booking',
        title: 'داواکاری قبوڵ کرا',
        message: 'محمد رەشید داواکاریەکەتی قبوڵ کرد',
        read: true,
        createdAt: admin.firestore.Timestamp.fromDate(new Date('2026-01-14')),
      },
      {
        id: 'notif4',
        userId: 'customer3',
        type: 'review',
        message: 'تکایە هەڵسەنگاندنێک بۆ خزمەتگوزاری "دروستکردنی دەرگا و پەنجەرە" بنووسە',
        read: true,
        title: 'هەڵسەنگاندن',
        createdAt: admin.firestore.Timestamp.fromDate(new Date('2026-01-12')),
      },
      {
        id: 'notif5',
        userId: 'provider5',
        type: 'review',
        title: 'هەڵسەنگاندنی نوێ',
        message: 'ئاکام محمد ٥ ئەستێرەی پێدایت',
        read: false,
        createdAt: admin.firestore.Timestamp.fromDate(new Date('2026-01-13')),
      },
      {
        id: 'notif6',
        userId: 'customer1',
        type: 'message',
        title: 'نامەی نوێ',
        message: 'عەلی کەریم نامەیەکی بۆ ناردیت',
        read: false,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
    ];

    for (const notification of notifications) {
      await db.collection('notifications').doc(notification.id).set(notification);
    }

    console.log('✅ Seed completed successfully!');
    console.log('');
    console.log('📊 Summary:');
    console.log(`   - Categories: ${categories.length}`);
    console.log(`   - Users: ${users.length} (${users.filter(u => u.role === 'customer').length} customers, ${users.filter(u => u.role === 'provider').length} providers)`);
    console.log(`   - Services: ${services.length}`);
    console.log(`   - Bookings: ${bookings.length}`);
    console.log(`   - Reviews: ${reviews.length}`);
    console.log(`   - Messages: ${messages.length}`);
    console.log(`   - Notifications: ${notifications.length}`);
    console.log('');
    console.log('🔐 Test Accounts:');
    console.log('   Customers:');
    console.log('   - customer1@bazari.com (password: 123456)');
    console.log('   - customer2@bazari.com (password: 123456)');
    console.log('   - customer3@bazari.com (password: 123456)');
    console.log('   Providers:');
    console.log('   - provider1@bazari.com (password: 123456)');
    console.log('   - provider2@bazari.com (password: 123456)');
    console.log('   - provider3@bazari.com (password: 123456)');
    console.log('   - provider4@bazari.com (password: 123456)');
    console.log('   - provider5@bazari.com (password: 123456)');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seedData();
