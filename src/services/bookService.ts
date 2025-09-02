import axios from 'axios';
import { Book, BookResponse } from '../types/Book';

const API_BASE_URL = window.configs?.choreoBackendServiceUrl || process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor for Choreo authentication if available
apiClient.interceptors.request.use((config) => {
  // When deployed to Choreo with managed auth, requests to /choreo-apis/* are automatically authenticated
  if (config.baseURL?.includes('choreo-apis')) {
    return config;
  }
  
  // For development or other environments, you might need to add authentication headers here
  return config;
});

export const bookService = {
  // Get all books
  getAllBooks: async (): Promise<BookResponse> => {
    const response = await apiClient.get('/books');
    return response.data;
  },

  // Get book by UUID
  getBookByUuid: async (uuid: string): Promise<Book> => {
    const response = await apiClient.get(`/books/${uuid}`);
    return response.data;
  },

  // Create a new book
  createBook: async (book: Omit<Book, 'uuid'>): Promise<void> => {
    await apiClient.post('/books', book);
  },

  // Update book status
  updateBookStatus: async (uuid: string, status: string): Promise<void> => {
    await apiClient.put(`/books/${uuid}`, { status });
  },

  // Delete book
  deleteBook: async (uuid: string): Promise<void> => {
    await apiClient.delete(`/books/${uuid}`);
  },

  // Health check
  healthCheck: async (): Promise<string> => {
    const response = await apiClient.get('/healthz');
    return response.data;
  },
};
