"use client";

import { useQuery } from '@tanstack/react-query';
import { fetchItems } from '@/lib/api/items';

export function useItems(page: number = 1, pageSize: number = 50) {
  return useQuery({
    queryKey: ['items', page, pageSize],
    queryFn: () => fetchItems(page, pageSize),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
