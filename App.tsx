import React from 'react';
import { CartProvider } from './src/store/CartContext';
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  return (
    <CartProvider>
      <StackNavigator />
    </CartProvider>
  );
}
