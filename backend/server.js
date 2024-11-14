// server.js
const express = require('express');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const pool = new Pool({
  host: 'db',
  user: 'postgres',
  password: 'postgres',
  database: 'testdb',
  port: 5432,
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (user.rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
    if (user.rows[0].password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const userId = user.rows[0].id;
    const token = jwt.sign({ id: userId }, 'SECRET_KEY', { expiresIn: '15m' });

    const questions = await pool.query(
      'SELECT id, question FROM security_questions ORDER BY RANDOM() LIMIT 3'
    );

    res.json({ token, userId, questions: questions.rows });  
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/verify-answers', async (req, res) => {
  const { userId, answers } = req.body;

  try {
    const userAnswers = await pool.query(
      'SELECT question1_id, answer1, question2_id, answer2, question3_id, answer3, question4_id, answer4, question5_id, answer5, question6_id, answer6 FROM user_data WHERE user_id = $1',
      [userId]
    );

    if (userAnswers.rows.length === 0) {
      return res.status(404).json({ message: 'User data not found' });
    }

    const validAnswers = answers.every(answer => {
      const answerIndex = `answer${answer.questionId}`; 
      const questionIndex = `question${answer.questionId}_id`; 
      
      const correctAnswer = userAnswers.rows[0][answerIndex];
      return correctAnswer && correctAnswer.toLowerCase() === answer.value.toLowerCase();
    });

    if (!validAnswers) {
      return res.status(401).json({ message: 'Invalid answers' });
    }

    res.json({ message: '2FA successful' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
