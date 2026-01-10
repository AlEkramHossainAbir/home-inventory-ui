import { NextResponse, type NextRequest } from 'next/server';
import { dummyItemDetails } from '@/lib/data/dummyItemDetails';

const API_BASE_URL = process.env.API_BASE_URL || 'http://4.213.57.100:3100/api/v1';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json(
        { error: 'No authorization token provided' },
        { status: 401 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/items/${id}`, {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      // If API fails, check if we have dummy data for this ID
      if (dummyItemDetails[id]) {
        console.log(`API failed for item ${id}, returning dummy data`);
        return NextResponse.json(dummyItemDetails[id]);
      }
      
      return NextResponse.json(
        { error: data.message || 'Failed to fetch item' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Proxy Error:', error);
    return NextResponse.json(
      { error: 'Unable to fetch item' },
      { status: 500 }
    );
  }
}
