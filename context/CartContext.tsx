import { createContext, useContext, useState, ReactNode } from 'react';
import {
  getCart,
  addToCart as coreAddToCart,
  removeFromCart,
  decreaseQuantity,
  clearCart
} from '../data/cart';

interface CartContextType {
  cartCount: number;
  refreshCart: () => void;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const getValidItems = () =>
    getCart().filter((item): item is NonNullable<typeof item> => item !== null);

  const [cartCount, setCartCount] = useState(
    getValidItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  const refreshCart = () => {
    const count = getValidItems().reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  };

  const addToCart = (id: string) => {
    coreAddToCart(id);
    refreshCart();
  };

  const handleRemove = (id: string) => {
    removeFromCart(id);
    refreshCart();
  };

  const handleDecrease = (id: string) => {
    decreaseQuantity(id);
    refreshCart();
  };

  const handleClear = () => {
    clearCart();
    refreshCart();
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        refreshCart,
        addToCart,
        removeFromCart: handleRemove,
        decreaseQuantity: handleDecrease,
        clearCart: handleClear
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un <CartProvider>');
  }
  return context;
};
