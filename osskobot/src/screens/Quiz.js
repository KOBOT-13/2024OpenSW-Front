import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import QuizList from '../forms/QuizList';
import Question from '../components/Quiz/Question';

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const bookId = Number(useParams().id);

  //퀴즈 데이터는 서버에서 불러올거니깐 use effect 써서 안 불러졌을 때는 로딩창 뜨도록 구현 
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
