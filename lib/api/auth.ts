import { type LoginRequest, type LoginResponse } from '@/types/auth';

const API_BASE_URL = 'http://4.213.57.100:3100/api/v1';

export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
  console.log('Attempting login to:', `${API_BASE_URL}/users/login`);
  console.log('Credentials:', credentials);
  
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      credentials: 'omit',
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
