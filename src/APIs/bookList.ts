import { Request, Response } from 'express';
import { query } from '../DB/client';
import { errorHelper } from './helpers';
import { idValidation } from '../validation/baseValidation';
import {
  creatingBookListValidation,
  updatingBookListValidation,
} from '../validation/bookListValidation';

const getBookList = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const id = req.params.id;
    idValidation(id);

    const queryString = `
    SELECT *
    FROM book_lists
    WHERE id = ${id}
  `;

    const results = await query(queryString);

    if (results.rows.length == 0) {
      res.status(404).send();
    }
    res.send(results.rows[0]);
  });
};

const createBookList = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const { name, description, published } = req.body;

    await creatingBookListValidation({ name, description, published });
    // only allow admin to create a book bookList

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

    const results = await query(queryString, values);
    res.send(results.rows[0]);
  });
};

const updateBookList = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const { id } = req.params;
    const { name, description, published } = req.body;

    idValidation(id);
    await updatingBookListValidation({ name, description, published, id });

    // TODO: only allow admin to edit a bookList

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

    res.status(204).send();
  });
};

const deleteBookList = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const { id } = req.params;
    idValidation(id);
    /**
     * TODO: only allow admins to delete
     */

    const queryString = `DELETE FROM book_lists WHERE id = ${id}`;

    const result = await query(queryString);
    res.status(204).send(result);
  });
};

const getBookLists = async (req: Request, res: Response) => {
  errorHelper(req, res, async (_req, res) => {
    const queryString = `SELECT * FROM book_lists`;

    const results = await query(queryString);

    res.send(results.rows);
  });
};

export {
  getBookList,
  createBookList,
  updateBookList,
  deleteBookList,
  getBookLists,
};
