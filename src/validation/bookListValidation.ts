import { query } from '../DB/client';
import { bookList, BookList } from '../types/zod';

export const creatingBookListValidation = async (bookListData: BookList) => {
  bookList.parse(bookListData);
};

export const updatingBookListValidation = async ({
  name,
  description,
  published,
  id,
}: Partial<BookList> & { id: string }) => {
  bookList.partial().parse({ name, description, published });

  const queryString = `SELECT * FROM book_lists WHERE id = ${id}`;

  const result = await query(queryString);
  if (result.rows.length === 0) {
    throw new Error('No book list with this id exists');
  }
};
