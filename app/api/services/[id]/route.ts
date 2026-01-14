import { NextRequest, NextResponse } from 'next/server';
import { authenticate, requireRole } from '@/lib/auth-middleware';
import { firestoreService } from '@/lib/firestore';
import { adminDb, increment } from '@/lib/firebase-admin';

// GET single service
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const service = await firestoreService.findById('services', id);

    if (!service) {
      return NextResponse.json(
        { error: 'خزمەتگوزاری نەدۆزرایەوە - Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ service }, { status: 200 });
  } catch (error: any) {
    console.error('Get service error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to get service', details: error.message },
      { status: 500 }
    );
  }
}

// PUT update service (Provider owner or Admin)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;

  try {
    const { id } = await params;
    const body = await req.json();

    // Check if service exists
    const service: any = await firestoreService.findById('services', id);
    if (!service) {
      return NextResponse.json(
        { error: 'خزمەتگوزاری نەدۆزرایەوە - Service not found' },
        { status: 404 }
      );
    }

    // Check ownership or admin
    if (service.providerId !== user.uid && user.role !== 'admin') {
      return NextResponse.json(
        { error: 'دەسەڵاتت نییە - Forbidden' },
        { status: 403 }
      );
    }

    const updatedService = await firestoreService.update('services', id, body);

    return NextResponse.json(
      {
        message: 'خزمەتگوزاری بەسەرکەوتویی نوێکرایەوە - Service updated successfully',
        service: updatedService,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update service error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to update service', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE service (Provider owner or Admin)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;

  try {
    const { id } = await params;

    // Check if service exists
    const service: any = await firestoreService.findById('services', id);
    if (!service) {
      return NextResponse.json(
        { error: 'خزمەتگوزاری نەدۆزرایەوە - Service not found' },
        { status: 404 }
      );
    }

    // Check ownership or admin
    if (service.providerId !== user.uid && user.role !== 'admin') {
      return NextResponse.json(
        { error: 'دەسەڵاتت نییە - Forbidden' },
        { status: 403 }
      );
    }

    // Soft delete
    await firestoreService.update('services', id, { isActive: false });

    // Decrement category services count
    await adminDb.collection('categories').doc(service.categoryId).update({
      servicesCount: increment(-1)
    });

    return NextResponse.json(
      {
        message: 'خزمەتگوزاری بەسەرکەوتویی سڕایەوە - Service deleted successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete service error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to delete service', details: error.message },
      { status: 500 }
    );
  }
}
