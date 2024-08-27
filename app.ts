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
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
} from './src/APIs/blog';

import auth, { loginRoute, requireAdmin, requireAuth } from './src/auth/auth';

// TODO! Add sanitization

const app: Express = express();

app.use(express.json());

// TODO! For later
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   next();
// });

app.use(auth);

app.post('/login', loginRoute);

app.get('/books/:id', getBook);
app.post('/books', requireAuth, createBook);
app.patch('/books/:id', requireAuth, updateBook);
app.delete('/books/:id', requireAuth, requireAdmin, deleteBook);
app.get('/books', getBooks);

app.get('/blogs/:id', getBlog);
app.post('/blogs', requireAuth, createBlog);
app.patch('/blogs/:id', requireAuth, updateBlog);
app.delete('/blogs/:id', requireAuth, requireAdmin, deleteBlog);
app.get('/blogs', getBlogs);

app.get('/users/:id', getUser);
app.post('/users', requireAuth, requireAdmin, createUser);
app.patch('/users/:id', requireAuth, updateUser);
app.delete('/users/:id', requireAuth, requireAdmin, deleteUser);
app.get('/users', getUsers);

app.get('/booklists/:id', getBookList);
app.post('/booklists', requireAuth, requireAdmin, createBookList);
app.patch('/booklists/:id', requireAuth, requireAdmin, updateBookList);
app.delete('/booklists/:id', requireAuth, requireAdmin, deleteBookList);
app.get('/booklists', getBookLists);

export default app;
