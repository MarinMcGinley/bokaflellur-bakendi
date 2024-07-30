import { Request, Response } from 'express';

const getUser = (req: Request, res: Response) => {
  const id = req.params.id;
  res.send(id);
};

const createUser = (req: Request, res: Response) => {
  res.send('createUser');
};

const updateUser = (req: Request, res: Response) => {
  res.send('updateUser');
};

const deleteUser = (req: Request, res: Response) => {
  res.send('deleteUser');
};

const getUsers = (req: Request, res: Response) => {
  res.send('getUsers');
};

export { getUser, createUser, updateUser, deleteUser, getUsers };
