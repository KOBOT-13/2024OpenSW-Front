import React from 'react';

const Question = ({ data, onAnswer }) => {
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
    </div>
  );
};

export default Question;
