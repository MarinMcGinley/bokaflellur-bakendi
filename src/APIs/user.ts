import { Request, Response } from 'express';
import { query } from '../DB/client';
import { idValidation } from '../validation/baseValidation';
import {
  creatingUserValidation,
  updatingUserValidation,
} from '../validation/userValidation';
import { errorHelper } from './helpers';
import { hashPassword } from '../auth/crypt';
import { requireAdminOrPersonalUser } from '../auth/auth';

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
      return res.status(404).send();
    }
    return res.send(results.rows[0]);
  });
};

const createUser = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const { firstName, lastName, role, pictureUrl, email, password } = req.body;

    await creatingUserValidation({
      firstName,
      lastName,
      role,
      pictureUrl,
      email,
      password,
    });

    const hashedPassword = await hashPassword(password);

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
      hashedPassword,
      currentDate,
      currentDate,
    ];

    const results = await query(queryString, values);
    return res.send(results.rows[0]);
  });
};

const updateUser = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const { firstName, lastName, pictureUrl, email, password } = req.body;
    const user = req.user;

    const { id } = req.params;

    requireAdminOrPersonalUser(parseInt(id), user);

    idValidation(id);
    await updatingUserValidation({
      firstName,
      lastName,
      pictureUrl,
      email,
      id: parseInt(id),
      password,
    });

    let hashedPassword = '';
    if (password) {
      hashedPassword = await hashPassword(password);
    }

    const currentDate = new Date().toISOString();

    const queryString = `
    UPDATE users 
      SET
      ${firstName ? `first_name = '${firstName}', ` : ''}
      ${lastName ? `last_name = '${lastName}', ` : ''}
      ${pictureUrl ? `picture = '${pictureUrl}', ` : ''} 
      ${email ? `email = '${email}', ` : ''}
      ${password ? `password = '${hashedPassword}', ` : ''}
      last_updated = '${currentDate}'
    WHERE id = ${id}`;

    await query(queryString);

    return res.status(204).send();
  });
};

const deleteUser = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const { id } = req.params;

    idValidation(id);

    const queryString = `DELETE FROM users WHERE id = ${id}`;

    const result = await query(queryString);
    return res.status(204).send(result);
  });
};

const getUsers = async (req: Request, res: Response) => {
  errorHelper(req, res, async (_req, res) => {
    const queryString = `SELECT id, first_name, last_name, role, picture, email FROM users`;

    const results = await query(queryString);

    return res.send(results.rows);
  });
};

export { getUser, createUser, updateUser, deleteUser, getUsers };
