import axios from 'axios';
import { Book } from '../types/Book';

// Get config from window.configs (injected by Choreo)
declare global {
  interface Window {
    configs: {
      serviceUrl: string;
      apiKey: string;
    };
  }
}

// API configuration
const getApiConfig = () => {
  // When running in development mode, use a local mock server
  // In production (Choreo), use the injected configuration
  if (process.env.NODE_ENV === 'development') {
    return {
      baseURL: 'http://localhost:8080',
      headers: {}
    };
  } else {
    // In Choreo environment, use the choreo-apis proxy path with injected config
    return {
      baseURL: '/choreo-apis/book-list-service',
      headers: {
        'Test-Key': window.configs.apiKey || '',
      }
    };
  }
};

// Create axios instance with the appropriate config
const apiClient = axios.create(getApiConfig());

class BookService {
  // Get all books
  async getAllBooks(): Promise<string[]> {
    try {
      const response = await apiClient.get('/books');
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }

  // Get a specific book by UUID
  async getBookByUuid(uuid: string): Promise<Book> {
    try {
      const response = await apiClient.get(`/books/${uuid}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching book with UUID ${uuid}:`, error);
      throw error;
    }
  }

  // Add a new book
  async addBook(book: Book): Promise<void> {
    try {
      const response = await apiClient.post('/books', book);
      return response.data;
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  }

  // Update a book's status
  async updateBookStatus(uuid: string, status: 'unread' | 'reading' | 'read'): Promise<void> {
    try {
      const response = await apiClient.put(`/books/${uuid}`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating book status for UUID ${uuid}:`, error);
      throw error;
    }
  }

  // Delete a book
  async deleteBook(uuid: string): Promise<void> {
    try {
      const response = await apiClient.delete(`/books/${uuid}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting book with UUID ${uuid}:`, error);
      throw error;
    }
  }
}

// Create and export the book service instance
const bookServiceInstance = new BookService();
export default bookServiceInstance;
