import { type InventoryResponse, type ItemDetail } from '@/types/inventory';

// Use Next.js API proxy to avoid CORS issues
const USE_PROXY = true;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://4.213.57.100:3100/api/v1';

export async function fetchItems(page: number = 1, pageSize: number = 50): Promise<InventoryResponse> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const queryParams = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  const url = USE_PROXY 
    ? `/api/items?${queryParams.toString()}` 
    : `${API_BASE_URL}/items?${queryParams.toString()}`;
  
  // Check if token already has Bearer prefix
  const authHeader = token.startsWith('Bearer ') ? token : `Bearer ${token}`;

  console.log('Fetching items with URL:', url);
  console.log('Auth header:', authHeader.substring(0, 20) + '...');

  const response = await fetch(url, {
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Items fetch failed:', response.status, errorText);
    throw new Error(`Failed to fetch items: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchItemById(id: string): Promise<ItemDetail> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const url = USE_PROXY ? `/api/items/${id}` : `${API_BASE_URL}/items/${id}`;
  
  // Check if token already has Bearer prefix
  const authHeader = token.startsWith('Bearer ') ? token : `Bearer ${token}`;

  console.log('Fetching item detail:', id);
  console.log('URL:', url);
  console.log('Auth header:', authHeader.substring(0, 20) + '...');

  const response = await fetch(url, {
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Item detail fetch failed:', response.status, errorText);
    throw new Error(`Failed to fetch item: ${response.statusText}`);
  }

  return response.json();
}
