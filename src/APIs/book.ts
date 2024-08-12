import { Request, Response } from 'express';
import { query } from '../DB/client';
import { idValidation } from '../validation/baseValidation';
import { errorHelper } from './helpers';
import {
  creatingBookValidation,
  updatingBookValidation,
} from '../validation/bookValidation';

const getBook = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const id = req.params.id;
    idValidation(id);

    // LEFT OUTER JOIN just in case the rules will change later
    const queryString = `
    SELECT 
      books.id, 
      title, 
      author, 
      link, 
      users.id as recommender_id, 
      users.first_name as recommender_first_name, 
      users.last_name as recommender_last_name, 
      book_lists.id as book_list_id, 
      book_lists.name as book_list_name
    FROM books 
      LEFT OUTER JOIN users ON books.recommender_id = users.id
      LEFT OUTER JOIN book_lists ON books.book_list_id = book_lists.id    
    WHERE books.id = ${id}
  `;

    const results = await query(queryString);

    if (results.rows.length == 0) {
      res.status(404).send();
    }
    res.send(results.rows[0]);
  });
};

const createBook = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const { title, author, link, recommenderId, bookListId } = req.body;

    await creatingBookValidation({
      title,
      author,
      link,
      recommenderId,
      bookListId,
    });

    /**
     * only allow admin to create user
     */

    const currentDate = new Date().toISOString();

    const queryString = `
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

    const values = [
      title,
      author,
      link,
      recommenderId,
      bookListId,
      currentDate,
      currentDate,
    ];

    const results = await query(queryString, values);
    res.send(results.rows[0]);
  });
};

const updateBook = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const { title, author, link, recommenderId, bookListId } = req.body;
    const { id } = req.params;

    idValidation(id);
    await updatingBookValidation({
      id,
      title,
      author,
      link,
      recommenderId,
      bookListId,
    });

    const currentDate = new Date().toISOString();

    /**  TODO: only allow user to edit book with his own recommenderId
     */

    // TODO!! Make sure to change single quote to double quote: https://stackoverflow.com/questions/12316953/insert-text-with-single-quotes-in-postgresql
    const queryString = `
    UPDATE books 
      SET
      ${title ? `title = '${title.replace(`'`, `''`)}', ` : ''}
      ${author ? `author = '${author}', ` : ''}
      ${link ? `link = '${link}', ` : ''} 
      ${recommenderId ? `recommender_id = '${recommenderId}', ` : ''}
      ${bookListId ? `book_list_id = '${bookListId}', ` : ''}
      last_updated = '${currentDate}'
    WHERE id = ${id}`;

    await query(queryString);

    res.status(204).send();
  });
};

const deleteBook = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    /**
     * TODO: only allow admins to delete
     */

    const { id } = req.params;
    idValidation(id);

    const queryString = `DELETE FROM books WHERE id = ${id}`;

    const result = await query(queryString);
    res.status(204).send(result);
  });
};

const getBooks = async (req: Request, res: Response) => {
  errorHelper(req, res, async (_req, res) => {
    const queryString = `SELECT id, title, author, link, recommender_id, book_list_id, created, last_updated FROM books`;

    const results = await query(queryString);

    res.send(results.rows);
  });
};

export { getBook, createBook, updateBook, deleteBook, getBooks };
