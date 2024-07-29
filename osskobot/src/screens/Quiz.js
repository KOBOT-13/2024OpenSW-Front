import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import QuizList from '../forms/QuizList';
import Question from '../components/Quiz/Question';
import './Quiz.css'; // 추가된 CSS 파일 import

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const bookId = Number(useParams().id);

  const quizData = QuizList(bookId);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === quizData[currentQuestionIndex].answer) {
      setScore(score + 1);
      setShowAnswer(false);
      setIsCorrect(true);
    } else {
      setShowAnswer(true);
      setIsCorrect(false);
    }
  };

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setIsCorrect(false);
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizData.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="quiz-container">
      {showResult ? (
        <div>
          <h2>퀴즈 완료!</h2>
          <p>점수: {score} / {quizData.length}</p>
        </div>
      ) : (
        <Question
          data={quizData[currentQuestionIndex]}
          onAnswer={handleAnswer}
          showAnswer={showAnswer}
          isCorrect={isCorrect}
          handleNextQuestion={handleNextQuestion}
        />
      )}
      {showAnswer && !showResult && (
        <button onClick={handleNextQuestion} className="next-button">다음 질문</button>
      )}
    </div>
  );
};

export default Quiz;
