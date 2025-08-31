import { NextRequest, NextResponse } from 'next/server';
import { auth as clerkAuth } from '@clerk/nextjs/server';
import { connectToDatabase } from '@/lib/mongodb';
import { CreateClientRecordSchema } from '@/types/client-record';

interface CustomSessionClaims extends Record<string, unknown> {
  o?: {
    rol?: "admin" | "member";
  };
}

export async function GET() {
  try {
    const { userId } = await clerkAuth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const records = await db.collection('client_records').find({}).toArray();
    
    return NextResponse.json(records.map(record => ({
      ...record,
      _id: record._id.toString(),
    })));
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, sessionClaims } = await clerkAuth();
    const customSessionClaims = sessionClaims as CustomSessionClaims;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (customSessionClaims?.o?.rol !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Not an admin' }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = CreateClientRecordSchema.parse(body);

    const { db } = await connectToDatabase();
    const result = await db.collection('client_records').insertOne({
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ 
      _id: result.insertedId.toString(),
      ...validatedData 
    }, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}