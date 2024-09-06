import { requireAdminOrPersonalUser } from '../auth/auth';
import { query } from '../DB/client';
import { DBUser } from '../types/dbTypes';
import { user, User } from '../types/zod';

export const creatingUserValidation = async (
  userData: Omit<User, 'id' | 'lastUpdated' | 'created'>
) => {
  user.omit({ id: true, lastUpdated: true, created: true }).parse(userData);

  const queryString = `SELECT * FROM users WHERE email = '${userData.email}'`;

  const result = await query<DBUser>(queryString);
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
  user
    .omit({ lastUpdated: true, created: true })
    .partial()
    .parse({ firstName, lastName, pictureUrl, email });

  const queryString = `SELECT * FROM users WHERE id = ${id}`;

  const result = await query<DBUser>(queryString);
  if (result.rows.length === 0) {
    throw new Error('No user with this id exists');
  }

  if (email) {
    const queryString = `SELECT * FROM users WHERE email = '${email}'`;

    const result = await query<DBUser>(queryString);
    if (result.rows.length > 0) {
      throw new Error('A user with this email already exists');
    }
  }
};

export const loginValidation = (email: string, password: string) => {
  user.pick({ email: true, password: true }).parse({ email, password });
};
