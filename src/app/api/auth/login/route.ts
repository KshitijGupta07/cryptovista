// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Connect to MongoDB
    await connectDB();

    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // ✅ Build response and set cookies
    const response = NextResponse.json({ message: 'Login successful' });

    // ✅ Your lines (unchanged)
    response.cookies.set('user', user.username, { httpOnly: true });
    response.cookies.set('userId', String(user._id), { httpOnly: true });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Login failed' }, { status: 500 });
  }
}
