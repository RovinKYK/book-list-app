export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  description?: string;
  publishedYear?: number;
  coverImage?: string;
}
