import createApiService from './ApiService';

// Create api client with authentication handling
const apiClient = createApiService();

// Book API service
const BookService = {
  // Get all books
  getAllBooks: async () => {
    const response = await apiClient.get('/books');
    return response.data;
  },

  // Get a book by UUID
  getBookByUuid: async (uuid) => {
    const response = await apiClient.get(`/books/${uuid}`);
    return response.data;
  },

  // Create a new book
  createBook: async (book) => {
    const response = await apiClient.post('/books', book);
    return response.data;
  },

  // Update book status
  updateBookStatus: async (uuid, status) => {
    const response = await apiClient.put(`/books/${uuid}`, { status });
    return response.data;
  },

  // Delete a book
  deleteBook: async (uuid) => {
    const response = await apiClient.delete(`/books/${uuid}`);
    return response.data;
  }
};

export default BookService;
