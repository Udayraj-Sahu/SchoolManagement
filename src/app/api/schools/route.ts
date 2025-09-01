import { NextRequest, NextResponse } from 'next/server';
import { getDb, School } from '@/lib/db';

export async function GET() {
  try {
    const db = getDb();
    const [rows] = await db.execute('SELECT * FROM schools ORDER BY id DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch schools' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: School = await request.json();
    const { name, address, city, state, contact, email_id, image } = body;

    const db = getDb();
    const [result] = await db.execute(
      'INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, email_id, image]
    );

    return NextResponse.json({ 
      message: 'School added successfully', 
      id: (result as any).insertId 
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to add school' }, { status: 500 });
  }
}