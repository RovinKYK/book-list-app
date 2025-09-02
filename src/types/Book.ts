export interface Book {
  uuid?: string;
  title: string;
  author: string;
  status: 'read' | 'unread' | 'reading';
}

export interface BookResponse {
  [uuid: string]: Book;
}
