import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const getAuthToken = async (): Promise<string | null> => {
  const cookieStore = cookies();
  return (await cookieStore).get('token')?.value || null;
};

export const makeAuthenticatedRequest = async (
  url: string,
  options: RequestInit,
): Promise<Response> => {
  const token = await getAuthToken();

  if (!token) {
    throw new Error('Unauthorized: Token not found');
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  return fetch(url, {
    ...options,
    headers,
  });
};

export const handleError = (error: unknown) => {
  console.error('API Error:', error);
  return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
};
