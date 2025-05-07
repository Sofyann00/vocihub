export interface Item {
  createdDate: string;
  updatedDate: string;
  id: number;
  name: string;
  price: number;
  priceDiscount: number | null;
  iconUrl: string | null;
  priceInc: string[] | null;
  priceExc: string[] | null;
  voucherStock: number;
  sortOrder: number | null;
  isActive: boolean;
  variant: {
    createdDate: string;
    updatedDate: string;
    id: number;
    name: string;
    iconUrl: string | null;
  } | null;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity?: number;
  banner: string;
  items: Item[];
  playerId?: string;
}

export interface CartItem extends Product {
  quantity: number;
}