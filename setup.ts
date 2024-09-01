import 'dotenv/config';

import { client, query } from './src/DB/client';

import { readFile } from 'node:fs/promises';
import { hashPassword } from './src/auth/crypt';

const {
  DB_ADMIN_FIRST_NAME: adminFirstName = '',
  DB_ADMIN_LAST_NAME: adminLastName = '',
  DB_ADMIN_EMAIL: adminEmail = '',
  DB_ADMIN_PASSWORD: adminPassword = '',
} = process.env;

const insertAdmin = async () => {
  const currentDate = new Date().toISOString();
  const hashedPassword = await hashPassword(adminPassword);
  const insertAdminQuery =
    'INSERT INTO users (first_name, last_name, email, password, role, created, last_updated) VALUES ($1, $2, $3, $4, $5, $6, $7)';
  const values = [
    adminFirstName,
    adminLastName,
    adminEmail,
    hashedPassword,
    'admin',
    currentDate,
    currentDate,
  ];
  await query(insertAdminQuery, values);
};

const setup = async () => {
  await client.connect();

  const users = query('DROP TABLE IF EXISTS users CASCADE');
  const bookLists = query('DROP TABLE IF EXISTS book_lists CASCADE');
  const books = query('DROP TABLE IF EXISTS books CASCADE');
  const blogs = query('DROP TABLE IF EXISTS blogs CASCADE');

  await Promise.all([users, bookLists, books, blogs]);

  console.log('All tables dropped');

  try {
    const schema = await readFile('./init.sql');

    await query(schema.toString('utf8'));
    console.log('Tables created');

    await insertAdmin();
    console.log('Admin inserted');
  } catch (error) {
    console.log('Unable to create all tables', error);
  }
};

setup();
