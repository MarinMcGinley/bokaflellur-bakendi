import { z } from 'zod';

export const user = z.object({
  id: z.number(),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  password: z.string().min(8).max(50),
  role: z.enum(['admin', 'user']),
  pictureUrl: z.string().url().optional(),
  email: z.string().email(),
  created: z.string(),
  lastUpdated: z.string(),
});
export type User = z.infer<typeof user>;

export const book = z.object({
  id: z.number(),
  title: z.string().min(3).max(50),
  author: z.string().min(3).max(50),
  link: z.string().url(),
  recommenderId: z.number(),
  bookListId: z.number(),
  created: z.string(),
  lastUpdated: z.string(),
});
export type Book = z.infer<typeof book>;

export const bookList = z.object({
  id: z.number(),
  name: z.string().max(100),
  description: z.string().max(300),
  published: z.boolean(),
  created: z.string(),
  lastUpdated: z.string(),
});
export type BookList = z.infer<typeof bookList>;

export const blog = z.object({
  id: z.number(),
  content: z.string(),
  draft: z.boolean(),
  blogAuthorId: z.number(),
  blogAuthorFirstName: z.string(),
  blogAuthorLastName: z.string(),
  bookTitle: z.string(),
  bookId: z.number(),
  created: z.string(),
  lastUpdated: z.string(),
});
export type Blog = z.infer<typeof blog>;
