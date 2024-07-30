import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import QuizList from '../forms/QuizList';
import Question from '../components/Quiz/Question';
import './Quiz.css'; // 추가된 CSS 파일 import

const Quiz = () => {
  const navigate = useNavigate();

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

  const retryQuiz = () => {
    setCurrentQuestionIndex(0); // 첫 번째 질문으로 리셋
    setScore(0); // 점수 초기화
    setShowResult(false); // 결과 페이지 숨기기
    setShowAnswer(false); // 답변 표시 숨기기
    setIsCorrect(false); // 정답 여부 초기화
  };
  const goCommunity = () =>{
    navigate(`/bookclick/${bookId}`);
  }
  return (
    <div className="quiz-container">
      {showResult ? (
        <div className="quiz-result">
          <h1>🎉 퀴즈 완료! 🎉</h1>
          <h2>점수: {score} / {quizData.length}</h2>
          {score > 3 ? <p>훌륭해요! 독서를 열심히 했군요!</p> : <p>다시해볼까? 랄랄랄라라</p>}
          <div className="actions">
            <button className="retry-button" onClick={retryQuiz}>다시 시도하기</button>
            <button className="share-button" onClick = {goCommunity}>결과 공유하기</button> 
            {/* 결과 공유하기 클릭시에 커뮤니티로 이동되도록  */}
          </div>
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
