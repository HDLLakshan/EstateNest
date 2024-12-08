import { Division } from '@/app/models/division';
import { makeAuthenticatedRequest, handleError } from '@/app/utils/apiHelpers';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = await params;
    const res = await makeAuthenticatedRequest(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/divisions/${slug}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    );

    if (!res.ok) {
      return NextResponse.json({ message: 'Failed API call' }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json({
      name: data.name,
      size: data.size,
      code: data.code,
      numberOfPlants: data.number_of_plants,
      targetKilos: data.target_kilos,
      status: data.status,
      id: data.id,
    } as Division);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  try {
    const { name, code, size, numberOfPlants, targetKilos } = await req.json();
    const { slug } = await params;

    const res = await makeAuthenticatedRequest(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/divisions/${slug}`,
      {
        method: 'PUT',
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
    return NextResponse.json({ message: 'Updated successfully', data });
  } catch (error) {
    return handleError(error);
  }
}
