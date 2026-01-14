import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID required' },
        { status: 400 }
      );
    }

    const locationsRef = adminDb.collection('locations');
    const snapshot = await locationsRef.where('userId', '==', userId).get();

    const locations = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, locations });
  } catch (error: any) {
    console.error('Get locations error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get locations', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, name, address, type, icon, color, coordinates, isPrimary } = body;

    if (!userId || !name || !address) {
      return NextResponse.json(
        { success: false, error: 'Required fields missing' },
        { status: 400 }
      );
    }

    const locationData = {
      userId,
      name,
      address,
      type: type || 'other',
      icon: icon || 'solar:map-point-bold',
      color: color || 'blue',
      coordinates: coordinates || null,
      isPrimary: isPrimary || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const locationsRef = adminDb.collection('locations');
    const docRef = await locationsRef.add(locationData);

    return NextResponse.json({ 
      success: true, 
      location: { id: docRef.id, ...locationData }
    });
  } catch (error: any) {
    console.error('Create location error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create location', details: error.message },
      { status: 500 }
    );
  }
}
