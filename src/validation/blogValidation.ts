import { query } from '../DB/client';
import { blog, Blog } from '../types/zod';

export const creatingBlogValidation = async (blogData: Blog) => {
  blog.parse(blogData);

  const userQueryString = `SELECT * FROM users WHERE id = ${blogData.blogAuthorId}`;
  const bookQueryString = `SELECT * FROM books WHERE id = ${blogData.bookId}`;

  const bookResult = query(bookQueryString);
  const userResult = query(userQueryString);

  const [awaitedBook, awaitedUser] = await Promise.all([
    bookResult,
    userResult,
  ]);

  if (awaitedUser.rows.length === 0) {
    throw new Error('No user with this ID exists');
  }
  if (awaitedBook.rows.length === 0) {
    throw new Error('No book with this ID exists');
  }
};

export const updatingBlogValidation = async ({
  content,
  draft,
  blogAuthorId,
  bookId,
  id,
}: Partial<Blog> & { id: string }) => {
  blog.partial().parse({ content, draft, blogAuthorId, bookId });

  const queryString = `SELECT * FROM blogs WHERE id = ${id}`;

  const result = await query(queryString);
  if (result.rows.length === 0) {
    throw new Error('No blog with this id exists');
  }

  if (blogAuthorId) {
    const userQueryString = `SELECT * FROM users WHERE id = ${blogAuthorId}`;
    const userResult = await query(userQueryString);
    if (userResult.rows.length === 0) {
      throw new Error('No user with this ID exists');
    }
  }
  if (bookId) {
    const bookQueryString = `SELECT * FROM book WHERE id = ${bookId}`;
    const bookResult = await query(bookQueryString);

    if (bookResult.rows.length === 0) {
      throw new Error('No book with this ID exists');
    }
  }
};
