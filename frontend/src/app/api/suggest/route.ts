import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100';

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') ?? '';
  const res = await fetch(`${API_BASE}/api/suggest?q=${encodeURIComponent(q)}`);
  const data = await res.json();
  return NextResponse.json(data);
}
