"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("undr_cart");
    if (saved) {
      try {
        setCart(JSON.parse(saved));
      } catch {
        setCart([]);
      }
    }
    setLoaded(true);
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("undr_cart", JSON.stringify(cart));
    }
  }, [cart, loaded]);

  const addToCart = (product, variant = null, quantity = 1) => {
    setCart((prev) => {
      // Create unique key based on product + variant
      const key = variant ? `${product.id}-${variant.id}` : `${product.id}`;
      const existing = prev.find((item) => item.key === key);

      if (existing) {
        return prev.map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [
        ...prev,
        {
          key,
          productId: product.id,
          title: product.title,
          slug: product.slug,
          price: product.priceInNGN,
          image: product?.gallery?.[0]?.image?.url || null,
          variant: variant
            ? {
                id: variant.id,
                title: variant.title,
                options: variant.options,
              }
            : null,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (key) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  };

  const updateQuantity = (key, quantity) => {
    if (quantity <= 0) {
      removeFromCart(key);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.key === key ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("undr_cart");
  };

  //   const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartCount = cart.length;
  const cartTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
