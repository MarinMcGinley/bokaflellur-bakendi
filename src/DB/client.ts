import pg from 'pg';
const { Client } = pg;

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.PORT || ''),
  database: process.env.DATABASE,
});

client.on('error', (error: Error) => {
  console.log('DB client error', error);
});

export default client;
