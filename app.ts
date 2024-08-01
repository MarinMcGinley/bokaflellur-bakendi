import express, { Express } from 'express';
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from './src/APIs/book';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from './src/APIs/user';
import {
  createBookList,
  deleteBookList,
  getBookList,
  getBookLists,
  updateBookList,
} from './src/APIs/bookList';

const app: Express = express();

app.use(express.json());

/**
 * Add authorization and authentication
 */
app.get('/books/:id', getBook);
app.post('/books', createBook);
app.put('/books/:id', updateBook);
app.delete('/books/:id', deleteBook);
app.get('/books', getBooks);

app.get('/blogs/:id', getBook);
app.post('/blogs', createBook);
app.put('/blogs', updateBook);
app.delete('/blogs/:id', deleteBook);
app.get('/blogs', getBooks);

app.get('/users/:id', getUser);
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);
app.get('/users', getUsers);

app.get('/booklists/:id', getBookList);
app.post('/booklists', createBookList);
app.put('/booklists/:id', updateBookList);
app.delete('/booklists/:id', deleteBookList);
app.get('/booklists', getBookLists);

export default app;
