import axios from 'axios';

// This placeholder URL will be replaced with the actual service URL from Choreo
// in production when deployed to Choreo via managed connections
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// API key will be injected by Choreo when connected to the marketplace service
const API_KEY = process.env.REACT_APP_API_KEY || '';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(API_KEY && { 'x-api-key': API_KEY })
  }
});

export const BookService = {
  getAllBooks: async () => {
    try {
      const response = await instance.get('/books');
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },

  getBookByUuid: async (uuid) => {
    try {
      const response = await instance.get(`/books/${uuid}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching book with UUID ${uuid}:`, error);
      throw error;
    }
  },

  createBook: async (book) => {
    try {
      const response = await instance.post('/books', book);
      return response.data;
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  },

  updateBookStatus: async (uuid, status) => {
    try {
      const response = await instance.put(`/books/${uuid}`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating status for book with UUID ${uuid}:`, error);
      throw error;
    }
  },

  deleteBook: async (uuid) => {
    try {
      const response = await instance.delete(`/books/${uuid}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting book with UUID ${uuid}:`, error);
      throw error;
    }
  }
};

export default BookService;
