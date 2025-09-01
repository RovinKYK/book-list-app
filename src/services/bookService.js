import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.example.com/books';
const API_KEY = process.env.REACT_APP_API_KEY || '';

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
});

// Get all books
export const getAllBooks = async () => {
    try {
        const response = await instance.get('/books');
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

// Get a single book by ID
export const getBookById = async (id) => {
    try {
        const response = await instance.get(`/books/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching book with id ${id}:`, error);
        throw error;
    }
};

// Add a new book
export const addBook = async (bookData) => {
    try {
        const response = await instance.post('/books', bookData);
        return response.data;
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
};

// Update a book
export const updateBook = async (id, bookData) => {
    try {
        const response = await instance.put(`/books/${id}`, bookData);
        return response.data;
    } catch (error) {
        console.error(`Error updating book with id ${id}:`, error);
        throw error;
    }
};

// Delete a book
export const deleteBook = async (id) => {
    try {
        const response = await instance.delete(`/books/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting book with id ${id}:`, error);
        throw error;
    }
};
