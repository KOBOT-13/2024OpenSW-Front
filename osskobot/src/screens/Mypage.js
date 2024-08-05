import { useEffect, useState } from 'react';
import styles from './Mypage.module.css';
import image from '../assets/profile.png';
import ProfileModifyModal from '../components/Modal/ProfileModifyModal';
import PreviousChat from '../components/PreviousChat/PreviousChat';
import cookies from 'js-cookie';
import { privateAxios } from '../services/axiosConfig';
import BookReportInfo from '../components/BookReport/BookReportInfo';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function Mypage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const btns = ['내가 읽은 책', '이전 대화', '독후감', '퀴즈기록', '내가 쓴 글'];
    const nickname = cookies.get('username');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [reload, setReload] = useState(false);
    const [reloadPost, setReloadPost] = useState(false);
    const [reportInfo, setReportInfo] = useState([]);
    const [conversations, setConversations] = useState([]);
    const navigate = useNavigate();
    const imgs = {
        5: { img: `${process.env.REACT_APP_ADDRESS}/media/book_covers/1.jpg`, title: "백설공주" },
        4: { img: `${process.env.REACT_APP_ADDRESS}/media/book_covers/5.jpg`, title: "흥부와 놀부" },
        3: { img: `${process.env.REACT_APP_ADDRESS}/media/book_covers/3.jpg`, title: "피터팬" },
        2: { img: `${process.env.REACT_APP_ADDRESS}/media/book_covers/4.jpeg`, title: "헨젤과 그레텔" },
        1: { img: `${process.env.REACT_APP_ADDRESS}/media/book_covers/2.jpg`, title: "아기 돼지 삼형제" }
    }

    useEffect(() => {
        const userInfoFetch = async () => {
            await privateAxios.get(`users/profile/`)
                .then((response) => {
                    setDate(response.data.birth_date);
                    setEmail(response.data.email);
                }).catch((error) => {
                    console.log(error);
                });
        }
        userInfoFetch();
    }, [reload]);

    useEffect(() => {
        const getPosts = async () => {
            privateAxios.get(`books/my_posts`)
                .then((response) => {
                    setReportInfo(response.data);
                    console.log(response.data);
                }).catch((error) => {
                    console.log(error);
                });
        }
        getPosts();
    }, [reloadPost])

    useEffect(() => {
        privateAxios.get(`dialogs/conversation/`)
            .then(response => { 
                console.log(response.data)
                const sortedConversations = response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                setConversations(sortedConversations);
            })

    }, []);

    const handleButtonClick = (index) => {
        setActiveIndex(index);
    };

    const onClickProfile = () => {
        setIsOpen(true);
    }

    const chatlistclick = (id, characterid) => {
        navigate(`/bookclick/${id}/chatcharchoose/${characterid}/chat`);
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.profileDiv} onClick={onClickProfile}>
                <img src={image} className={styles.profileImg} />
                <div className={styles.userInfoDiv}>
                    <p className={styles.profileP}><u>{nickname}</u>님 안녕하세요.</p>
                    <p className={styles.profileP}>생년월일 : {date}</p>
                    <p className={styles.profileP}>E-mail : {email}</p>
                </div>
            </div>
            <ProfileModifyModal reload={setReload} date={date} nickname={nickname} isOpen={isOpen} onRequestClose={setIsOpen} />
            <div className={styles.myReadActDiv}>
                <h3 style={{ marginBottom: "0" }}>나의 독후활동</h3>
                <div className={styles.btnsDiv}>
                    {btns.map((label, index) => (
                        <button
                            key={index}
                            className={`${styles['btn']} ${activeIndex === index ? styles['active'] : ''}`}
                            onClick={() => handleButtonClick(index)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                <hr />
                <div className={styles.readActDiv}>
                    {
                        activeIndex === 0 ? <div>0</div>
                            : activeIndex === 1 ? <PreviousChat conversations={conversations} onChatClick={chatlistclick} />    
                                : activeIndex === 2 ?
                                    reportInfo.map((value, key) => {
                                        console.log(value);
                                        return <BookReportInfo key={key} id={value.id} imageSrc={imgs[value.book].img} title={imgs[value.book].title} reviewDate={format(value.post_date, "yyyy-MM-dd")} content={value.body} setReload={setReloadPost} />
                                    })
                                    : activeIndex === 3 ? <div>3</div>
                                        : <div>4</div>
                    }
                </div>

            </div>
        </div>
    )
}

export default Mypage;