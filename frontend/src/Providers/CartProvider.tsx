import { createContext, ReactNode } from "react";

const defaultCartInfo = {
  cart: [],
  addToCart: () => {},
  updateCart: () => {},
  deleteFromCart: () => {},
  clearCart: () => {},
};

export const CartContext = createContext(defaultCartInfo);

const CartProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CartContext.Provider value={defaultCartInfo}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
