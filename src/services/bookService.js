import axios from 'axios';

// This configuration will be injected by Choreo at runtime
const getApiUrl = () => {
  if (window.configs && window.configs.apiUrl) {
    // When running on Choreo, this is injected by the managed auth
    return `${window.configs.apiUrl}/choreo-apis/book-list-service/v1.0`;
  }
  
  // Fallback for local development
  return process.env.REACT_APP_API_URL || 'http://localhost:8080';
};

const apiClient = axios.create({
  baseURL: getApiUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all books
export const getAllBooks = async () => {
  try {
    const response = await apiClient.get('/books');
    
    // The API returns an array of UUIDs, we need to fetch each book's details
    const bookIds = response.data;
    if (!Array.isArray(bookIds) || bookIds.length === 0) {
      return [];
    }

    // Fetch details for each book in parallel
    const bookDetailsPromises = bookIds.map(uuid => getBookDetails(uuid));
    const booksWithDetails = await Promise.all(bookDetailsPromises);
    
    // Add the UUID to each book object for easier reference
    return booksWithDetails.map((book, index) => ({
      ...book,
      uuid: bookIds[index]
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// Get a single book by UUID
export const getBookDetails = async (uuid) => {
  try {
    const response = await apiClient.get(`/books/${uuid}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book ${uuid}:`, error);
    throw error;
  }
};

// Add a new book
export const addBook = async (bookData) => {
  try {
    const response = await apiClient.post('/books', bookData);
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

// Update a book's status
export const updateBookStatus = async (uuid, newStatus) => {
  try {
    const response = await apiClient.put(`/books/${uuid}`, { status: newStatus });
    return response.data;
  } catch (error) {
    console.error(`Error updating book ${uuid}:`, error);
    throw error;
  }
};

// Delete a book
export const deleteBook = async (uuid) => {
  try {
    const response = await apiClient.delete(`/books/${uuid}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting book ${uuid}:`, error);
    throw error;
  }
};
