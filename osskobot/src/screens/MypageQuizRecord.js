import React, { useEffect, useState } from 'react';
import { privateAxios } from '../services/axiosConfig';
import { format } from 'date-fns';

const QuizData = ({ title, score, date }) => {
    return (
        <div>
            <h3>{title}</h3>
            <p>점수: {score}</p>
            <p>날짜: {date}</p>
        </div>
    );
};

const QuizRecord = () => {
    const [stories, setStories] = useState([]);
    const [quizRecords, setQuizRecords] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        // 동화 목록 가져오기
        const fetchStories = async () => {
            try {
                const response = await privateAxios.get('books/AllBooks/'); // API endpoint 예시
                setStories(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        // 퀴즈 기록 가져오기
        const getQuizRecord = async () => {
            try {
                const response = await privateAxios.get(`mypages/quizRecord/`); // API endpoint 예시
                setQuizRecords(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStories();
        getQuizRecord();
    }, []);

    // 책 제목 클릭 핸들러
    const handleBookClick = (bookTitle) => {
        setSelectedBook(bookTitle);
    };

    // 퀴즈 기록을 최근에 푼 순서대로 정렬
    const sortedQuizRecords = quizRecords.sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at));

    // 중복되지 않는 책 제목 목록 추출
    const uniqueBookTitles = Array.from(new Set(sortedQuizRecords.map((record) => record.book.title)));

    // 필터링된 퀴즈 기록
    const filteredQuizRecords = selectedBook
        ? sortedQuizRecords.filter((record) => record.book.title === selectedBook)
        : sortedQuizRecords;

    return (
        <div>
            <h2>퀴즈를 푼 책 목록</h2>
            <div>
                {uniqueBookTitles.map((title, index) => (
                    <button key={index} onClick={() => handleBookClick(title)}>
                        {title}
                    </button>
                ))}
            </div>
            <div>
                <h2>{selectedBook ? `${selectedBook} 퀴즈 기록` : '전체 퀴즈 기록'}</h2>
                {filteredQuizRecords.length > 0 ? (
                    filteredQuizRecords.map((record, index) => (
                        <QuizData
                            key={index}
                            title={record.book.title}
                            score={record.score}
                            date={format(new Date(record.completed_at), "yyyy-MM-dd HH:mm")}
                        />
                    ))
                ) : (
                    <p>퀴즈 기록이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default QuizRecord;
