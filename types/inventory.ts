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
  imageId?: string;
  insured: boolean;
  labels: Label[];
  location: Location;
  name: string;
  purchasePrice: number;
  quantity: number;
  soldTime: string;
  thumbnailId?: string;
  updatedAt: string;
}

export interface ItemDetail extends Item {
  syncChildItemsLocations?: boolean;
  serialNumber?: string;
  modelNumber?: string;
  manufacturer?: string;
  lifetimeWarranty?: boolean;
  warrantyExpires?: string;
  warrantyDetails?: string;
  purchaseTime?: string;
  purchaseFrom?: string;
  soldTo?: string;
  soldPrice?: number;
  soldNotes?: string;
  notes?: string;
  attachments?: Attachment[];
  fields?: CustomField[];
}

export interface Attachment {
  id: string;
  type: string;
  url: string;
  name: string;
  createdAt: string;
}

export interface CustomField {
  id: string;
  name: string;
  value: string;
  type: string;
}

export interface InventoryResponse {
  items: Item[];
  page: number;
  pageSize: number;
  total: number;
}
