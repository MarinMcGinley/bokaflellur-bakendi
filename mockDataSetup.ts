import 'dotenv/config';

import { client, query } from './src/DB/client';

import { hashPassword } from './src/auth/crypt';
import { mockBookData, mockBookListData, mockUserData } from './testData';

const { DB_FAKE_PASSWORD: fakePassword = '' } = process.env;

const insertMockData = async () => {
  const userQueryString = `
    INSERT INTO users(
      first_name,
      last_name,
      email,
      password,
      role,
      created,
      last_updated
    ) VALUES(
      $1, $2, $3, $4, $5, $6, $7
    ) RETURNING *`;

  const bookListQueryString = `
    INSERT INTO book_lists(
      name,
      description,
      published,
      created,
      last_updated
    ) VALUES(
      $1, $2, $3, $4, $5
    ) RETURNING *`;

  const bookQueryString = `
    INSERT INTO books(
      title,
      author,
      link,
      recommender_id,
      book_list_id,
      created,
      last_updated
    ) VALUES(
      $1, $2, $3, $4, $5, $6, $7
    ) RETURNING *`;

  try {
    await client.connect();
    const hashedPassword = await hashPassword(fakePassword);

    await Promise.all([
      ...mockUserData.map(async (user) =>
        query(userQueryString, [
          user.firstName,
          user.lastName,
          user.email,
          hashedPassword,
          user.role,
          user.created,
          user.lastUpdated,
        ])
      ),
      ...mockBookListData.map(async (bookList) =>
        query(bookListQueryString, [
          bookList.name,
          bookList.description,
          bookList.published,
          bookList.created,
          bookList.lastUpdated,
        ])
      ),
    ]);
    console.log('Users and book lists inserted');

    await Promise.all(
      mockBookData.map(async (book) =>
        query(bookQueryString, [
          book.title,
          book.author,
          book.link,
          book.recommenderId,
          book.bookListId,
          book.created,
          book.lastUpdated,
        ])
      )
    );
    console.log('Books inserted');
  } catch (error) {
    console.log('Unable to insert mock data', error);
  }
};

insertMockData();
