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
      
      // Redirect to dashboard
      router.push('/dashboard');
    },
  });
}
