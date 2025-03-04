import { Book, BookList, User } from './src/types/zod';

export const mockUserData: Omit<User, 'id' | 'password'>[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@gmail.com',
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
    role: 'user',
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@gmail.com',
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
    role: 'user',
  },
  {
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael@gmail.com',
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
    role: 'user',
  },
];

export const mockBookListData: Omit<BookList, 'id'>[] = [
  {
    name: 'Books to Read',
    description: 'Books I want to read',
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
    published: true,
  },
  {
    name: 'Books I Have Read',
    description: 'Books I have read',
    created: '2021-10-01',
    lastUpdated: '2022-02-01',
    published: true,
  },
  {
    name: 'Classic Literature',
    description: 'Classic literature books',
    created: '2021-10-01',
    lastUpdated: '2022-05-01',
    published: true,
  },

  {
    name: 'Gothic Literature',
    description: 'Gothic literature books',
    created: '2021-10-01',
    lastUpdated: '2022-11-01',
    published: true,
  },
  {
    name: 'Epic Novels',
    description: 'Epic novels',
    created: '2021-10-01',
    lastUpdated: '2023-03-01',
    published: true,
  },
  {
    name: 'Existentialism',
    description: 'Existentialism books',
    created: '2021-10-01',
    lastUpdated: '2023-07-01',
    published: true,
  },
  {
    name: '19th Century Literature',
    description: '19th century literature books',
    created: '2021-10-01',
    lastUpdated: '2023-12-01',
    published: true,
  },
  {
    name: 'American Literature',
    description: 'American literature books',
    created: '2021-10-01',
    lastUpdated: '2024-04-01',
    published: true,
  },
];

export const mockBookData: Omit<Book, 'id'>[] = [
  {
    title: 'The Covenant of Water',
    author: 'Abraham Verghese',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 1,
    bookListId: 1,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'Middlemarch',
    author: 'George Eliot',
    link: 'https://en.wikipedia.org/wiki/Middlemarch',
    recommenderId: 2,
    bookListId: 1,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'Dust Child',
    author: 'Nguyen Phan Que Mai',
    link: 'https://www.goodreads.com/book/show/60831918-dust-child',
    recommenderId: 3,
    bookListId: 1,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'The Wide Wide Sea',
    author: 'Hampton Sides',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 4,
    bookListId: 1,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    link: 'https://www.amazon.com/dp/0061120081',
    recommenderId: 1,
    bookListId: 1,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: '1984',
    author: 'George Orwell',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 2,
    bookListId: 1,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 3,
    bookListId: 2,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 4,
    bookListId: 2,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 1,
    bookListId: 2,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'Moby-Dick',
    author: 'Herman Melville',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 2,
    bookListId: 2,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'War And Peace',
    author: 'Leo Tolstoy',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 3,
    bookListId: 2,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'The Brothers Karamazov',
    author: 'Fyodor Dostoevsky',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 3,
    bookListId: 2,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 4,
    bookListId: 3,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 1,
    bookListId: 3,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'The Odyssey',
    author: 'Homer',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 3,
    bookListId: 3,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'The Iliad',
    author: 'Homer',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 2,
    bookListId: 3,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'Les Misérables',
    author: 'Victor Hugo',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 4,
    bookListId: 3,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 1,
    bookListId: 3,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'Jane Eyre',
    author: 'Charlotte Brontë',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 2,
    bookListId: 4,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'Frankenstein',
    author: 'Mary Shelley',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 3,
    bookListId: 4,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'Dracula',
    author: 'Bram Stoker',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 4,
    bookListId: 4,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'The Picture of Dorian Gray',
    author: 'Oscar Wilde',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 2,
    bookListId: 4,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'The Count of Monte Cristo',
    author: 'Alexandre Dumas',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 1,
    bookListId: 4,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 3,
    bookListId: 4,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 4,
    bookListId: 5,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'The Catch-22',
    author: 'Joseph Heller',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 1,
    bookListId: 5,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'One Hundred Years of Solitude',
    author: 'Gabriel García Márquez',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 2,
    bookListId: 5,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'Anna Karenina',
    author: 'Leo Tolstoy',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 3,
    bookListId: 5,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'Don Quixote',
    author: 'Miguel de Cervantes',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 4,
    bookListId: 5,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'The Divine Comedy',
    author: 'Dante Alighieri',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 1,
    bookListId: 5,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 2,
    bookListId: 6,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'The Stranger',
    author: 'Albert Camus',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 3,
    bookListId: 6,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'Ulysses',
    author: 'James Joyce',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 4,
    bookListId: 6,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'Lolita',
    author: 'Vladimir Nabokov',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 1,
    bookListId: 6,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'A Tale of Two Cities',
    author: 'Charles Dickens',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 2,
    bookListId: 6,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'The Count of Monte Cristo',
    author: 'Alexandre Dumas',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 3,
    bookListId: 6,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'Sense and Sensibility',
    author: 'Jane Austen',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 4,
    bookListId: 7,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'David Copperfield',
    author: 'Charles Dickens',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 1,
    bookListId: 7,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'Great Expectations',
    author: 'Charles Dickens',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 2,
    bookListId: 7,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'Fahrenheit 451',
    author: 'Gabriel García Márquez',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 3,
    bookListId: 7,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'The Grapes of Wrath',
    author: 'John Steinbeck',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 4,
    bookListId: 7,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'East of Eden',
    author: 'John Steinbeck',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 1,
    bookListId: 7,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'Of Mice and Men',
    author: 'John Steinbeck',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 2,
    bookListId: 8,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'Beloved',
    author: 'Toni Morrison',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 3,
    bookListId: 8,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'The Road',
    author: 'Cormac McCarthy',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 4,
    bookListId: 8,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
  {
    title: 'The Sun Also Rises',
    author: 'Ernest Hemingway',
    link: 'https://en.wikipedia.org/wiki/The_Covenant_of_Water',
    recommenderId: 1,
    bookListId: 8,
    created: '2021-10-01',
    lastUpdated: '2021-10-01',
  },
];
