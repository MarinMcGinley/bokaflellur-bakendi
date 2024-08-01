import { Request, Response } from 'express';
import { query } from '../DB/client';

const getUser = async (req: Request, res: Response) => {
  const id = req.params.id;

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
};

const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, role, pictureUrl, email } = req.body;

  /**
   * TODO: validate values from body
   * only allow admin to create user
   */
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
};

const updateUser = async (req: Request, res: Response) => {
  const { firstName, lastName, pictureUrl, email } = req.body;

  const { id } = req.params;

  const currentDate = new Date().toISOString();

  /**  TODO: add validation + only allow role to be edited by admin
   * only allow admin to edit other users
   * check first if item with this id exists
   * only allow user to edit its own user
   */
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
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  /**
   * TODO: only allow admins to delete
   */

  const queryString = `DELETE FROM users WHERE id = ${id}`;

  const result = await query(queryString);
  res.status(204).send(result);
};

const getUsers = async (_req: Request, res: Response) => {
  const queryString = `SELECT id, first_name, last_name, role, picture, email FROM users`;

  const results = await query(queryString);

  if (results.rows.length == 0) {
    res.status(404).send();
  }
  res.send(results.rows);
};

export { getUser, createUser, updateUser, deleteUser, getUsers };
