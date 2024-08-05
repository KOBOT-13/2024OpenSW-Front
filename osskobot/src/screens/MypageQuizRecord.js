import React, { useEffect, useState } from 'react';
import { privateAxios } from '../services/axiosConfig';
import styles from './MypageQuizRecord.css';

const QuizRecord = () => {
    const [stories, setStories] = useState([]);
    const [selectedStory, setSelectedStory] = useState(null);
    const [quizRecords, setQuizRecords] = useState([]);

    useEffect(() => {
        // 동화 목록 가져오기
        const fetchStories = async () => {
            try {
                const response = await privateAxios.get('/stories/list'); // API endpoint 예시
                setStories(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchStories();
    }, []);

    const handleStoryClick = async (story) => {
        setSelectedStory(story);

        try {
            // 해당 동화의 퀴즈 기록 가져오기
            const response = await privateAxios.get(`/quizzes/records/${story.id}`); // API endpoint 예시
            setQuizRecords(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.quizRecordContainer}>
            <div className={styles.storyCovers}>
                {stories.map((story) => (
                    <img
                        key={story.id}
                        src={story.coverImage}
                        alt={story.title}
                        className={`${styles.storyCover} ${selectedStory?.id === story.id ? styles.active : ''}`}
                        onClick={() => handleStoryClick(story)}
                    />
                ))}
            </div>
            {selectedStory ? (
                <div className={styles.quizRecordList}>
                    <h2>{selectedStory.title} 퀴즈 기록</h2>
                    {quizRecords.length > 0 ? (
                        quizRecords.map((record, index) => (
                            <div key={index} className={styles.quizRecord}>
                                <p>{`퀴즈 날짜: ${record.date}, 점수: ${record.score}`}</p>
                            </div>
                        ))
                    ) : (
                        <p className={styles.noRecords}>퀴즈 기록이 없습니다.</p>
                    )}
                </div>
            ) : (
                <p className={styles.noSelection}>동화를 선택해주세요.</p>
            )}
        </div>
    );
};

export default QuizRecord;
