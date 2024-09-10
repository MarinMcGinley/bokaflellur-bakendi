import { Request, Response } from 'express';
import { query } from '../DB/client';
import { errorHelper } from './helpers';
import { idValidation } from '../validation/baseValidation';
import {
  creatingBookListValidation,
  updatingBookListValidation,
} from '../validation/bookListValidation';
import { DBBook, DBBookList } from '../types/dbTypes';
import { mapBook, mapBookList } from '../utils/mappings';

const getBookList = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const id = req.params.id;
    idValidation(id);

    const bookListQueryString = `
      SELECT *
      FROM book_lists
      WHERE id = ${id}
    `;

    const bookQueryString = `
      SELECT *
      FROM books
      WHERE book_list_id = ${id}
    `;

    const [bookListResults, bookResults] = await Promise.all([
      query<DBBookList>(bookListQueryString),
      query<DBBook>(bookQueryString),
    ]);

    if (bookListResults.rows.length == 0) {
      return res.status(404).send();
    }

    const mappedBookListResults = bookListResults.rows.map(mapBookList);
    const mappedBookResults = bookResults.rows.map(mapBook);

    const finalResult = {
      ...mappedBookListResults[0],
      books: mappedBookResults,
    };

    return res.send(finalResult);
  });
};

const createBookList = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const { name, description, published } = req.body;

    await creatingBookListValidation({ name, description, published });

    const currentDate = new Date().toISOString();

    const queryString = `
    INSERT INTO book_lists(
      name,
      description,
      published,
      created, 
      last_updated
    ) VALUES(
     $1, $2, $3, $4, $5
    ) RETURNING *`;

    const values = [name, description, published, currentDate, currentDate];

    const results = await query<DBBookList>(queryString, values);
    const mappedResults = results.rows.map(mapBookList);

    return res.send(mappedResults[0]);
  });
};

const updateBookList = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const { id } = req.params;
    const { name, description, published } = req.body;

    idValidation(id);
    await updatingBookListValidation({
      name,
      description,
      published,
      id: parseInt(id),
    });

    const currentDate = new Date().toISOString();

    const queryString = `
    UPDATE book_lists 
      SET
      ${name ? `name = '${name}', ` : ''}
      ${description ? `description = '${description}', ` : ''}
      ${published ? `published = '${published}', ` : ''} 
      last_updated = '${currentDate}'
    WHERE id = ${id}`;

    await query(queryString);

    return res.status(204).send();
  });
};

const deleteBookList = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const { id } = req.params;
    idValidation(id);

    const queryString = `DELETE FROM book_lists WHERE id = ${id}`;

    await query(queryString);
    return res.status(204).send();
  });
};

const getBookLists = async (req: Request, res: Response) => {
  errorHelper(req, res, async (_req, res) => {
    const bookListQueryString = `SELECT * FROM book_lists`;

    const results = await query<DBBookList>(bookListQueryString);

    const mappedResults = results.rows.map(mapBookList);
    const [...allBooks] = await Promise.all(
      mappedResults.map((bookList) => {
        return query<DBBook>(
          `SELECT * FROM books WHERE book_list_id = ${bookList.id}`
        );
      })
    );

    const finalResults = mappedResults.map((bookList) => {
      return {
        ...bookList,
        books:
          allBooks
            .find(
              (book) =>
                book.rows.length > 0 &&
                book.rows[0].book_list_id === bookList.id
            )
            ?.rows?.map(mapBook) ?? [],
      };
    });

    return res.send(finalResults);
  });
};

export {
  getBookList,
  createBookList,
  updateBookList,
  deleteBookList,
  getBookLists,
};
