import { SHELF_BOOKS, type ShelfBook } from '@/lib/data/shelf-books';

const getShelfBookByIsbn = (isbn: string): ShelfBook => {
  const book = SHELF_BOOKS.find((item) => item.isbn === isbn);

  if (!book) {
    throw new Error(`Missing shelf book for ISBN ${isbn}`);
  }

  return book;
};

export const FEATURE_MOCK_BOOKS = {
  scan: getShelfBookByIsbn('9780141439518'),
  session: getShelfBookByIsbn('9780062315007'),
  author: getShelfBookByIsbn('9780451524935'),
} as const;
