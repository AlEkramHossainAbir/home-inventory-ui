import { type LocationsResponse } from '@/types/location';

// Use Next.js API proxy to avoid CORS issues
const USE_PROXY = true;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://4.213.57.100:3100/api/v1';

export async function fetchLocations(): Promise<LocationsResponse> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  console.log('Fetching locations with token:', token.substring(0, 20) + '...');

  const url = USE_PROXY ? '/api/locations' : `${API_BASE_URL}/locations`;

  // Check if token already has Bearer prefix
  const authHeader = token.startsWith('Bearer ') ? token : `Bearer ${token}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Locations fetch failed:', response.status, errorText);
    throw new Error(`Failed to fetch locations: ${response.statusText}`);
  }

  return response.json();
}
