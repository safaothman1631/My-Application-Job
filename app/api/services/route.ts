import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET() {
  try {
    const servicesRef = adminDb.collection('services');
    const snapshot = await servicesRef.get();

    if (snapshot.empty) {
      const defaultServices = [
        { id: 'electrician', name: 'کارەبا', icon: 'solar:bolt-bold', color: 'from-amber-400 to-orange-500' },
        { id: 'plumber', name: 'مۆتەری ئاو', icon: 'solar:water-sun-bold', color: 'from-blue-400 to-blue-600' },
        { id: 'cleaner', name: 'پاککردنەوە', icon: 'solar:broom-bold', color: 'from-green-400 to-emerald-600' },
        { id: 'mechanic', name: 'میکانیک', icon: 'solar:settings-bold', color: 'from-red-400 to-rose-600' },
        { id: 'painter', name: 'رەنگکار', icon: 'solar:palette-2-bold', color: 'from-purple-400 to-purple-600' },
        { id: 'carpenter', name: 'دارتاشی', icon: 'solar:hammer-bold', color: 'from-yellow-600 to-amber-700' },
        { id: 'gardener', name: 'باخەوان', icon: 'solar:leaf-bold', color: 'from-lime-400 to-green-600' },
        { id: 'ac', name: 'ئێیر کۆن', icon: 'solar:wind-bold', color: 'from-cyan-400 to-blue-500' },
        { id: 'more', name: 'زیاتر', icon: 'solar:widget-5-bold', color: 'from-slate-400 to-slate-600' },
      ];

      for (const service of defaultServices) {
        await servicesRef.doc(service.id).set({
          ...service,
          createdAt: new Date().toISOString(),
        });
      }

      return NextResponse.json({ success: true, services: defaultServices });
    }

    const services = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, services });
  } catch (error: any) {
    console.error('Get services error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get services', details: error.message },
      { status: 500 }
    );
  }
}
