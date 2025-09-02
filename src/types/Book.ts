export interface Book {
  uuid?: string;
  title: string;
  author: string;
  status: 'read' | 'to_read' | 'reading';
}

export interface BookResponse {
  [uuid: string]: Book;
}
