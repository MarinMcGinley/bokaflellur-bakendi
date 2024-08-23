import { Request, Response } from 'express';
import { query } from '../DB/client';
import { idValidation } from '../validation/baseValidation';
import {
  creatingUserValidation,
  updatingUserValidation,
} from '../validation/userValidation';
import { errorHelper } from './helpers';

const getUser = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const id = req.params.id;

    idValidation(id);

    const queryString = `
    SELECT id, first_name, last_name, role, picture, email
    FROM users
    WHERE id = ${id}
    `;

    const results = await query(queryString);

    if (results.rows.length == 0) {
      res.status(404).send();
    }
    res.send(results.rows[0]);
  });
};

const createUser = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const { firstName, lastName, role, pictureUrl, email, password } = req.body;

    /**
     * TODO: only allow admin to create user
     */

    await creatingUserValidation({
      firstName,
      lastName,
      role,
      pictureUrl,
      email,
      password,
    });

    const currentDate = new Date().toISOString();

    const queryString = `
    INSERT INTO users(
      first_name, 
      last_name, 
      role, 
      picture, 
      email, 
      password,
      created, 
      last_updated
    ) VALUES(
     $1, $2, $3, $4, $5, $6, $7, $8
    ) RETURNING *`;

    const values = [
      firstName,
      lastName,
      role,
      pictureUrl,
      email,
      currentDate,
      currentDate,
    ];

    const results = await query(queryString, values);
    res.send(results.rows[0]);
  });
};

const updateUser = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    // TODO: only allow authorised user or admin to update his/her user
    const { firstName, lastName, pictureUrl, email, password } = req.body;

    const { id } = req.params;
    idValidation(id);
    await updatingUserValidation({
      firstName,
      lastName,
      pictureUrl,
      email,
      id,
      password,
    });

    const currentDate = new Date().toISOString();

    const queryString = `
    UPDATE users 
      SET
      ${firstName ? `first_name = '${firstName}', ` : ''}
      ${lastName ? `last_name = '${lastName}', ` : ''}
      ${pictureUrl ? `picture = '${pictureUrl}', ` : ''} 
      ${email ? `email = '${email}', ` : ''}
      ${password ? `password = '${password}', ` : ''}
      last_updated = '${currentDate}'
    WHERE id = ${id}`;

    await query(queryString);

    res.status(204).send();
  });
};

const deleteUser = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const { id } = req.params;
    /**
     * TODO: only allow admins to delete
     */

    idValidation(id);

    const queryString = `DELETE FROM users WHERE id = ${id}`;

    const result = await query(queryString);
    res.status(204).send(result);
  });
};

const getUsers = async (req: Request, res: Response) => {
  errorHelper(req, res, async (_req, res) => {
    const queryString = `SELECT id, first_name, last_name, role, picture, email FROM users`;

    const results = await query(queryString);

    res.send(results.rows);
  });
};

export { getUser, createUser, updateUser, deleteUser, getUsers };
