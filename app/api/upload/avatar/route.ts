import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/auth-middleware';
import { adminStorage } from '@/lib/firebase-admin';
import { v4 as uuidv4 } from 'uuid';

// POST upload avatar image
export async function POST(req: NextRequest) {
  const authResult = await authenticate(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'فایل پێویستە - File required' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'تەنها وێنە قبووڵە - Only images allowed' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'قەبارەی فایل زۆر گەورەیە - File size too large (max 5MB)' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `avatars/${user.uid}-${uuidv4()}.${file.name.split('.').pop()}`;

    const bucket = adminStorage.bucket();
    const fileUpload = bucket.file(fileName);

    await fileUpload.save(buffer, {
      metadata: {
        contentType: file.type,
      },
    });

    await fileUpload.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    return NextResponse.json(
      {
        message: 'وێنە بەسەرکەوتویی بارکرا - Image uploaded successfully',
        url: publicUrl,
        fileName,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Upload avatar error:', error);
    return NextResponse.json(
      { error: 'هەڵەیەک ڕوویدا - Failed to upload image', details: error.message },
      { status: 500 }
    );
  }
}
