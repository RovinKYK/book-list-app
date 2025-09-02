import axios from 'axios';

// In a production environment, we would get this from Choreo's public/config.js
// For development, we'll use environment variables or mock it

// When deployed to Choreo with managed auth, the URL will be injected
// And we would use the /choreo-apis/ prefix for API calls
const baseURL = process.env.REACT_APP_API_URL || '/choreo-apis/book-list-service';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// For development, we might need to add API keys or auth headers
// These would be automatically added by Choreo in production
if (process.env.REACT_APP_API_KEY) {
  api.defaults.headers.common['Test-Key'] = process.env.REACT_APP_API_KEY;
}

export const bookService = {
  getAllBooks: async () => {
    try {
      const response = await api.get('/books');
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },

  getBookByUUID: async (uuid) => {
    try {
      const response = await api.get(`/books/${uuid}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching book ${uuid}:`, error);
      throw error;
    }
  },

  addBook: async (bookData) => {
    try {
      const response = await api.post('/books', bookData);
      return response.data;
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  },

  updateBookStatus: async (uuid, statusData) => {
    try {
      const response = await api.put(`/books/${uuid}`, statusData);
      return response.data;
    } catch (error) {
      console.error(`Error updating book ${uuid}:`, error);
      throw error;
    }
  },

  deleteBook: async (uuid) => {
    try {
      const response = await api.delete(`/books/${uuid}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting book ${uuid}:`, error);
      throw error;
    }
  }
};
