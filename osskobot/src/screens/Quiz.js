import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Question from '../components/Quiz/Question';
import './Quiz.css'; // 추가된 CSS 파일 import
import { privateAxios } from '../services/axiosConfig';

const Quiz = () => {
  const navigate = useNavigate();
  const [quizData, setQuizdata] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const bookId = Number(useParams().id);

  useEffect(() => {
    const getQuizzes = async() => {
      privateAxios.get(`quizzes/book_id_quizzes/${bookId}/`)
      .then((response) => {
        console.log(response);
        setQuizdata(response.data);
        setIsStart(true);
      }).catch((error) => {
        console.log(error);
      })
    }
    getQuizzes();
  }, []);

  const handleAnswer = (selectedOption) => {
    if (isAnswered) return;

    setIsAnswered(true);
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
    setIsAnswered(false);
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizData.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowResult(true);
      sendScore(); // 퀴즈가 끝났을 때 점수를 서버에 전송
    }
  };

  const retryQuiz = () => {
    setCurrentQuestionIndex(1); // 첫 번째 질문으로 리셋
    setScore(0); // 점수 초기화
    setShowResult(false); // 결과 페이지 숨기기
    setShowAnswer(false); // 답변 표시 숨기기
    setIsCorrect(false); // 정답 여부 초기화
    setIsAnswered(false);
  };

  const goCommunity = () => {
    navigate(`/bookclick/${bookId}`);
  };

  // 점수를 서버에 전송하는 함수
  const sendScore = () => {
    privateAxios.post(`mypages/quiz/${bookId}/record/`,
      {
        "score": score
      },
    )
      .then(response => {
        console.log("Score sent successfully:", response.data);
      })
      .catch(error => {
        console.error("Error sending score:", error);
      });
  };

  return (
    <div className="quiz-container">
      {showResult ? (
        <div className="quiz-result">
          <h1>🎉 퀴즈 완료! 🎉</h1>
          <h2>점수: {score} / {quizData.length}</h2>
          {score > 3 ? <p>훌륭해요! 독서를 열심히 했군요!</p> : <p>다시해볼까? 랄랄랄라라</p>}
          <div className="actions">
            <button className="retry-button" onClick={retryQuiz}>다시 시도하기</button>
            <button className="share-button" onClick={goCommunity}>결과 공유하기</button> 
          </div>
        </div>
      ) : isStart ? (
        <Question
          data={quizData[currentQuestionIndex]}
          onAnswer={handleAnswer}
          showAnswer={showAnswer}
          isCorrect={isCorrect}
          handleNextQuestion={handleNextQuestion}
        />
      ) : <div>Loading...</div>}
      {/* 로딩 페이지  */}
      {showAnswer && !showResult && (
        <button onClick={handleNextQuestion} className="next-button">다음 질문</button>
      )}
    </div>
  );
};

export default Quiz;
