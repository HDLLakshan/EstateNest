import { Division } from '@/app/models/division';
import { handleError, makeAuthenticatedRequest } from '@/app/utils/apiHelpers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, code, size, numberOfPlants, targetKilos } = await req.json();

    const res = await makeAuthenticatedRequest(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/divisions`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          code,
          size,
          number_of_plants: numberOfPlants,
          target_kilos: targetKilos,
          status: 'active',
        }),
      },
    );

    if (!res.ok) {
      return NextResponse.json({ message: 'Failed API call' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ message: 'Added successfully', data });
  } catch (error) {
    return handleError(error);
  }
}

export async function GET() {
  try {
    const res = await makeAuthenticatedRequest(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/divisions`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    );

    if (!res.ok) {
      return NextResponse.json({ message: 'Failed API call' }, { status: res.status });
    }

    const data: Division[] = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
