import express, { Express, Request, Response } from 'express';
import { createBook, deleteBook, getBook, getBooks } from './src/APIs/book';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Express + ');
});

app.get('/book/:id', getBook);
app.post('/book', createBook);
app.delete('/book/:id', deleteBook);
app.get('/book', getBooks);

export default app;
