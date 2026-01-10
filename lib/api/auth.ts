import { type LoginRequest, type LoginResponse } from '@/types/auth';

// Use Next.js API proxy to avoid CORS issues
const USE_PROXY = true;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!USE_PROXY && !API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined. Please check your .env.local file.');
}

export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
  const url = USE_PROXY ? '/api/auth/login' : `${API_BASE_URL}/users/login`;
  
  console.log('Attempting login to:', url);
  console.log('Credentials:', credentials);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Login failed' }));
      throw new Error(errorData.message || `HTTP ${response.status}: Invalid credentials`);
    }

    const data = await response.json();
    console.log('Login successful');
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the server. Please check your network connection or try again later.');
    }
    throw error;
  }
}
