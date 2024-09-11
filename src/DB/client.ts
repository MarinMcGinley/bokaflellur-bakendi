import pg from 'pg';
const { Client } = pg;

const client = new Client({
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || ''),
});

client.on('error', (error: Error) => {
  console.error('DB client error', error);
});

const query = async <T>(
  queryText: string,
  values?: Array<string | number | boolean>
): Promise<{ rows: T[] }> => {
  const result = await client.query(queryText, values);
  return result;
};

export { client, query };
