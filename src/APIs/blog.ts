import { Request, Response } from 'express';
import { query } from '../DB/client';
import { errorHelper } from './helpers';
import { idValidation } from '../validation/baseValidation';
import {
  creatingBlogValidation,
  updatingBlogValidation,
} from '../validation/blogValidation';
import { User } from '../types/zod';

const getBlog = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const id = req.params.id;
    idValidation(id);

    // LEFT OUTER JOIN just in case the rules will change later
    const queryString = `
    SELECT 
      blogs.id, 
      content, 
      draft,  
      users.id as blogAuthorId, 
      users.first_name as blogAuthorFirstName, 
      users.last_name as blogAuthorLastName, 
      books.id as bookId, 
      books.title as bookTitle
    FROM blogs 
      LEFT OUTER JOIN users ON blogs.blog_author_id = users.id
      LEFT OUTER JOIN books ON blogs.book_id = books.id    
    WHERE blogs.id = ${id}
  `;

    const results = await query(queryString);

    if (results.rows.length == 0) {
      res.status(404).send();
    }
    res.send(results.rows[0]);
  });
};

const createBlog = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const { content, draft, bookId } = req.body;

    const { id: blogAuthorId } = req.user as User;

    console.log({ blogAuthorId });

    await creatingBlogValidation({
      content,
      draft,
      blogAuthorId: blogAuthorId,
      bookId,
    });

    const currentDate = new Date().toISOString();

    const queryString = `
    INSERT INTO blogs(
      content,
      draft,
      blog_author_id,
      book_id,
      created,
      last_updated
    ) VALUES(
     $1, $2, $3, $4, $5, $6
    ) RETURNING *`;

    const values = [
      content,
      draft,
      blogAuthorId,
      bookId,
      currentDate,
      currentDate,
    ];

    const results = await query(queryString, values);
    res.send(results.rows[0]);
  });
};

const updateBlog = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const { content, draft, blogAuthorId, bookId } = req.body;
    const { id } = req.params;

    idValidation(id);
    await updatingBlogValidation({
      content,
      draft,
      blogAuthorId,
      bookId,
      id: parseInt(id),
      user: req.user,
    });

    const currentDate = new Date().toISOString();

    const queryString = `
    UPDATE blogs 
      SET
      ${content ? `content = '${content.replace(`'`, `''`)}', ` : ''}
      ${draft ? `draft = '${draft}', ` : ''}
      ${blogAuthorId ? `blog_author_id = '${blogAuthorId}', ` : ''} 
      ${bookId ? `book_id = '${bookId}', ` : ''}
      last_updated = '${currentDate}'
    WHERE id = ${id}`;

    await query(queryString);

    res.status(204).send();
  });
};

const deleteBlog = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const { id } = req.params;
    idValidation(id);

    const queryString = `DELETE FROM blogs WHERE id = ${id}`;

    const result = await query(queryString);
    res.status(204).send(result);
  });
};

const getBlogs = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const queryString = `
    SELECT 
      blogs.id, 
      content, 
      draft,  
      users.id as blogAuthorId, 
      users.first_name as blogAuthorFirstName, 
      users.last_name as blogAuthorLastName, 
      books.id as bookId, 
      books.title as bookTitle
    FROM blogs 
      LEFT OUTER JOIN users ON blogs.blog_author_id = users.id
      LEFT OUTER JOIN books ON blogs.book_id = books.id`;

    const results = await query(queryString);

    res.send(results.rows);
  });
};

export { getBlog, createBlog, updateBlog, deleteBlog, getBlogs };
