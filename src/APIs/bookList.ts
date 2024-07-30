import { Request, Response } from 'express';

const getBookList = (req: Request, res: Response) => {
  const id = req.params.id;
  res.send(id);
};

const createBookList = (req: Request, res: Response) => {
  res.send('createUser');
};

const updateBookList = (req: Request, res: Response) => {
  res.send('updateUser');
};

const deleteBookList = (req: Request, res: Response) => {
  res.send('deleteUser');
};

const getBookLists = (req: Request, res: Response) => {
  res.send('getBookLists');
};

export {
  getBookList,
  createBookList,
  updateBookList,
  deleteBookList,
  getBookLists,
};
