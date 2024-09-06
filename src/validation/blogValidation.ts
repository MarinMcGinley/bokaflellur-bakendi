import { requireAdminOrPersonalUser } from '../auth/auth';
import { query } from '../DB/client';
import { DBBlog, DBBook, DBUser } from '../types/dbTypes';
import { blog, Blog } from '../types/zod';

export const creatingBlogValidation = async (
  blogData: Omit<
    Blog,
    | 'id'
    | 'lastUpdated'
    | 'created'
    | 'blogAuthorFirstName'
    | 'blogAuthorLastName'
    | 'bookTitle'
  >
) => {
  blog
    .omit({
      id: true,
      lastUpdated: true,
      created: true,
      blogAuthorFirstName: true,
      blogAuthorLastName: true,
      bookTitle: true,
    })
    .parse(blogData);

  const userQueryString = `SELECT * FROM users WHERE id = ${blogData.blogAuthorId}`;
  const bookQueryString = `SELECT * FROM books WHERE id = ${blogData.bookId}`;

  const bookResult = query<DBBook>(bookQueryString);
  const userResult = query<DBUser>(userQueryString);

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
  user,
}: Partial<Blog> & { user: any }) => {
  blog
    .omit({
      created: true,
      lastUpdated: true,
      blogAuthorFirstName: true,
      blogAuthorLastName: true,
      bookTitle: true,
    })
    .partial()
    .parse({ content, draft, blogAuthorId, bookId });

  const queryString = `SELECT * FROM blogs WHERE id = ${id}`;

  const result = await query<DBBlog>(queryString);
  if (result.rows.length === 0) {
    throw new Error('No blog with this id exists');
  }

  requireAdminOrPersonalUser(result.rows[0].blog_author_id, user);

  if (blogAuthorId) {
    const userQueryString = `SELECT * FROM users WHERE id = ${blogAuthorId}`;
    const userResult = await query<DBUser>(userQueryString);
    if (userResult.rows.length === 0) {
      throw new Error('No user with this ID exists');
    }
  }
  if (bookId) {
    const bookQueryString = `SELECT * FROM book WHERE id = ${bookId}`;
    const bookResult = await query<DBBook>(bookQueryString);

    if (bookResult.rows.length === 0) {
      throw new Error('No book with this ID exists');
    }
  }
};
