import axios from 'axios';

// This URL will be replaced when deployed to Choreo
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// When running in Choreo, the API key will be injected via environment variables
const API_KEY = process.env.REACT_APP_API_KEY || '';

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(API_KEY && { 'X-Api-Key': API_KEY })
  }
});

const BookService = {
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
  
  addBook: async (book) => {
    try {
      const response = await instance.post('/books', book);
      return response.data;
    } catch (error) {
      console.error('Error adding book:', error);
      throw error;
    }
  },
  
  updateBookStatus: async (uuid, status) => {
    try {
      const response = await instance.put(`/books/${uuid}`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating book status for UUID ${uuid}:`, error);
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
