import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const serviceId = searchParams.get('serviceId');

    const providersRef = adminDb.collection('providers');
    let query: any = providersRef;

    if (serviceId) {
      query = query.where('serviceId', '==', serviceId);
    }

    const snapshot = await query.limit(limit).get();

    if (snapshot.empty) {
      const defaultProviders = [
        {
          id: 'provider1',
          name: 'ئەحمەد حەسەن',
          profession: 'کارەبای شارەزا',
          rating: 4.8,
          reviews: 127,
          distance: '2.5',
          price: 25000,
          image: '/login-avatar.jpeg',
          verified: true,
          serviceId: 'electrician',
        },
        {
          id: 'provider2',
          name: 'فاتیما عەلی',
          profession: 'مۆتەری ئاو',
          rating: 4.9,
          reviews: 89,
          distance: '1.8',
          price: 30000,
          image: '/login-avatar.jpeg',
          verified: true,
          serviceId: 'plumber',
        },
        {
          id: 'provider3',
          name: 'محەممەد رەشید',
          profession: 'خزمەتی پاککردنەوە',
          rating: 4.7,
          reviews: 156,
          distance: '3.2',
          price: 20000,
          image: '/login-avatar.jpeg',
          verified: false,
          serviceId: 'cleaner',
        },
      ];

      for (const provider of defaultProviders) {
        await providersRef.doc(provider.id).set({
          ...provider,
          createdAt: new Date().toISOString(),
        });
      }

      const filtered = serviceId 
        ? defaultProviders.filter(p => p.serviceId === serviceId)
        : defaultProviders;

      return NextResponse.json({ success: true, providers: filtered });
    }

    const providers = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, providers });
  } catch (error: any) {
    console.error('Get providers error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get providers', details: error.message },
      { status: 500 }
    );
  }
}
