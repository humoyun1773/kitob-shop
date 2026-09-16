import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book } from '../types/book';

interface WishlistContextType {
  wishlist: Book[];
  toggleWishlist: (book: Book) => void;
  isInWishlist: (bookId: string) => boolean;
  removeFromWishlist: (bookId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Book[]>(() => {
    const saved = localStorage.getItem('kitob_wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('kitob_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const isInWishlist = (bookId: string) => {
    return wishlist.some(b => b.id === bookId);
  };

  const toggleWishlist = (book: Book) => {
    if (isInWishlist(book.id)) {
      setWishlist(prev => prev.filter(b => b.id !== book.id));
    } else {
      setWishlist(prev => [...prev, book]);
    }
  };

  const removeFromWishlist = (bookId: string) => {
    setWishlist(prev => prev.filter(b => b.id !== bookId));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
