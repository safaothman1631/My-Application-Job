import { adminDb } from '../lib/firebase-admin';

async function addSampleOffers() {
  const offers = [
    {
      title: 'داشکاندنی گەورە',
      description: 'بۆ یەکەم جار کارت بە خزمەتی پاککردنەوە دەکەیت',
      discount: '٢٥٪',
      serviceType: 'پاککردنەوە',
      daysLeft: 5,
      gradient: 'from-purple-600 via-blue-600 to-indigo-600',
      icon: 'solar:tag-price-bold',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      title: 'ئۆفەری تایبەت',
      description: 'خزمەتی چاککردنەوەی کارەبا بە نرخێکی نزم',
      discount: '٣٠٪',
      serviceType: 'کارەبا',
      daysLeft: 3,
      gradient: 'from-orange-500 via-red-500 to-pink-600',
      icon: 'solar:bolt-circle-bold',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      title: 'پێشکەشکراوی مانگانە',
      description: 'خزمەتی چاککردنەوەی ئاو لەگەڵ داشکاندنی تایبەت',
      discount: '٢٠٪',
      serviceType: 'مۆمباری',
      daysLeft: 7,
      gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
      icon: 'solar:water-sun-bold',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  console.log('Adding sample offers to Firestore...');

  for (const offer of offers) {
    const docRef = await adminDb.collection('offers').add(offer);
    console.log(`✓ Added offer: ${offer.title} (ID: ${docRef.id})`);
  }

  console.log('✓ All sample offers added successfully!');
}

addSampleOffers()
  .then(() => {
    console.log('Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });
