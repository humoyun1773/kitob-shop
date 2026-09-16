import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book } from '../types/book';
import { OrderItem } from '../types/order';
import { Coupon } from '../types/user';
import { INITIAL_COUPONS } from '../data/mockCoupons';

interface CartContextType {
  items: OrderItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  totalItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<OrderItem[]>(() => {
    const saved = localStorage.getItem('kitob_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [isOpen, setIsOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const saved = localStorage.getItem('kitob_coupon');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    localStorage.setItem('kitob_cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('kitob_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('kitob_coupon');
    }
  }, [appliedCoupon]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (book: Book, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.bookId === book.id);
      if (existing) {
        return prev.map(item =>
          item.bookId === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { bookId: book.id, book, quantity, price: book.price }];
    });
  };

  const removeFromCart = (bookId: string) => {
    setItems(prev => prev.filter(item => item.bookId !== bookId));
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.bookId === bookId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const found = INITIAL_COUPONS.find(c => c.code === cleanCode);
    if (!found) {
      return { success: false, message: 'Kupon kodi topilmadi yoki yaroqsiz.' };
    }
    setAppliedCoupon(found);
    return { success: true, message: `"${found.code}" kuponi muvaffaqiyatli qo'llandi!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Calculations
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = (subtotal * appliedCoupon.discountPercent) / 100;
    } else if (appliedCoupon.fixedDiscount) {
      discountAmount = Math.min(appliedCoupon.fixedDiscount, subtotal);
    }
  }

  // Free delivery for orders over $50
  const deliveryFee = subtotal > 50 || items.length === 0 ? 0 : 4.99;
  const tax = Number(((subtotal - discountAmount) * 0.02).toFixed(2));
  const total = Number(Math.max(0, subtotal - discountAmount + deliveryFee + tax).toFixed(2));
  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal: Number(subtotal.toFixed(2)),
        discountAmount: Number(discountAmount.toFixed(2)),
        deliveryFee,
        tax,
        total,
        totalItemsCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
