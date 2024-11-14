-- init.sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE security_questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL
);

CREATE TABLE user_data (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    question1_id INT REFERENCES security_questions(id),
    answer1 TEXT,
    question2_id INT REFERENCES security_questions(id),
    answer2 TEXT,
    question3_id INT REFERENCES security_questions(id),
    answer3 TEXT,
    question4_id INT REFERENCES security_questions(id),
    answer4 TEXT,
    question5_id INT REFERENCES security_questions(id),
    answer5 TEXT,
    question6_id INT REFERENCES security_questions(id),
    answer6 TEXT
);

INSERT INTO users (username, password) VALUES ('testuser', 'testpassword');

INSERT INTO security_questions (question) VALUES 
('What is your mother''s maiden name?'),
('What is your first pet''s name?'),
('What city were you born in?'),
('What is your favorite book?'),        
('Upload a memorable picture.'),         
('What is your favorite song or sound?'); 

INSERT INTO user_data (user_id, question1_id, answer1, question2_id, answer2, question3_id, answer3, question4_id, answer4, question5_id, answer5, question6_id, answer6) 
VALUES (1, 1, 'Smith', 2, 'Buddy', 3, 'New York', 4, 'Moby Dick', 5, 'Vacation Photo', 6, 'chipinin');
