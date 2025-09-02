import axios from 'axios';

// When running locally, use the environment variable
// When running in Choreo, use the config.js that's mounted by Choreo
const API_URL = window?.configs?.apiUrl 
  ? window.configs.apiUrl 
  : (process.env.REACT_APP_API_URL || 'http://localhost:8080');

// Create axios instance with credentials to support Choreo managed authentication
const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Important for managed authentication
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
