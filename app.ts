import express, { Express, Request, Response } from 'express';
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from './src/APIs/book';
import { createUser, deleteUser, getUser, updateUser } from './src/APIs/user';
import {
  createBookList,
  deleteBookList,
  getBookList,
  getBookLists,
  updateBookList,
} from './src/APIs/bookList';

const app: Express = express();

app.get('/books/:id', getBook);
app.post('/books', createBook);
app.put('/books', updateBook);
app.delete('/books/:id', deleteBook);
app.get('/books', getBooks);

app.get('/blogs/:id', getBook);
app.post('/blogs', createBook);
app.put('/blogs', updateBook);
app.delete('/blogs/:id', deleteBook);
app.get('/blogs', getBooks);

app.get('/users/:id', getUser);
app.post('/users', createUser);
app.put('/users', updateUser);
app.delete('/users/:id', deleteUser);
app.get('/users', getUser);

app.get('/booklists/:id', getBookList);
app.post('/booklists', createBookList);
app.put('/booklists', updateBookList);
app.delete('/booklists/:id', deleteBookList);
app.get('/booklists', getBookLists);

export default app;
