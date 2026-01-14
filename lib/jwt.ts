import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'bazari-secret-key-2026'
);

export interface JWTPayload {
  uid: string;
  email: string;
  role: string;
}

export async function signJWT(payload: JWTPayload, expiresIn: string = '7d'): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 7 * 24 * 60 * 60; // 7 days
  
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(JWT_SECRET);
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    const payload = verified.payload as any;
    
    // Validate required fields
    if (!payload.uid || !payload.email || !payload.role) {
      return null;
    }
    
    return {
      uid: payload.uid,
      email: payload.email,
      role: payload.role,
    };
  } catch (error) {
    return null;
  }
}

export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}
