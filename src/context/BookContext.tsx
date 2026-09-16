import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, BookReview } from '../types/book';
import { INITIAL_BOOKS } from '../data/mockBooks';

interface BookContextType {
  books: Book[];
  getBookById: (id: string) => Book | undefined;
  addBook: (book: Omit<Book, 'id' | 'createdAt' | 'updatedAt' | 'reviewsCount' | 'reviews'>) => Book;
  updateBook: (id: string, data: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  addReview: (bookId: string, review: Omit<BookReview, 'id' | 'date'>) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('kitob_books');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_BOOKS;
      }
    }
    return INITIAL_BOOKS;
  });

  useEffect(() => {
    localStorage.setItem('kitob_books', JSON.stringify(books));
  }, [books]);

  const getBookById = (id: string): Book | undefined => {
    return books.find(b => b.id.toLowerCase() === id.toLowerCase());
  };

  const addBook = (bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt' | 'reviewsCount' | 'reviews'>): Book => {
    const now = new Date().toISOString();
    const newBook: Book = {
      ...bookData,
      id: 'book-' + Date.now(),
      reviewsCount: 0,
      reviews: [],
      createdAt: now,
      updatedAt: now
    };
    setBooks(prev => [newBook, ...prev]);
    return newBook;
  };

  const updateBook = (id: string, data: Partial<Book>) => {
    const now = new Date().toISOString();
    setBooks(prev =>
      prev.map(b => (b.id === id ? { ...b, ...data, updatedAt: now } : b))
    );
  };

  const deleteBook = (id: string) => {
    setBooks(prev => prev.filter(b => b.id !== id));
  };

  const addReview = (bookId: string, reviewData: Omit<BookReview, 'id' | 'date'>) => {
    const newReview: BookReview = {
      ...reviewData,
      id: 'rev-' + Date.now(),
      date: new Date().toISOString().split('T')[0]
    };

    setBooks(prev =>
      prev.map(b => {
        if (b.id !== bookId) return b;
        const updatedReviews = [newReview, ...b.reviews];
        const newAvgRating = Number(
          (
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) /
            updatedReviews.length
          ).toFixed(1)
        );
        return {
          ...b,
          reviews: updatedReviews,
          reviewsCount: updatedReviews.length,
          rating: newAvgRating
        };
      })
    );
  };

  return (
    <BookContext.Provider
      value={{
        books,
        getBookById,
        addBook,
        updateBook,
        deleteBook,
        addReview
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};
