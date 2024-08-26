import { query } from '../DB/client';
import { idValidation } from '../validation/baseValidation';

export const findUserById = async (id: string) => {
  idValidation(id);
  const queryString = `SELECT * FROM users WHERE id = ${id}`;
  const result = await query(queryString);
  if (result.rows.length === 0) {
    throw new Error('No user with this ID exists');
  }
  return result.rows[0];
};

export const findUserByEmail = async (email: string) => {
  const queryString = `SELECT * FROM users WHERE email = '${email}'`;
  const result = await query(queryString);
  if (result.rows.length === 0) {
    throw new Error('No user with this email exists');
  }
  return result.rows[0];
};
