import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartState, CartItem, AddToCartPayload, UpdateQuantityPayload, CartContextType } from '../common/types/cart';

// Action types
type CartAction =
  | { type: 'ADD_TO_CART'; payload: AddToCartPayload }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: UpdateQuantityPayload }
  | { type: 'INCREMENT_QUANTITY'; payload: string }
  | { type: 'DECREMENT_QUANTITY'; payload: string }
  | { type: 'CLEAR_CART' };

// Initial state
const initialState: CartState = {
  items: [],
  totalItems: 0,
};

// Reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          totalItems: state.totalItems + 1,
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          totalItems: state.totalItems + 1,
        };
      }
    }

    case 'REMOVE_FROM_CART': {
      const existingItem = state.items.find(item => item.id === action.payload);
      if (existingItem) {
        return {
          ...state,
          totalItems: state.totalItems - existingItem.quantity,
          items: state.items.filter(item => item.id !== action.payload),
        };
      }
      return state;
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item && quantity > 0) {
        const quantityDiff = quantity - item.quantity;
        return {
          ...state,
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          ),
          totalItems: state.totalItems + quantityDiff,
        };
      }
      return state;
    }

    case 'INCREMENT_QUANTITY': {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          totalItems: state.totalItems + 1,
        };
      }
      return state;
    }

    case 'DECREMENT_QUANTITY': {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
          totalItems: state.totalItems - 1,
        };
      }
      return state;
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider Component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Action creators
  const addToCart = (payload: AddToCartPayload) => {
    dispatch({ type: 'ADD_TO_CART', payload });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (payload: UpdateQuantityPayload) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload });
  };

  const incrementQuantity = (id: string) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: id });
  };

  const decrementQuantity = (id: string) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Computed values
  const getSubtotal = () => {
    return state.items.reduce((total, item) => {
      const price = parseFloat(item.price);
      return total + price * item.quantity;
    }, 0);
  };

  const getItemCount = () => {
    return state.items.length;
  };

  const value: CartContextType = {
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    getSubtotal,
    getItemCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
