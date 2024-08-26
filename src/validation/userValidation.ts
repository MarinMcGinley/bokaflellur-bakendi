import { requireAdminOrPersonalUser } from '../auth/auth';
import { query } from '../DB/client';
import { user, User } from '../types/zod';

export const creatingUserValidation = async (userData: Omit<User, 'id'>) => {
  user.omit({ id: true }).parse(userData);

  const queryString = `SELECT * FROM users WHERE email = '${userData.email}'`;

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
}: Partial<User>) => {
  user.partial().parse({ firstName, lastName, pictureUrl, email });

  const queryString = `SELECT * FROM users WHERE id = ${id}`;

  const result = await query(queryString);
  if (result.rows.length === 0) {
    throw new Error('No user with this id exists');
  }

  if (email) {
    const queryString = `SELECT * FROM users WHERE email = '${email}'`;

    const result = await query(queryString);
    if (result.rows.length > 0) {
      throw new Error('A user with this email already exists');
    }
  }
};

export const loginValidation = async (email: string, password: string) => {
  user.pick({ email: true, password: true }).parse({ email, password });
};
