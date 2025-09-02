export interface Book {
  title: string;
  author: string;
  status: 'read' | 'reading' | 'to-read';
}

export interface BookWithUUID extends Book {
  uuid: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
