import { adminDb } from '../lib/firebase-admin';

async function resetServices() {
  try {
    console.log('Deleting old services...');
    const servicesRef = adminDb.collection('services');
    const snapshot = await servicesRef.get();
    
    const batch = adminDb.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    console.log('Old services deleted!');
    console.log('New services will be created on next API call.');
  } catch (error) {
    console.error('Error:', error);
  }
  process.exit(0);
}

resetServices();
