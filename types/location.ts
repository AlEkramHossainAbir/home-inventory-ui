export interface LocationItem {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  itemCount: number;
}

export interface LocationWithDetails extends LocationItem {
  items?: LocationItemDetail[];
  totalValue?: number;
  parent?: {
    id: string;
    name: string;
  };
  children?: LocationItem[];
}

export interface LocationItemDetail {
  id: string;
  name: string;
  category: string;
  price: number;
  condition: 'Good' | 'Fair' | 'Poor' | 'Excellent';
  addedAt: string;
  thumbnailId?: string;
}

export type LocationsResponse = LocationItem[];
