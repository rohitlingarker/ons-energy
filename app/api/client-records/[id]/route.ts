import { NextRequest, NextResponse } from 'next/server';
import { auth as clerkAuth } from '@clerk/nextjs/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import { CreateClientRecordSchema } from '@/types/client-record';

interface CustomSessionClaims extends Record<string, unknown> {
  o?: {
    rol?: "admin" | "member";
  };
}

interface RouteContext {
  params: { id: string };
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { userId, sessionClaims } = await clerkAuth();
    const customSessionClaims = sessionClaims as CustomSessionClaims;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (customSessionClaims?.o?.rol !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Not an admin' }, { status: 403 });
    }

    const { id } = context.params;
    const body = await request.json();
    const validatedData = CreateClientRecordSchema.parse(body);

    const { db } = await connectToDatabase();
    const result = await db.collection('client_records').updateOne(
      
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ...validatedData,
          updatedAt: new Date(),
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { userId, sessionClaims } = await clerkAuth();
    const customSessionClaims = sessionClaims as CustomSessionClaims;
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (customSessionClaims?.o?.rol !== 'admin') {
      return NextResponse.json({ error: 'Forbidden: Not an admin' }, { status: 403 });
    }

    const { id } = context.params;
    const { db } = await connectToDatabase();
    const result = await db.collection('client_records').deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) { 
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}