export interface Book {
  uuid?: string;
  title: string;
  author: string;
  status: 'unread' | 'reading' | 'read';
}
