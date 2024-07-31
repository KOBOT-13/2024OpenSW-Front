import React, { useEffect } from 'react';
import './Question.css'; // 추가된 CSS 파일 import

const Question = ({ data, onAnswer, showAnswer, isCorrect, handleNextQuestion }) => {
  
  useEffect(() => {
    if (isCorrect) {
      const timer = setTimeout(() => {
        handleNextQuestion();
      }, 1000); // 1초 후 다음 질문으로 이동
      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
    }
  }, [isCorrect, handleNextQuestion]);

  return (
    <div className="question-container">
      <div className="question-box">
        <h2>{data.question}</h2>
      </div>
      <div className="options">
        {data.options.map((option, index) => (
          <button 
            key={index} 
            onClick={() => onAnswer(option)}
            className="option-button"
          >
            {index + 1}. {option}
          </button>
        ))}
      </div>
      {showAnswer && (
        <div className="answer-box">
          <p>정답: {data.answer}</p>
        </div>
      )}
      {isCorrect && (
        <div className="correct-box">
          <p>정답을 맞췄습니다!</p>
        </div>
      )}
    </div>
  );
};

export default Question;
