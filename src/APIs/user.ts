import { Request, Response } from 'express';
import { query } from '../DB/client';
import { idValidation } from '../validation/baseValidation';
import {
  creatingUserValidation,
  updatingUserValidation,
} from '../validation/userValidation';

const getUser = async (req: Request, res: Response) => {
  try {
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
  } catch (e) {
    console.error({ error: e });
    if ((e as Error).message) {
      res.status(400).send({
        status: 400,
        message: (e as Error).message,
      });
    } else {
      res.status(500).send({
        status: 500,
        message: e,
      });
    }
  }
};

const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, role, pictureUrl, email } = req.body;

  /**
   * TODO: only allow admin to create user
   */
  try {
    await creatingUserValidation({
      firstName,
      lastName,
      role,
      pictureUrl,
      email,
    });

    const currentDate = new Date().toISOString();

    const queryString = `
    INSERT INTO users(
      first_name, 
      last_name, 
      role, 
      picture, 
      email, 
      created, 
      last_updated
    ) VALUES(
     $1, $2, $3, $4, $5, $6, $7
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
  } catch (e) {
    console.error({ error: e });
    if ((e as Error).message) {
      res.status(400).send({
        status: 400,
        message: (e as Error).message,
      });
    } else {
      res.status(500).send({
        status: 500,
        message: e,
      });
    }
  }
};

const updateUser = async (req: Request, res: Response) => {
  // TODO: only allow authorised user or admin to update his/her user
  const { firstName, lastName, pictureUrl, email } = req.body;

  const { id } = req.params;
  try {
    idValidation(id);
    await updatingUserValidation({
      firstName,
      lastName,
      pictureUrl,
      email,
      id,
    });

    const currentDate = new Date().toISOString();

    const queryString = `
    UPDATE users 
      SET
      ${firstName ? `first_name = '${firstName}', ` : ''}
      ${lastName ? `last_name = '${lastName}', ` : ''}
      ${pictureUrl ? `picture = '${pictureUrl}', ` : ''} 
      ${email ? `email = '${email}', ` : ''}
      last_updated = '${currentDate}'
    WHERE id = ${id}`;

    await query(queryString);

    res.status(204).send();
  } catch (e) {
    console.error({ error: e });
    if ((e as Error).message) {
      res.status(400).send({
        status: 400,
        message: (e as Error).message,
      });
    } else {
      res.status(500).send({
        status: 500,
        message: e,
      });
    }
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  /**
   * TODO: only allow admins to delete
   */
  try {
    idValidation(id);

    const queryString = `DELETE FROM users WHERE id = ${id}`;

    const result = await query(queryString);
    res.status(204).send(result);
  } catch (e) {
    console.error({ error: e });
    if ((e as Error).message) {
      res.status(400).send({
        status: 400,
        message: (e as Error).message,
      });
    } else {
      res.status(500).send({
        status: 500,
        message: e,
      });
    }
  }
};

const getUsers = async (_req: Request, res: Response) => {
  try {
    const queryString = `SELECT id, first_name, last_name, role, picture, email FROM users`;

    const results = await query(queryString);

    res.send(results.rows);
  } catch (e) {
    console.error({ error: e });
    res.status(500).send({
      status: 500,
      message: e,
    });
  }
};

export { getUser, createUser, updateUser, deleteUser, getUsers };
