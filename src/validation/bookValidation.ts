import { query } from '../DB/client';
import { book, Book } from '../types/zod';

export const creatingBookValidation = async (bookData: Book) => {
  book.parse(bookData);

  const userQueryString = `SELECT * FROM users WHERE id = ${bookData.recommenderId}`;
  const bookListQueryString = `SELECT * FROM book_lists WHERE id = ${bookData.bookListId}`;

  const bookListResult = query(bookListQueryString);
  const userResult = query(userQueryString);

  const [awaitedBookList, awaitedUser] = await Promise.all([
    bookListResult,
    userResult,
  ]);

  if (awaitedUser.rows.length === 0) {
    throw new Error('No user with this ID exists');
  }
  if (awaitedBookList.rows.length === 0) {
    throw new Error('No book list with this ID exists');
  }
};

export const updatingBookValidation = async ({
  title,
  author,
  link,
  recommenderId,
  bookListId,
  id,
}: Partial<Book> & { id: string }) => {
  book.partial().parse({ title, author, link, recommenderId, bookListId });

  const queryString = `SELECT * FROM books WHERE id = ${id}`;

  const result = await query(queryString);
  if (result.rows.length === 0) {
    throw new Error('No book with this id exists');
  }

  if (recommenderId) {
    const userQueryString = `SELECT * FROM users WHERE id = ${recommenderId}`;
    const userResult = await query(userQueryString);
    if (userResult.rows.length === 0) {
      throw new Error('No user with this ID exists');
    }
  }
  if (bookListId) {
    const bookListQueryString = `SELECT * FROM book_lists WHERE id = ${bookListId}`;
    const bookListResult = await query(bookListQueryString);

    if (bookListResult.rows.length === 0) {
      throw new Error('No book list with this ID exists');
    }
  }
};
