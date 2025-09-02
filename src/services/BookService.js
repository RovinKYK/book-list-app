import axios from 'axios';

// Create an axios instance with credentials included
const api = axios.create({
  withCredentials: true, // Important for Choreo's Managed Auth to work
});

// Add response interceptor to handle session expiry
api.interceptors.response.use(
  response => response,
  error => {
    // If we get a 401 Unauthorized, the session has expired
    if (error.response && error.response.status === 401) {
      console.log('Session expired, redirecting to login');
      // Redirect to Choreo's managed auth login endpoint
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

// Read the configuration from window.configs which will be injected by Choreo
// This is part of the Managed Auth feature in Choreo
const getApiUrl = () => {
  if (window.configs && window.configs.apiUrl) {
    // apiUrl already contains the full path including '/choreo-apis/book-list-service/v1'
    return window.configs.apiUrl;
  }
  
  // For local development, use a fallback or environment variable
  return process.env.REACT_APP_API_URL || 'http://localhost:8080';
};

class BookService {
  async getAllBooks() {
    try {
      const response = await api.get(`${getApiUrl()}/books`);
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }

  async getBookByUuid(uuid) {
    try {
      const response = await api.get(`${getApiUrl()}/books/${uuid}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching book with UUID ${uuid}:`, error);
      throw error;
    }
  }

  async addBook(book) {
    try {
      const response = await api.post(`${getApiUrl()}/books`, book);
      return response.data;
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  }

  async updateBookStatus(uuid, status) {
    try {
      const response = await api.put(`${getApiUrl()}/books/${uuid}`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating book ${uuid}:`, error);
      throw error;
    }
  }

  async deleteBook(uuid) {
    try {
      const response = await api.delete(`${getApiUrl()}/books/${uuid}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting book ${uuid}:`, error);
      throw error;
    }
  }
}

export default new BookService();
