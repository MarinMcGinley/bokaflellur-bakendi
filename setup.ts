import 'dotenv/config';

import { client, query } from './src/DB/client';

const { readFile } = require('node:fs/promises');

const setup = async () => {
  await client.connect();

  await query('DROP TABLE IF EXISTS users CASCADE');
  await query('DROP TABLE IF EXISTS book_lists CASCADE');
  await query('DROP TABLE IF EXISTS books CASCADE');
  await query('DROP TABLE IF EXISTS blogs CASCADE');

  console.log('All tables dropped');

  try {
    const schema = await readFile('./init.sql');

    await query(schema.toString('utf8'));

    console.log('Tables created');
  } catch (error) {
    console.log('Unable to create all tables', error);
  }
};

setup();
