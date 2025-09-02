import axios from 'axios';
import type { Book, BookWithUuid, Status } from '../types/Book';

// This would be replaced with the actual Choreo API endpoint and configuration when deployed
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// This would be replaced with the actual API key for the Choreo service
const API_KEY = import.meta.env.VITE_API_KEY || '';

const bookService = {
  async getAllBooks(): Promise<string[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/books`, {
        headers: {
          'x-api-key': API_KEY
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },

  async getBookByUuid(uuid: string): Promise<BookWithUuid> {
    try {
      const response = await axios.get(`${API_BASE_URL}/books/${uuid}`, {
        headers: {
          'x-api-key': API_KEY
        }
      });
      return { ...response.data, uuid };
    } catch (error) {
      console.error(`Error fetching book with UUID ${uuid}:`, error);
      throw error;
    }
  },

  async addBook(book: Book): Promise<void> {
    try {
      await axios.post(`${API_BASE_URL}/books`, book, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        }
      });
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  },

  async updateBookStatus(uuid: string, status: Status): Promise<void> {
    try {
      await axios.put(`${API_BASE_URL}/books/${uuid}`, status, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        }
      });
    } catch (error) {
      console.error(`Error updating book status for UUID ${uuid}:`, error);
      throw error;
    }
  },

  async deleteBook(uuid: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/books/${uuid}`, {
        headers: {
          'x-api-key': API_KEY
        }
      });
    } catch (error) {
      console.error(`Error deleting book with UUID ${uuid}:`, error);
      throw error;
    }
  }
};

export default bookService;
