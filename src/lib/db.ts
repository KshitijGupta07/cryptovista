// lib/db.ts
import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

export default connectDB;
