import { NextRequest, NextResponse } from 'next/server';
import { authenticate, requireRole } from '@/lib/auth-middleware';
import { firestoreService } from '@/lib/firestore';

// GET single category
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const category = await firestoreService.findById('categories', id);

    if (!category) {
      return NextResponse.json(
        { error: 'پۆل نەدۆزرایەوە - Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ category }, { status: 200 });
  } catch (error: any) {
    console.error('Get category error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to get category', details: error.message },
      { status: 500 }
    );
  }
}

// PUT update category (Admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;
  
  const roleCheck = requireRole(user, ['admin']);
  if (roleCheck) return roleCheck;

  try {
    const { id } = await params;
    const body = await req.json();

    // Check if category exists
    const existingCategory = await firestoreService.findById('categories', id);
    if (!existingCategory) {
      return NextResponse.json(
        { error: 'پۆل نەدۆزرایەوە - Category not found' },
        { status: 404 }
      );
    }

    const updatedCategory = await firestoreService.update('categories', id, body);

    return NextResponse.json(
      {
        message: 'پۆل بەسەرکەوتویی نوێکرایەوە - Category updated successfully',
        category: updatedCategory,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update category error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to update category', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE category (Admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;
  
  const roleCheck = requireRole(user, ['admin']);
  if (roleCheck) return roleCheck;

  try {
    const { id } = await params;

    // Check if category exists
    const existingCategory = await firestoreService.findById('categories', id);
    if (!existingCategory) {
      return NextResponse.json(
        { error: 'پۆل نەدۆزرایەوە - Category not found' },
        { status: 404 }
      );
    }

    // Soft delete - just mark as inactive
    await firestoreService.update('categories', id, { isActive: false });

    return NextResponse.json(
      {
        message: 'پۆل بەسەرکەوتویی سڕایەوە - Category deleted successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete category error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to delete category', details: error.message },
      { status: 500 }
    );
  }
}
