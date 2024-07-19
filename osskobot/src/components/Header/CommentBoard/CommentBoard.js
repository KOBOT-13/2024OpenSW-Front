import { useState } from 'react';
import styles from './CommentBoard.module.css';
import { AiFillLike } from "react-icons/ai";
import CustomModal from '../../Modal/CumtomModal';


function CommentBoard({ nickname, comment, likes, date }) {
    const [isLikes, setIsLikes] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const click = () => {
        setIsLikes((current) => setIsLikes(!current));
    }
    return (
        <div className={styles.commentBoardDiv}>
            <div className={styles.nameDateDiv}>
                <p className={styles.nickname}><strong>{nickname}</strong></p>
                <p className={styles.date}>{date}</p>
                <div className={styles.buttonsDiv}>
                    <button className={styles.edit}>수정</button>
                    <button className={styles.delete}>삭제</button>
                </div>
            </div>
            <p className={styles.comment}>{comment}</p>
            <div className={styles.likesDiv}>
                <button onClick={click} className={isLikes ? styles.likesIcon : styles.likesCancleIcon}><AiFillLike /></button>
                <p className={styles.likes}>{likes}</p>
                <CustomModal isOpen={modalIsOpen} onRequestClose={setModalIsOpen}/>
            </div>
        </div>
    )
}

export default CommentBoard;