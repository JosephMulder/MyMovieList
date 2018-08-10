CREATE DATABASE IF NOT EXISTS movies;

USE movies;

CREATE TABLE IF NOT EXISTS users (
    id int not null auto_increment primary key,
    username varchar(30) unique,
    password varchar(20)
);

CREATE TABLE IF NOT EXISTS favorites (
    userId int not null,
    moviename varchar(100)
);

CREATE TABLE IF NOT EXISTS watched (
    username varchar(30),
    moviename varchar(100),
    score int(2),
    favorites varchar(10)
);