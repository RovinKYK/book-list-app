import axios from 'axios';

// Get the API URL from the window.configs object
// This will be populated by Choreo during deployment for Managed Authentication
const getApiBaseUrl = () => {
  return window.configs?.apiUrl 
    ? `${window.configs.apiUrl}/choreo-apis/book-list-service/v1.0/books` 
    : '/books';  // Fallback for local development
};

// Get all books
export const getAllBooks = async () => {
  try {
    const response = await axios.get(getApiBaseUrl());
    
    // The API returns an array of UUIDs, we need to fetch each book's details
    if (Array.isArray(response.data)) {
      // Fetch book details for each UUID
      const bookDetailsPromises = response.data.map(uuid => getBookDetails(uuid));
      const bookDetails = await Promise.all(bookDetailsPromises);
      
      return bookDetails;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

// Get book details by UUID
export const getBookDetails = async (uuid) => {
  try {
    const response = await axios.get(`${getApiBaseUrl()}/${uuid}`);
    return {
      uuid,
      ...response.data
    };
  } catch (error) {
    console.error(`Error fetching book details for UUID ${uuid}:`, error);
    throw error;
  }
};

// Add a new book
export const addBook = async (bookData) => {
  try {
    const response = await axios.post(getApiBaseUrl(), bookData);
    return response.data;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

// Update book status
export const updateBookStatus = async (uuid, status) => {
  try {
    const response = await axios.put(`${getApiBaseUrl()}/${uuid}`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating status for book ${uuid}:`, error);
    throw error;
  }
};

// Delete a book
export const deleteBook = async (uuid) => {
  try {
    const response = await axios.delete(`${getApiBaseUrl()}/${uuid}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting book ${uuid}:`, error);
    throw error;
  }
};
