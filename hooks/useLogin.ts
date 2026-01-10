"use client";

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api/auth';
import { type LoginRequest, type LoginResponse } from '@/types/auth';

export function useLogin() {
  const router = useRouter();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Store auth tokens
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('attachmentToken', data.attachmentToken);
      localStorage.setItem('tokenExpiry', data.expiresAt);
      
      // Store user information if available
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        // If no user object, store the username from the request
        localStorage.setItem('user', JSON.stringify({ 
          username: data.token, // Placeholder
          email: '',
          name: '' 
        }));
      }
      
      // Redirect to dashboard
      router.push('/dashboard');
    },
  });
}
