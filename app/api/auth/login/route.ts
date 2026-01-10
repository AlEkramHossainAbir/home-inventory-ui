import { NextResponse, type NextRequest } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL || 'http://4.213.57.100:3100/api/v1';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Login failed' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Proxy Error:', error);
    return NextResponse.json(
      { error: 'Unable to connect to the authentication server' },
      { status: 500 }
    );
  }
}
