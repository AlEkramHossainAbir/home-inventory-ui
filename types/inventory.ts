export interface Label {
  color: string;
  createdAt: string;
  description: string;
  id: string;
  name: string;
  updatedAt: string;
}

export interface Location {
  createdAt: string;
  description: string;
  id: string;
  name: string;
  updatedAt: string;
}

export interface Item {
  archived: boolean;
  assetId: string;
  createdAt: string;
  description: string;
  id: string;
  imageId: string;
  insured: boolean;
  labels: Label[];
  location: Location;
  name: string;
  purchasePrice: number;
  quantity: number;
  soldTime: string;
  thumbnailId: string;
  updatedAt: string;
}

export interface InventoryResponse {
  items: Item[];
  page: number;
  pageSize: number;
  total: number;
}
