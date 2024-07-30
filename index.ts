import 'dotenv/config';
import app from './app';
import client from './src/DB/client';

const port = process.env.PORT || 3000;

client.connect(() => {
  console.log('DB Client is connected');

  // TODO: fix this, put outside of promise and use await rather
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
});
