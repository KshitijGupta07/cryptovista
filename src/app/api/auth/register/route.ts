// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    await connectDB();

    const existing = await User.findOne({ username });
    if (existing) return NextResponse.json({ message: 'User already exists' }, { status: 400 });

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashed });

    return NextResponse.json({ message: 'Registered successfully' }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
