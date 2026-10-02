import { useContext } from "react";
import { CartContext } from "../Providers/CartProvider";

export const useCart = () => {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return cart;
};
