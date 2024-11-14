// TwoFactorPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Импортируем useNavigate

function TwoFactorPage({ questions, userId }) {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();  // Хук для навигации

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/verify-answers', {
        userId,
        answers: questions.map((question, index) => ({
          questionId: question.id,  // Передаем id вопроса для проверки
          value: answers[`answer${index + 1}`]
        })),
      });
      if (response.data.message === '2FA successful') {
        alert('Login successful');
        navigate('/empty');  // Перенаправление на пустую страницу после успешной верификации
      } else {
        alert('Incorrect answers');
      }
    } catch (error) {
      alert('Verification failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((question, index) => (
        <div key={question.id}>  {/* Используем id вопроса как уникальный ключ */}
          <label>{question.question}</label>
          <input
            type="text"
            onChange={(e) =>
              setAnswers({ ...answers, [`answer${index + 1}`]: e.target.value })
            }
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default TwoFactorPage;