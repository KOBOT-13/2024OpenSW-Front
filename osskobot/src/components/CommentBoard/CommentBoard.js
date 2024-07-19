import { useEffect, useState } from 'react';
import styles from './CommentBoard.module.css';
import { AiFillLike } from "react-icons/ai";
import CustomModal from '../Modal/CumtomModal';


function CommentBoard({ nickname, comment, likes, date }) {
    const [isLikes, setIsLikes] = useState(false);
    const [isDel, setIsDel] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [newComment, setNewComment] = useState(comment);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const click = () => {
        setIsLikes((current) => setIsLikes(!current));
    };
    const onClickDelete = () => {
        setModalIsOpen(true);
    };
    const onClickEdit = () => {
        setIsEdit(true);
    };
    const onChangeNewComment = (e) => {
        setNewComment(e.target.value);
    }
    const onClickChangeComment = () => {
        // commnet를 newcomment로 변경하는 api 진행
        console.log(newComment);
        setIsEdit(false);
    }
    const onClickCancle = () => {
        setNewComment(comment);
        setIsEdit(false);
    }
    useEffect(() => {
        if (isDel) {
            // 댓글 삭제하는 api 실행
        }
    }, [isDel]);

    return (
        <div className={styles.commentBoardDiv}>
            <div className={styles.nameDateDiv}>
                <p className={styles.nickname}><strong>{nickname}</strong></p>
                <p className={styles.date}>{date}</p>

                {isEdit ? null :
                    <div className={styles.buttonsDiv}>
                        <button onClick={onClickEdit} className={styles.edit}>수정</button>
                        <button onClick={onClickDelete} className={styles.delete}>삭제</button>
                        <CustomModal isOpen={modalIsOpen} onRequestClose={setModalIsOpen} setIsDel={setIsDel} />
                    </div>}
            </div>
            {isEdit ?
                <div className={styles.editTextAreaDiv}>
                    <textarea onChange={onChangeNewComment} className={styles.editTextArea} value={newComment} />
                    <div className={styles.editCancleDiv}>
                        <button onClick={onClickChangeComment} className={styles.editBtn}>수정</button>
                        <button onClick={onClickCancle} className={styles.cancleBtn}>취소</button>
                    </div>
                </div>
                :
                <p className={styles.comment}>{comment}</p>}
            <div className={styles.likesDiv}>
                <button onClick={click} className={isLikes ? styles.likesIcon : styles.likesCancleIcon}><AiFillLike /></button>
                <p className={styles.likes}>{likes}</p>
            </div>
        </div>
    )
}

export default CommentBoard;