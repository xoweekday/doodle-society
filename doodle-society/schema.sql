DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS friends;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS doodles;

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

CREATE TABLE images (
  id serial PRIMARY KEY,
  url VARCHAR (255) NOT NULL,
  uploader_id int NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE doodles (
  id serial PRIMARY KEY,
  url VARCHAR (255) NOT NULL,
  original_id int NOT NULL,
  doodler_id int NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);