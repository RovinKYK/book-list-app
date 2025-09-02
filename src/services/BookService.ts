import axios, { AxiosInstance } from 'axios';
import { Book, BookWithUUID } from '../types/Book';

class BookService {
  private api: AxiosInstance;
  private baseURL: string;

  constructor() {
    // Get the base URL from the config.js file mounted by Choreo
    this.baseURL = this.getServiceURL();
    
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private getServiceURL(): string {
    // In Choreo deployment, this will be available in window.configs
    // For local development, use environment variable or default
    if (typeof window !== 'undefined' && (window as any).configs) {
      return (window as any).configs.ServiceURL || '/choreo-apis/rovintest/book-list-service/v1';
    }
    return process.env.REACT_APP_SERVICE_URL || 'http://localhost:8080';
  }

  async getAllBooks(): Promise<BookWithUUID[]> {
    try {
      const response = await this.api.get('/books');
      // The API returns an array of UUIDs, we need to fetch each book's details
      const bookUUIDs: string[] = response.data;
      
      const books = await Promise.all(
        bookUUIDs.map(async (uuid) => {
          const bookResponse = await this.api.get(`/books/${uuid}`);
          return {
            uuid,
            ...bookResponse.data
          } as BookWithUUID;
        })
      );
      
      return books;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw new Error('Failed to fetch books');
    }
  }

  async getBookByUUID(uuid: string): Promise<BookWithUUID> {
    try {
      const response = await this.api.get(`/books/${uuid}`);
      return {
        uuid,
        ...response.data
      } as BookWithUUID;
    } catch (error) {
      console.error('Error fetching book:', error);
      throw new Error(`Failed to fetch book with UUID: ${uuid}`);
    }
  }

  async addBook(book: Book): Promise<void> {
    try {
      await this.api.post('/books', book);
    } catch (error) {
      console.error('Error adding book:', error);
      throw new Error('Failed to add book');
    }
  }

  async updateBookStatus(uuid: string, status: string): Promise<void> {
    try {
      await this.api.put(`/books/${uuid}`, { status });
    } catch (error) {
      console.error('Error updating book status:', error);
      throw new Error('Failed to update book status');
    }
  }

  async deleteBook(uuid: string): Promise<void> {
    try {
      await this.api.delete(`/books/${uuid}`);
    } catch (error) {
      console.error('Error deleting book:', error);
      throw new Error('Failed to delete book');
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.api.get('/healthz');
      return true;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export const bookService = new BookService();
