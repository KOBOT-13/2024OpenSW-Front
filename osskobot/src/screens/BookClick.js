import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './BookClick.module.css';
import CommentBoard from '../components/CommentBoard/CommentBoard';
import CharProfile from '../components/CharProfile/CharProfile';

function BookClick() {
    const location = useLocation();
    const params = useParams();

    const [book, setBook] = useState(
        {
            title: "",
            author: "",
            publisher: "",
            publication_date: "",
            cover_image: "",
            synopsis: ""
        }
    );
    const [index, setIndex] = useState(1)
    const [commentMsg, setCommentMsg] = useState('');
    const [commentInfos, setCommentInfos] = useState([]);

    useEffect(() => {
        const getBookDetail = async() => {
            await axios.get(`${process.env.REACT_APP_API_ADDRESS}books/book/${params.id}/`)
            .then((response) => {
                console.log(response.data);
                setBook(response.data);
            });
        }
        getBookDetail();
    }, [])

    const onChangeComment = (e) => {
        setCommentMsg(e.target.value);
    }
    const onSubmitClk = (e) => {
        e.preventDefault();
        if(commentMsg !== ''){
            const date = new Date();
            setCommentMsg('');
            const newCommentInfo = {
                nickname: '이재영',
                comment: commentMsg,
                date: date.toLocaleString(),
                likes: 0
            };
            setCommentInfos([...commentInfos, newCommentInfo]);
        }
    };

    const click = (id) => {
        setIndex(id);
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.bookDetail}>
                <div className={styles.bookImgDiv}>
                    <img className={styles.bookImg} src={book.cover_image} alt='디테일 이미지' />
                </div>
                <div className={styles.bookInfo}>
                    <h1>{book.title}</h1>
                    <h3>
                        저자 : {book.author}
                    </h3>
                    <h3>
                        출판사 : {book.publisher}
                    </h3>
                    <h3>
                        출간일 : {book.publication_date}
                    </h3>
                </div>
            </div>

            <div className={styles.buttonDiv}>
                <ul className={styles.buttonUl}>
                    <li className={styles.buttonLi}>
                        <Link to={`${location.pathname}/chatcharchoose`}><button className={styles.button}>대화하기</button></Link>
                    </li>
                    <li className={styles.buttonLi}>
                        <Link to={`${location.pathname}/quiz`}><button className={styles.button}>독서퀴즈</button></Link>
                    </li>
                    <li className={styles.buttonLi}>
                        <Link to={`${location.pathname}/bookreport`}><button className={styles.button}>독후감 쓰기</button></Link>
                    </li>
                </ul>
            </div>

            <div className={styles.multiContainer}>
                {/*하단에 책 소개, 등장인물 소개, 리뷰 페이지가 들어가아 햠*/}
                <div className={styles.multiBtns}>
                    <ul className={styles.mulitBtnUl}>
                        <li className={styles.multiBtnLi}>
                            <button onClick={() => click(1)} className={
                                index === 1 ? styles.clickMultiBtn : styles.multiBtn
                            }>
                                책 소개
                            </button>
                        </li>
                        <li className={styles.multiBtnLi}>
                            <button onClick={() => click(2)} className={
                                index === 2 ? styles.clickMultiBtn : styles.multiBtn
                            }>
                                등장인물 소개
                            </button>
                        </li>
                        <li className={styles.multiBtnLi}>
                            <button onClick={() => click(3)} className={
                                index === 3 ? styles.clickMultiBtn : styles.multiBtn
                            }>
                                독후활동 공유
                            </button>
                        </li>
                    </ul>
                </div>
                <div className={styles.multiPage}>
                    {index === 1 ? <p style={{ margin: 10, textAlign: "justify", lineHeight: "1.6", color: "#666" }}>{book.synopsis}</p> :
                        index === 2 ? 
                        <div className={styles.charProfilesDiv}>
                            <CharProfile mode={1}/>
                            <CharProfile mode={1}/>
                            <CharProfile mode={1}/>
                            <CharProfile mode={1}/>
                            <CharProfile mode={1}/>
                            <CharProfile mode={1}/>
                            <CharProfile mode={1}/>
                        </div> :
                            <div className={styles.commnetBoard}>
                                <form className={styles.commentForm} onSubmit={onSubmitClk}>
                                    <textarea className={styles.commentInput} placeholder='댓글을 입력해주세요.' onChange={onChangeComment} value={commentMsg} ></textarea>
                                    <input type="submit" value="댓글달기" className={styles.commentBtn} />
                                </form>
                                <div className={styles.commentsDiv}>
                                    {
                                        commentInfos.map((comment, idx) => {
                                            return <li style={{listStyleType:"none", marginBottom:"3px"}} key={idx}>
                                                <CommentBoard nickname={comment.nickname} comment={comment.comment} date={comment.date} likes={comment.likes} />
                                            </li>
                                        })
                                    }
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default BookClick;