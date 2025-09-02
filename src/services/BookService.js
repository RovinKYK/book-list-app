import axios from 'axios';

// Read the configuration from window.configs which will be injected by Choreo
// This is part of the Managed Auth feature in Choreo
const getApiUrl = () => {
  if (window.configs && window.configs.apiUrl) {
    return `${window.configs.apiUrl}/choreo-apis/book-list-service/v1`;
  }
  
  // For local development, use a fallback or environment variable
  return process.env.REACT_APP_API_URL || 'http://localhost:8080';
};

class BookService {
  async getAllBooks() {
    try {
      const response = await axios.get(`${getApiUrl()}/books`);
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }

  async getBookByUuid(uuid) {
    try {
      const response = await axios.get(`${getApiUrl()}/books/${uuid}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching book with UUID ${uuid}:`, error);
      throw error;
    }
  }

  async addBook(book) {
    try {
      const response = await axios.post(`${getApiUrl()}/books`, book);
      return response.data;
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  }

  async updateBookStatus(uuid, status) {
    try {
      const response = await axios.put(`${getApiUrl()}/books/${uuid}`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating book ${uuid}:`, error);
      throw error;
    }
  }

  async deleteBook(uuid) {
    try {
      const response = await axios.delete(`${getApiUrl()}/books/${uuid}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting book ${uuid}:`, error);
      throw error;
    }
  }
}

export default new BookService();
