import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = 'bazari-secret-key-2026';

export interface JWTPayload {
  uid: string;
  email: string;
  role: string;
  fullName?: string;
}

export interface AuthenticatedRequest extends NextRequest {
  user?: JWTPayload;
}

export async function authenticate(req: NextRequest): Promise<{ user: JWTPayload } | NextResponse> {
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'توکێنی دەسەڵات نییە - Unauthorized' },
      { status: 401 }
    );
  }
  
  const token = authHeader.split('Bearer ')[1];
  
  try {
    const decoded = verify(token, JWT_SECRET) as JWTPayload;
    
    if (!decoded.uid || !decoded.email || !decoded.role) {
      return NextResponse.json(
        { error: 'توکێنی نادروستە - Invalid token' },
        { status: 401 }
      );
    }
    
    return { user: decoded };
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'توکێنی نادروستە یان بەسەرچووە - Invalid or expired token' },
      { status: 401 }
    );
  }
}

export function requireRole(user: JWTPayload, allowedRoles: string[]): NextResponse | null {
  if (!allowedRoles.includes(user.role)) {
    return NextResponse.json(
      { error: 'دەسەڵاتت نییە - Forbidden' },
      { status: 403 }
    );
  }
  return null;
}
