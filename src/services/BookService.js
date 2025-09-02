import axios from 'axios';

// Get the API URL from Choreo config.js (if deployed on Choreo) or use default
const API_URL = window.configs?.apiUrl || 'http://localhost:8080';

// Create axios instance with Choreo integration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// For Choreo-managed authentication, requests to the backend should be proxied
// through /choreo-apis/ path, so we need to modify the baseURL when running in Choreo
if (window.configs && window.configs.apiUrl) {
  // Check if this is running in Choreo (config.js will be injected)
  apiClient.interceptors.request.use(config => {
    if (!config.url.startsWith('http')) {
      // Only transform relative URLs
      config.url = `/choreo-apis/${config.url}`;
    }
    return config;
  });
}

// Book API service
const BookService = {
  // Get all books
  getAllBooks: async () => {
    const response = await apiClient.get('/books');
    return response.data;
  },

  // Get a book by UUID
  getBookByUuid: async (uuid) => {
    const response = await apiClient.get(`/books/${uuid}`);
    return response.data;
  },

  // Create a new book
  createBook: async (book) => {
    const response = await apiClient.post('/books', book);
    return response.data;
  },

  // Update book status
  updateBookStatus: async (uuid, status) => {
    const response = await apiClient.put(`/books/${uuid}`, { status });
    return response.data;
  },

  // Delete a book
  deleteBook: async (uuid) => {
    const response = await apiClient.delete(`/books/${uuid}`);
    return response.data;
  }
};

export default BookService;
