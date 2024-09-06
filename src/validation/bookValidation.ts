import { requireAdminOrPersonalUser } from '../auth/auth';
import { query } from '../DB/client';
import { DBBook, DBBookList, DBUser } from '../types/dbTypes';
import { book, Book } from '../types/zod';

export const creatingBookValidation = async (
  bookData: Omit<Book, 'id' | 'created' | 'lastUpdated'>
) => {
  book.omit({ id: true, created: true, lastUpdated: true }).parse(bookData);

  const userQueryString = `SELECT * FROM users WHERE id = ${bookData.recommenderId}`;
  const bookListQueryString = `SELECT * FROM book_lists WHERE id = ${bookData.bookListId}`;

  const bookListResult = query<DBBookList>(bookListQueryString);
  const userResult = query<DBUser>(userQueryString);

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
  user,
}: Partial<Book> & { user: any }) => {
  book
    .omit({ created: true, lastUpdated: true })
    .partial()
    .parse({ title, author, link, recommenderId, bookListId });

  const queryString = `SELECT * FROM books WHERE id = ${id}`;

  const result = await query<DBBook>(queryString);
  if (result.rows.length === 0) {
    throw new Error('No book with this id exists');
  }

  requireAdminOrPersonalUser(result.rows[0].recommender_id, user);

  if (recommenderId) {
    const userQueryString = `SELECT * FROM users WHERE id = ${recommenderId}`;
    const userResult = await query<DBUser>(userQueryString);
    if (userResult.rows.length === 0) {
      throw new Error('No user with this ID exists');
    }
  }
  if (bookListId) {
    const bookListQueryString = `SELECT * FROM book_lists WHERE id = ${bookListId}`;
    const bookListResult = await query<DBBookList>(bookListQueryString);

    if (bookListResult.rows.length === 0) {
      throw new Error('No book list with this ID exists');
    }
  }
};
