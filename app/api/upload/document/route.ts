import { NextRequest, NextResponse } from 'next/server';
import { authenticate, requireRole } from '@/lib/auth-middleware';
import { adminStorage } from '@/lib/firebase-admin';
import { v4 as uuidv4 } from 'uuid';

// POST upload document (for provider verification)
export async function POST(req: NextRequest) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;
  
  const roleCheck = requireRole(user, ['provider', 'admin']);
  if (roleCheck) return roleCheck;

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'فایل پێویستە - File required' },
        { status: 400 }
      );
    }

    // Validate file type (images and PDFs)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'تەنها وێنە و PDF قبووڵە - Only images and PDF allowed' },
        { status: 400 }
      );
    }

    // Validate file size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'قەبارەی فایل زۆر گەورەیە - File size too large (max 15MB)' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `documents/${user.uid}-${uuidv4()}.${file.name.split('.').pop()}`;

    const bucket = adminStorage.bucket();
    const fileUpload = bucket.file(fileName);

    await fileUpload.save(buffer, {
      metadata: {
        contentType: file.type,
      },
    });

    // Documents are not made public - require authentication to access
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    return NextResponse.json(
      {
        message: 'بەڵگەنامە بەسەرکەوتویی بارکرا - Document uploaded successfully',
        url: publicUrl,
        fileName,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Upload document error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to upload document', details: error.message },
      { status: 500 }
    );
  }
}
