import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(request: NextRequest) {
  try {
    const offersSnapshot = await adminDb
      .collection('offers')
      .where('isActive', '==', true)
      .get();

    const offers = offersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      success: true,
      offers,
    });
  } catch (error) {
    console.error('Error fetching offers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch offers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, discount, serviceType, daysLeft, gradient, icon } = body;

    if (!title || !description || !discount) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const offerData = {
      title,
      description,
      discount,
      serviceType: serviceType || 'all',
      daysLeft: daysLeft || 7,
      gradient: gradient || 'from-purple-600 via-blue-600 to-indigo-600',
      icon: icon || 'solar:tag-price-bold',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const docRef = await adminDb.collection('offers').add(offerData);

    return NextResponse.json({
      success: true,
      offer: {
        id: docRef.id,
        ...offerData,
      },
    });
  } catch (error) {
    console.error('Error creating offer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create offer' },
      { status: 500 }
    );
  }
}
