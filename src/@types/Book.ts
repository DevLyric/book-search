export interface Book {
  id: string;
  volumeInfo: {
    imageLinks?: {
      thumbnail: string;
    };
    title: string;
    authors?: string[];
    description?: string;
    publisher?: string;
    publishedDate?: string;
    categories?: string[];
    pageCount?: number;
    industryIdentifiers?: { type: string; identifier: string }[];
  };
}
