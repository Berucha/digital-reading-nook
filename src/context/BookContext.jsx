/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const BookContext = createContext();

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

export const BookProvider = ({ children }) => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Load books from localStorage
      const storageKey = `reading-nook-books-${user.id}`;
      const storedBooks = localStorage.getItem(storageKey);
      if (storedBooks) {
        setBooks(JSON.parse(storedBooks));
      }
    } else {
      setBooks([]);
    }
    setLoading(false);
  }, [user]);

  const saveBooks = (updatedBooks) => {
    if (user) {
      const storageKey = `reading-nook-books-${user.id}`;
      localStorage.setItem(storageKey, JSON.stringify(updatedBooks));
      setBooks(updatedBooks);
    }
  };

  const addBook = (book) => {
    const newBook = {
      ...book,
      id: book.id || Date.now().toString(),
      addedAt: new Date().toISOString(),
      status: book.status || 'want-to-read',
      rating: book.rating || 0,
      notes: book.notes || '',
      format: book.format || 'physical'
    };
    const updatedBooks = [...books, newBook];
    saveBooks(updatedBooks);
  };

  const updateBook = (bookId, updates) => {
    const updatedBooks = books.map(book =>
      book.id === bookId ? { ...book, ...updates } : book
    );
    saveBooks(updatedBooks);
  };

  const deleteBook = (bookId) => {
    const updatedBooks = books.filter(book => book.id !== bookId);
    saveBooks(updatedBooks);
  };

  const getBooksByStatus = (status) => {
    return books.filter(book => book.status === status);
  };

  const getCurrentlyReading = () => {
    return books.filter(book => book.status === 'reading');
  };

  const getStats = () => {
    const total = books.length;
    const read = books.filter(b => b.status === 'read').length;
    const reading = books.filter(b => b.status === 'reading').length;
    const wantToRead = books.filter(b => b.status === 'want-to-read').length;
    const avgRating = books.filter(b => b.rating > 0).reduce((acc, b) => acc + b.rating, 0) / 
                      (books.filter(b => b.rating > 0).length || 1);
    
    const formatCounts = {
      physical: books.filter(b => b.format === 'physical').length,
      ebook: books.filter(b => b.format === 'ebook').length,
      audiobook: books.filter(b => b.format === 'audiobook').length
    };

    return {
      total,
      read,
      reading,
      wantToRead,
      avgRating: avgRating.toFixed(1),
      formatCounts
    };
  };

  const value = {
    books,
    loading,
    addBook,
    updateBook,
    deleteBook,
    getBooksByStatus,
    getCurrentlyReading,
    getStats
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
