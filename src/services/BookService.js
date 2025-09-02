import axios from 'axios';

// This service will be configured to use the Choreo service URL and API key
// When deployed to Choreo, these values will be provided via environment variables
// For local development, we'll use a proxy or environment variables

class BookService {
  constructor() {
    // The base URL will be replaced by Choreo's configuration when deployed
    this.baseUrl = process.env.REACT_APP_API_URL || '/choreo-apis/book-list-service';
    this.api = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // If API key exists (for local development), add it to requests
    if (process.env.REACT_APP_API_KEY) {
      this.api.interceptors.request.use(config => {
        config.headers['Test-Key'] = process.env.REACT_APP_API_KEY;
        return config;
      });
    }
  }

  // Get all books
  async getAllBooks() {
    try {
      const response = await this.api.get('/books');
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }

  // Get book by UUID
  async getBookByUuid(uuid) {
    try {
      const response = await this.api.get(`/books/${uuid}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching book with UUID ${uuid}:`, error);
      throw error;
    }
  }

  // Add a new book
  async addBook(book) {
    try {
      const response = await this.api.post('/books', book);
      return response.data;
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  }

  // Update book status
  async updateBookStatus(uuid, status) {
    try {
      const response = await this.api.put(`/books/${uuid}`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating book status for UUID ${uuid}:`, error);
      throw error;
    }
  }

  // Delete a book
  async deleteBook(uuid) {
    try {
      const response = await this.api.delete(`/books/${uuid}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting book with UUID ${uuid}:`, error);
      throw error;
    }
  }
}

export default new BookService();
