// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import LoginPage from './LoginPage';
import TwoFactorPage from './TwoFactorPage';

function App() {
  const [questions, setQuestions] = useState(null);
  const [userId, setUserId] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setQuestions={setQuestions} setUserId={setUserId} />} />
        <Route path="/2fa" element={<TwoFactorPage questions={questions} userId={userId} />} />
        <Route path="/empty" element={<div>Empty Page</div>} />  {/* Пустая страница */}
      </Routes>
    </Router>
  );
}

export default App;
