import { DBBlog, DBBook, DBBookList, DBUser } from '../types/dbTypes';
import { Blog, Book, BookList, User } from '../types/zod';

export const mapUser = (
  user: Omit<DBUser, 'password'>
): Omit<User, 'password'> => {
  const { first_name, last_name, picture_url, last_updated, ...rest } = user;
  return {
    firstName: first_name,
    lastName: last_name,
    pictureUrl: picture_url,
    lastUpdated: last_updated,
    ...rest,
  };
};

export const mapBook = (book: DBBook): Book => {
  const { recommender_id, book_list_id, last_updated, ...rest } = book;
  return {
    recommenderId: recommender_id,
    bookListId: book_list_id,
    lastUpdated: last_updated,
    ...rest,
  };
};

export const mapBookList = (bookList: DBBookList): BookList => {
  const { last_updated, ...rest } = bookList;
  return {
    lastUpdated: last_updated,
    ...rest,
  };
};

export const mapBlog = (blog: DBBlog): Blog => {
  const {
    blog_author_id,
    book_id,
    last_updated,
    blog_author_first_name,
    blog_author_last_name,
    book_title,
    ...rest
  } = blog;
  return {
    blogAuthorId: blog_author_id,
    bookId: book_id,
    lastUpdated: last_updated,
    blogAuthorFirstName: blog_author_first_name,
    blogAuthorLastName: blog_author_last_name,
    bookTitle: book_title,
    ...rest,
  };
};
