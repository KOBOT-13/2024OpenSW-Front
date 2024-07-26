import React, { useState } from 'react';
import QuizList from '../forms/QuizList';
import Question from '../components/Quiz/Question';

const Quiz = ({ bookId }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  const quizData = QuizList(bookId);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === quizData[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizData.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div>
      {showResult ? (
        <div>
          <h2>퀴즈 완료!</h2>
          <p>점수: {score} / {quizData.length}</p>
        </div>
      ) : (
        <Question 
          data={quizData[currentQuestionIndex]} 
          onAnswer={handleAnswer} 
        />
      )}
    </div>
  );
};

export default Quiz;
