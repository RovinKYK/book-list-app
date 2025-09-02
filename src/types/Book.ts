export interface Book {
  title: string;
  author: string;
  status: string;
}

export interface BookWithUuid extends Book {
  uuid: string;
}

export interface Status {
  status: string;
}
