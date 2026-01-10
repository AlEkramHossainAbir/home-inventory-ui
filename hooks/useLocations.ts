"use client";

import { useQuery } from '@tanstack/react-query';
import { fetchLocations } from '@/lib/api/locations';
import { type LocationsResponse } from '@/types/location';

export function useLocations() {
  return useQuery<LocationsResponse, Error>({
    queryKey: ['locations'],
    queryFn: fetchLocations,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
