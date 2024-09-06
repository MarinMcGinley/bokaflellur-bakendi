export type DBBook = {
  id: number;
  title: string;
  author: string;
  link: string;
  recommender_id: number;
  book_list_id: number;
  created: string;
  last_updated: string;
};

export type DBBookList = {
  id: number;
  name: string;
  description: string;
  published: boolean;
  created: string;
  last_updated: string;
};

export type DBBlog = {
  id: number;
  content: string;
  draft: boolean;
  blog_author_id: number;
  blog_author_first_name: string;
  blog_author_last_name: string;
  book_title: string;
  book_id: number;
  created: string;
  last_updated: string;
};

export type DBUser = {
  id: number;
  first_name: string;
  last_name: string;
  password?: string;
  role: 'admin' | 'user';
  picture_url: string;
  email: string;
  created: string;
  last_updated: string;
};
