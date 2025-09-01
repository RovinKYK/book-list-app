import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Book } from '../types/Book';
import BookService from '../services/BookService';

interface BookContextType {
  books: Book[];
  loading: boolean;
  error: string | null;
  fetchBooks: () => Promise<void>;
  addBook: (book: Book) => Promise<void>;
  updateBookStatus: (uuid: string, status: 'unread' | 'reading' | 'read') => Promise<void>;
  deleteBook: (uuid: string) => Promise<void>;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const bookIds = await BookService.getAllBooks();
      
      // Fetch details for each book
      const bookDetailsPromises = bookIds.map((uuid: string) => BookService.getBookByUuid(uuid));
      const booksWithDetails = await Promise.all(bookDetailsPromises);
      
      // Add UUID to each book
      const booksWithUuids = booksWithDetails.map((book: Book, index: number) => ({
        ...book,
        uuid: bookIds[index]
      }));
      
      setBooks(booksWithUuids);
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (book: Book) => {
    try {
      await BookService.addBook(book);
      await fetchBooks(); // Refresh the book list
    } catch (err) {
      setError('Failed to add book. Please try again later.');
      console.error('Error adding book:', err);
    }
  };

  const updateBookStatus = async (uuid: string, status: 'unread' | 'reading' | 'read') => {
    try {
      await BookService.updateBookStatus(uuid, status);
      
      // Update local state to avoid a full refetch
      setBooks(prevBooks => 
        prevBooks.map(book => 
          book.uuid === uuid ? { ...book, status } : book
        )
      );
    } catch (err) {
      setError('Failed to update book status. Please try again later.');
      console.error('Error updating book status:', err);
    }
  };

  const deleteBook = async (uuid: string) => {
    try {
      await BookService.deleteBook(uuid);
      
      // Update local state to avoid a full refetch
      setBooks(prevBooks => prevBooks.filter(book => book.uuid !== uuid));
    } catch (err) {
      setError('Failed to delete book. Please try again later.');
      console.error('Error deleting book:', err);
    }
  };

  // Load books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  const value = {
    books,
    loading,
    error,
    fetchBooks,
    addBook,
    updateBookStatus,
    deleteBook,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export const useBooks = (): BookContextType => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};
