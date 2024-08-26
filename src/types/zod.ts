import { z } from 'zod';

export const user = z.object({
  id: z.number(),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
  role: z.enum(['admin', 'user']),
  pictureUrl: z.string().url().optional(),
  email: z.string().email(),
});
export type User = z.infer<typeof user>;

export const book = z.object({
  id: z.number(),
  title: z.string().min(3).max(50),
  author: z.string().min(3).max(50),
  link: z.string().url(),
  recommenderId: z.number(),
  bookListId: z.number(),
});
export type Book = z.infer<typeof book>;

export const bookList = z.object({
  id: z.number(),
  name: z.string().max(100),
  description: z.string().max(300),
  published: z.boolean(),
});
export type BookList = z.infer<typeof bookList>;

export const blog = z.object({
  id: z.number(),
  content: z.string(),
  draft: z.boolean(),
  blogAuthorId: z.number(),
  bookId: z.number(),
});
export type Blog = z.infer<typeof blog>;
