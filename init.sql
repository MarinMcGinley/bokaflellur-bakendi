

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role VARCHAR(10) NOT NULL,
    picture VARCHAR(100) NOT NULL,
    email VARCHAR(50) NOT NULL,
    created TIMESTAMPTZ NOT NULL,
    last_updated TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS book_lists (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(300),
    published BOOLEAN NOT NULL,
    created TIMESTAMPTZ NOT NULL,
    last_updated TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS books (
    id INT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    author VARCHAR(50) NOT NULL,
    link VARCHAR(50) NOT NULL,
    recommender_id INT NOT NULL,
    book_list_id INT NOT NULL,
    created TIMESTAMPTZ NOT NULL,
    last_updated TIMESTAMPTZ NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(recommender_id)
            REFERENCES users(id),
    CONSTRAINT fk_book_list
        FOREIGN KEY(book_list_id)
            REFERENCES book_lists(id)
);

CREATE TABLE IF NOT EXISTS blogs (
    id INT PRIMARY KEY,
    content TEXT NOT NULL,
    draft BOOLEAN NOT NULL,
    blog_author_id INT NOT NULL,
    book_id INT NOT NULL,
    created TIMESTAMPTZ NOT NULL,
    last_updated TIMESTAMPTZ NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(blog_author_id)
            REFERENCES users(id),
    CONSTRAINT fk_book
        FOREIGN KEY(book_id)
            REFERENCES books(id)
);