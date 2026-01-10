"use client";

import { useQuery } from '@tanstack/react-query';
import { fetchItemById } from '@/lib/api/items';
import { type ItemDetail } from '@/types/inventory';

export function useItemDetail(id: string) {
  return useQuery<ItemDetail, Error>({
    queryKey: ['item', id],
    queryFn: () => fetchItemById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
