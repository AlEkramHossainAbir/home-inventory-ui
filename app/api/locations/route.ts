import { NextResponse, type NextRequest } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL || 'http://4.213.57.100:3100/api/v1';

export async function GET(request: NextRequest) {
  try {
    // Get auth token from request headers
    const authHeader = request.headers.get('authorization');
    
    console.log('API Proxy - Auth header received:', authHeader ? authHeader.substring(0, 30) + '...' : 'NONE');
    
    if (!authHeader) {
      console.error('API Proxy - No authorization header');
      return NextResponse.json(
        { error: 'No authorization token provided' },
        { status: 401 }
      );
    }

    console.log('API Proxy - Fetching from:', `${API_BASE_URL}/locations`);

    const response = await fetch(`${API_BASE_URL}/locations`, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
    });

    console.log('API Proxy - Response status:', response.status);

    const data = await response.json();

    if (!response.ok) {
      console.error('API Proxy - Error response:', data);
      return NextResponse.json(
        { error: data.message || 'Failed to fetch locations' },
        { status: response.status }
      );
    }

    console.log('API Proxy - Success, returning', data.length, 'locations');
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Proxy Error:', error);
    return NextResponse.json(
      { error: 'Unable to fetch locations' },
      { status: 500 }
    );
  }
}
