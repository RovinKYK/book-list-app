import axios from 'axios';
import { Book } from '../models/Book';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.choreo.dev/your-book-service-path';
// We'll use a header for authorization in Choreo
const TEST_KEY = process.env.REACT_APP_TEST_KEY || '';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Test-Key': TEST_KEY
  }
});

export const BookService = {
  getAllBooks: async (): Promise<Book[]> => {
    try {
      const response = await api.get('/books');
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },
  
  getBookById: async (id: string): Promise<Book> => {
    try {
      const response = await api.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching book with id ${id}:`, error);
      throw error;
    }
  },
  
  addBook: async (book: Omit<Book, 'id'>): Promise<Book> => {
    try {
      const response = await api.post('/books', book);
      return response.data;
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  },
  
  updateBook: async (id: string, book: Partial<Book>): Promise<Book> => {
    try {
      const response = await api.put(`/books/${id}`, book);
      return response.data;
    } catch (error) {
      console.error(`Error updating book with id ${id}:`, error);
      throw error;
    }
  },
  
  deleteBook: async (id: string): Promise<void> => {
    try {
      await api.delete(`/books/${id}`);
    } catch (error) {
      console.error(`Error deleting book with id ${id}:`, error);
      throw error;
    }
  }
};
