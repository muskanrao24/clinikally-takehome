import { Product } from "@/types";
import { createContext, useState } from "react";

const CartContext = createContext<{
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (productId: number) => void;
}>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Product[]>([]);

  const addItem = (item: Product) => {
    setItems([...items, item]);
  };

  const removeItem = (productId: number) => {
    setItems(items.filter((item) => item.productId !== productId));
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
