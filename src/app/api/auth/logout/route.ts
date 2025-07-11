// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });

  // ❌ Expire both cookies
  response.cookies.set('user', '', { maxAge: 0 });
  response.cookies.set('userId', '', { maxAge: 0 });

  return response;
}
