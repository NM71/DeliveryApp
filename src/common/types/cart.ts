export interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  brand: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
}

export interface AddToCartPayload {
  id: string;
  name: string;
  price: string;
  image: string;
  brand: string;
}

export interface UpdateQuantityPayload {
  id: string;
  quantity: number;
}
