import { query } from '../DB/client';
import {
  emailValidation,
  nameValidation,
  roleValidation,
  urlValidation,
} from './userHelperValidation';

type User = {
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  pictureUrl: string;
  email: string;
};

export const creatingUserValidation = async ({
  firstName,
  lastName,
  role,
  pictureUrl,
  email,
}: User) => {
  nameValidation(firstName);
  nameValidation(lastName);
  roleValidation(role);
  urlValidation(pictureUrl);
  emailValidation(email);

  const queryString = `SELECT * FROM users WHERE email = '${email}'`;

  const result = await query(queryString);
  if (result.rows.length > 0) {
    throw new Error('A user with this email already exists');
  }
};

export const updatingUserValidation = async ({
  firstName,
  lastName,
  pictureUrl,
  email,
  id,
}: Partial<User> & { id: string }) => {
  const queryString = `SELECT * FROM users WHERE id = ${id}`;

  const result = await query(queryString);
  if (result.rows.length === 0) {
    throw new Error('No user with this id exists');
  }

  if (firstName) nameValidation(firstName);
  if (lastName) nameValidation(lastName);
  if (pictureUrl) urlValidation(pictureUrl);
  if (email) {
    emailValidation(email);
    const queryString = `SELECT * FROM users WHERE email = '${email}'`;

    const result = await query(queryString);
    if (result.rows.length > 0) {
      throw new Error('A user with this email already exists');
    }
  }
};
