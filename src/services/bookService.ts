import axios from 'axios';
import { Book, BookResponse } from '../types/Book';

// Use Choreo connection service URL for managed authentication
const API_BASE_URL = window.configs?.apiUrl || '/choreo-apis/rovintest/book-list-service/v1.0';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Ensure credentials (session cookies) are sent with requests for Choreo managed auth
  withCredentials: true,
});

// Add interceptor for handling authentication errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Session expired - redirect to login
      window.location.href = '/auth/login';
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

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
