import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, address, type, icon, color } = body;

    if (!name || !address) {
      return NextResponse.json(
        { success: false, error: 'Name and address required' },
        { status: 400 }
      );
    }

    const locationRef = adminDb.collection('locations').doc(id);
    await locationRef.update({
      name,
      address,
      type: type || 'other',
      icon: icon || 'solar:map-point-bold',
      color: color || 'blue',
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Update location error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update location', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const locationRef = adminDb.collection('locations').doc(id);
    await locationRef.delete();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete location error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete location', details: error.message },
      { status: 500 }
    );
  }
}
