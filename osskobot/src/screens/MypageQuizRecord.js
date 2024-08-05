import React from 'react';
import styles from './MypageQuizRecord';
import cookies from 'js-cookie';
import { privateAxios } from '../services/axiosConfig';
import image from '../assets/profile.png';

const QuizRecord = ({ selectedStory }) => {
    if (!selectedStory) {
        return <p className={styles.noSelection}>동화를 선택해주세요.</p>;
    }

    return (
        <div className={styles.quizRecordContainer}>
            <h2>{selectedStory.title} 퀴즈 기록</h2>
            {selectedStory.quizRecords.map((record, index) => (
                <div key={index} className={styles.quizRecord}>
                    <p>{`퀴즈 날짜: ${record.date}, 점수: ${record.score}`}</p>
                </div>
            ))}
        </div>
    );
};

export default QuizRecord;
