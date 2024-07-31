import 'dotenv/config';
import app from './app';
import { client } from './src/DB/client';

const port = process.env.PORT || 3000;

const start = async () => {
  await client.connect();

  console.log('DB Client is connected');

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

start();
