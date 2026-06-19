import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, size) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id && item.selectedSize === size);
      if (existing) {
        return prevCart.map((item) =>
          (item._id === product._id && item.selectedSize === size) ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1, selectedSize: size }];
    });
  };

  const updateQuantity = (id, size, newQty) => {
    if (newQty < 1) return;
    setCart((prevCart) => 
      prevCart.map((item) => 
        (item._id === id && item.selectedSize === size) ? { ...item, qty: newQty } : item
      )
    );
  };

  const removeFromCart = (id, size) => {
    setCart((prevCart) => prevCart.filter((item) => !(item._id === id && item.selectedSize === size)));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
