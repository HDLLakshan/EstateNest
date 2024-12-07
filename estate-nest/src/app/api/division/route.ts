import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, code, size, numberOfPlants, targetKlios } = await req.json();

    const cookieStore = cookies();
    const token = (await cookieStore)?.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/divisions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name,
        code,
        size,
        number_of_plants: numberOfPlants,
        target_kilos: targetKlios,
        status: 'active',
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ message: 'Failed API calls' }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json({ message: 'Added successful', data });
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong test', error },
      { status: 500 },
    );
  }
}
