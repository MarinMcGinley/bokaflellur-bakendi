import { Request, Response } from 'express';

const getBook = (req: Request, res: Response) => {
  const id = req.params.id;
  res.send(id);
};

const createBook = (req: Request, res: Response) => {
  res.send('CreateBook');
};

const deleteBook = (req: Request, res: Response) => {
  res.send('deleteBook');
};

const getBooks = (req: Request, res: Response) => {
  res.send('getBooks');
};

export { getBook, createBook, deleteBook, getBooks };
