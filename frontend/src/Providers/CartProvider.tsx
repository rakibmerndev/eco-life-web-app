import { createContext, ReactNode, useState, useEffect } from "react";

export interface CartItem {
  productId: string;
  quantity: number;
  name: string;
  price: number;
  discountedPrice: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateCart: (productId: string, quantity: number) => void;
  deleteFromCart: (productId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const defaultCartInfo: CartContextType = {
  cart: [],
  addToCart: () => {},
  updateCart: () => {},
  deleteFromCart: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  getCartItemCount: () => 0,
};

export const CartContext = createContext(defaultCartInfo);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("eco-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });


  useEffect(() => {
    localStorage.setItem("eco-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem.productId === item.productId
      );

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.productId === item.productId
            ? {
                ...cartItem,
                quantity: cartItem.quantity + item.quantity,
              }
            : cartItem
        );
      } else {
        
        return [...prevCart, item];
      }
    });
  };

  const updateCart = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      deleteFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const deleteFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.productId !== productId)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0
    );
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value: CartContextType = {
    cart,
    addToCart,
    updateCart,
    deleteFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
