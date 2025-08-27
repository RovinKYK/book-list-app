import axios from 'axios';

// For local development, using a local proxy to avoid CORS issues
// When deployed on Choreo, we'll use the managed authentication feature
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? '/choreo-apis/book-list-service/v1.0' // Will be properly configured by Choreo's managed auth
  : 'http://localhost:8080'; // For local development

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
