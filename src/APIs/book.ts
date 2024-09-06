import { Request, Response } from 'express';
import { query } from '../DB/client';
import { idValidation } from '../validation/baseValidation';
import { errorHelper } from './helpers';
import {
  creatingBookValidation,
  updatingBookValidation,
} from '../validation/bookValidation';
import { User } from '../types/zod';
import { mapBook } from '../utils/mappings';
import { DBBook } from '../types/dbTypes';

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

    const results = await query<DBBook>(queryString);

    if (results.rows.length == 0) {
      return res.status(404).send();
    }
    const mappedResults = results.rows.map(mapBook);
    return res.send(mappedResults[0]);
  });
};

const createBook = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const { title, author, link, bookListId } = req.body;

    const { id: recommenderId } = req.user as User;

    await creatingBookValidation({
      title,
      author,
      link,
      recommenderId,
      bookListId,
    });

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

    const results = await query<DBBook>(queryString, values);
    const mappedResults = results.rows.map(mapBook);

    return res.send(mappedResults[0]);
  });
};

const updateBook = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const { title, author, link, bookListId } = req.body;
    const { id } = req.params;

    idValidation(id);
    await updatingBookValidation({
      id: parseInt(id),
      title,
      author,
      link,
      bookListId,
      user: req.user,
    });

    const currentDate = new Date().toISOString();

    // TODO!! Make sure to change single quote to double quote: https://stackoverflow.com/questions/12316953/insert-text-with-single-quotes-in-postgresql
    const queryString = `
    UPDATE books 
      SET
      ${title ? `title = '${title.replace(`'`, `''`)}', ` : ''}
      ${author ? `author = '${author}', ` : ''}
      ${link ? `link = '${link}', ` : ''} 
      ${bookListId ? `book_list_id = '${bookListId}', ` : ''}
      last_updated = '${currentDate}'
    WHERE id = ${id}`;

    await query(queryString);

    return res.status(204).send();
  });
};

const deleteBook = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const { id } = req.params;
    idValidation(id);

    const queryString = `DELETE FROM books WHERE id = ${id}`;

    await query(queryString);
    return res.status(204).send();
  });
};

const getBooks = async (req: Request, res: Response) => {
  errorHelper(req, res, async (_req, res) => {
    const queryString = `
    SELECT 
      id, 
      title, 
      author, 
      link, 
      recommender_id, 
      book_list_id, 
      created, 
      last_updated 
    FROM books`;

    const results = await query<DBBook>(queryString);

    const mappedResults = results.rows.map(mapBook);
    return res.send(mappedResults);
  });
};

export { getBook, createBook, updateBook, deleteBook, getBooks };
