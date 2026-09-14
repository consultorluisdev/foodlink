/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Flavor, Product } from "../types/product";
import type { CartItem } from "../types/catalog";

const CART_STORAGE_KEY = "foodlink_cart";

export function itemKey(product: Product, flavor?: Flavor): string {
  return `${product.id}::${flavor?.name ?? "default"}`;
}

function loadCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as CartItem[];
      return Array.isArray(parsed)
        ? parsed.filter(
            (item) => item?.product?.id && typeof item?.quantity === "number",
          )
        : [];
    }
  } catch {
    // ignore leituras inválidas
  }
  return [];
}

interface createContextData {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product, flavor?: Flavor) => void;
  removeItem: (key: string) => void;
  increaseQuantity: (key: string) => void;
  decreaseQuantity: (key: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<createContextData | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // armazenamento indisponível
    }
  }, [items]);

  function addItem(product: Product, flavor?: Flavor) {
    const key = itemKey(product, flavor);
    setItems((currentItems) => {
      const existing = currentItems.find((item) => item.key === key);

      if (existing) {
        return currentItems.map((item) =>
          item.key === key
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }
      return [...currentItems, { key, product, flavor, quantity: 1 }];
    });
  }

  function removeItem(key: string) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.key !== key),
    );
  }

  function increaseQuantity(key: string) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.key === key
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  }

  function decreaseQuantity(key: string) {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.key === key
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function clearCart() {
    setItems([]);
  }

    const totalItems = items.reduce((total, item) => total + item.quantity, 0);

    const totalPrice = items.reduce((total, item) => {
      const price = item.flavor?.price ?? item.product.promotionalPrice ?? item.product.price;
      return total + price * item.quantity;
    }, 0);

    return (
      <CartContext.Provider
        value={{
          items,
          totalItems,
          totalPrice,
          addItem,
          removeItem,
          increaseQuantity,
          decreaseQuantity,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }

  return context;
}
