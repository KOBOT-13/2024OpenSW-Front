import { useEffect, useState } from 'react';
import styles from './CommentBoard.module.css';
import { AiFillLike } from "react-icons/ai";
import CustomModal from '../Modal/CheckModal';
import axios from 'axios';
import cookies from 'js-cookie';


function CommentBoard({ id, nickname, comment, likes, date, onLikes }) {
    const [isLikes, setIsLikes] = useState(onLikes);
    const [isDel, setIsDel] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [newComment, setNewComment] = useState(comment);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [_likes, setLikes] = useState(likes);

    const click = () => {
        setIsLikes((current) => !current);
        axios.post(`${process.env.REACT_APP_API_ADDRESS}books/comments/${id}/like/`, 
            {},
            {
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${cookies.get('token')}`
                },
                withCredentials: true,
            }
        ).then((response) => {
            axios.get(`${process.env.REACT_APP_API_ADDRESS}books/comments/${id}/liked_users/`)
            .then((response) => {
                setLikes(response.data.liked_users.length);
            }).catch((error) => console.log(error));
        }).catch((error) => {
            console.log(error);
        });
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
        console.log("API 실행 " , newComment, "로 댓글 변경");
        setIsEdit(false);
    }
    const onClickCancle = () => {
        setNewComment(comment);
        setIsEdit(false);
    }
    useEffect(() => {
        if (isDel) {
            // 댓글 삭제하는 api 실행
            console.log("댓글 삭제하는 API 실행 ");
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
                <p className={styles.comment}>{newComment}</p>}
            <div className={styles.likesDiv}>
                <button onClick={click} className={isLikes ? styles.likesIcon : styles.likesCancleIcon}><AiFillLike /></button>
                <p className={styles.likes}>{_likes}</p>
            </div>
        </div>
    )
}

export default CommentBoard;