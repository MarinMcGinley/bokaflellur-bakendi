import { Request, Response } from 'express';

const getBook = (req: Request, res: Response) => {
  const id = req.params.id;

  const queryString = `
    SELECT id, title, author, link, recommender_id, book_
    FROM users ?? WAIT FOR LATER
    WHERE id = ${id}
  `;

  // const results = await query(queryString);

  // if (results.rows.length == 0) {
  //   res.status(404).send();
  // }
  // res.send(results.rows[0]);
};

const createBook = (req: Request, res: Response) => {
  res.send('CreateBook');
};

const updateBook = (req: Request, res: Response) => {
  res.send('UpdateBook');
};

const deleteBook = (req: Request, res: Response) => {
  res.send('deleteBook');
};

const getBooks = (req: Request, res: Response) => {
  res.send('getBooks');
};

export { getBook, createBook, updateBook, deleteBook, getBooks };
