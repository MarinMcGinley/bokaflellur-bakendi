import { query } from '../DB/client';
import { DBBookList } from '../types/dbTypes';
import { bookList, BookList } from '../types/zod';

export const creatingBookListValidation = async (
  bookListData: Omit<BookList, 'id' | 'lastUpdated' | 'created'>
) => {
  bookList
    .omit({ id: true, created: true, lastUpdated: true })
    .parse(bookListData);
};

export const updatingBookListValidation = async ({
  name,
  description,
  published,
  id,
}: Partial<BookList>) => {
  bookList
    .omit({ created: true, lastUpdated: true })
    .partial()
    .parse({ name, description, published });

  const queryString = `SELECT * FROM book_lists WHERE id = ${id}`;

  const result = await query<DBBookList>(queryString);
  if (result.rows.length === 0) {
    throw new Error('No book list with this id exists');
  }
};
