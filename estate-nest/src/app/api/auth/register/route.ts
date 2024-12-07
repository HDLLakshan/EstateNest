import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json({ message: error.message }, { status: res.status });
    }

    const data = await res.json();

    const response = NextResponse.json({ message: 'Registration successful' });
    response.cookies.set('token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hour
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
  }
}
