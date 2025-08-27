import axios from 'axios';

// Configure axios for Choreo managed authentication
// Using window.configs.apiUrl in production (set by Choreo's /public/config.js)
// Fallback to localhost for development
const API_BASE_URL = process.env.NODE_ENV === 'production' && window.configs
  ? window.configs.apiUrl // This is automatically set by Choreo's mounted config.js
  : 'http://localhost:8080'; // For local development

// Configure axios to include credentials (cookies) for Choreo managed auth
axios.defaults.withCredentials = true;

class BookService {
  static async getAllBooks() {
    try {
      const response = await axios.get(`${API_BASE_URL}/books`);
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }

  static async getBookByUuid(uuid) {
    try {
      const response = await axios.get(`${API_BASE_URL}/books/${uuid}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching book with UUID ${uuid}:`, error);
      throw error;
    }
  }

  static async addBook(book) {
    try {
      const response = await axios.post(`${API_BASE_URL}/books`, book);
      return response.data;
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  }

  static async updateBookStatus(uuid, status) {
    try {
      const response = await axios.put(`${API_BASE_URL}/books/${uuid}`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating book status for UUID ${uuid}:`, error);
      throw error;
    }
  }

  static async deleteBook(uuid) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/books/${uuid}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting book with UUID ${uuid}:`, error);
      throw error;
    }
  }
}

export default BookService;
