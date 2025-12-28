import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState('00'); // Default

  // Get table number from URL on initial load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tableFromUrl = urlParams.get('table');
    if (tableFromUrl) {
      const formattedTable = tableFromUrl.padStart(2, '0');
      setTableNumber(formattedTable);
    } else {
      // If no table in URL, use default or prompt
      setTableNumber('01'); // Default fallback
    }
  }, []);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prev => 
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      tableNumber,
      setTableNumber,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};