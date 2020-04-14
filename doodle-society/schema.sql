DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS friends;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  fullname VARCHAR (50) NOT NULL
);

CREATE TABLE friends (
  id serial PRIMARY KEY,
  user_id int NOT NULL,
  friend_id int NOT NULL
);