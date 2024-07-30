import { Request, Response } from 'express';

const getBlog = (req: Request, res: Response) => {
  const id = req.params.id;
  res.send(id);
};

const createBlog = (req: Request, res: Response) => {
  res.send('createBlog');
};

const updateBlog = (req: Request, res: Response) => {
  res.send('updateBlog');
};

const deleteBlog = (req: Request, res: Response) => {
  res.send('deleteBlog');
};

const getBlogs = (req: Request, res: Response) => {
  res.send('getBlogs');
};

export { getBlog, createBlog, updateBlog, deleteBlog, getBlogs };
