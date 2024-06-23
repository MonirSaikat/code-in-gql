-- Create database gql
CREATE DATABASE IF NOT EXISTS gql;
USE gql;

-- Create table for games
CREATE TABLE IF NOT EXISTS games (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);

-- Create table for platforms
CREATE TABLE IF NOT EXISTS platforms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Create table for game_platforms (many-to-many relationship)
CREATE TABLE IF NOT EXISTS game_platforms (
    game_id INT,
    platform_id INT,
    PRIMARY KEY (game_id, platform_id),
    FOREIGN KEY (game_id) REFERENCES games(id),
    FOREIGN KEY (platform_id) REFERENCES platforms(id)
);

-- Create table for authors
CREATE TABLE IF NOT EXISTS authors (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    verified BOOLEAN NOT NULL
);

-- Create table for reviews
CREATE TABLE IF NOT EXISTS reviews (
    id INT PRIMARY KEY,
    rating INT NOT NULL,
    content TEXT NOT NULL,
    author_id INT,
    game_id INT,
    FOREIGN KEY (author_id) REFERENCES authors(id),
    FOREIGN KEY (game_id) REFERENCES games(id)
);

-- Insert data into games table
INSERT INTO games (id, title) VALUES
(1, 'The Legend of Zelda: Breath of the Wild'),
(2, 'The Witcher 3: Wild Hunt'),
(3, 'Red Dead Redemption 2');

-- Insert data into platforms table
INSERT INTO platforms (name) VALUES
('Nintendo Switch'),
('Wii U'),
('PC'),
('PlayStation 4'),
('Xbox One'),
('Stadia');

-- Insert data into game_platforms table
INSERT INTO game_platforms (game_id, platform_id) VALUES
(1, (SELECT id FROM platforms WHERE name = 'Nintendo Switch')),
(1, (SELECT id FROM platforms WHERE name = 'Wii U')),
(2, (SELECT id FROM platforms WHERE name = 'PC')),
(2, (SELECT id FROM platforms WHERE name = 'PlayStation 4')),
(2, (SELECT id FROM platforms WHERE name = 'Xbox One')),
(2, (SELECT id FROM platforms WHERE name = 'Nintendo Switch')),
(3, (SELECT id FROM platforms WHERE name = 'PlayStation 4')),
(3, (SELECT id FROM platforms WHERE name = 'Xbox One')),
(3, (SELECT id FROM platforms WHERE name = 'PC')),
(3, (SELECT id FROM platforms WHERE name = 'Stadia'));

-- Insert data into authors table
INSERT INTO authors (id, name, verified) VALUES
(201, 'John Doe', TRUE),
(202, 'Jane Smith', FALSE),
(203, 'Alice Johnson', TRUE);

-- Insert data into reviews table
INSERT INTO reviews (id, rating, content, author_id, game_id) VALUES
(101, 10, 'An absolute masterpiece with stunning visuals and gameplay.', 201, 1),
(102, 9, 'A very immersive game with a compelling story.', 201, 2),
(103, 8, 'Great game, but some performance issues on certain platforms.', 201, 2);
