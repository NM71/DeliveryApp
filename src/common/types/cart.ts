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

// Context API types
export interface CartContextType {
  state: CartState;
  addToCart: (payload: AddToCartPayload) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (payload: UpdateQuantityPayload) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
}
