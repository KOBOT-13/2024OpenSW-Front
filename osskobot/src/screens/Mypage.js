import { format } from 'date-fns';
import { ko } from 'date-fns/locale'
import { useEffect, useState } from 'react';
import styles from './Mypage.module.css';
import image from '../assets/profile.png';
import ProfileModifyModal from '../components/Modal/ProfileModifyModal';
import cookies from 'js-cookie';
import { privateAxios } from '../services/axiosConfig';
import QuizRecord from './MypageQuizRecord';

function Mypage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const btns = ['내가 읽은 책' ,'이전 대화', '독후감', '퀴즈기록', '내가 쓴 글'];
    const nickname = cookies.get('username');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [reload, setReload] = useState(false);
    useEffect(() => {
        const userInfoFetch = async () => {
            privateAxios.get(`users/profile/`)
                .then((response) => {
                    setDate(response.data.birth_date);
                    setEmail(response.data.email);
                }).catch((error) => {
                    console.log(error);
                });
        }

        userInfoFetch();
    }, [reload]);

    const handleButtonClick = (index) => {
        setActiveIndex(index);
    };

    const onClickProfile = () =>{
        setIsOpen(true);
    }
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
            <ProfileModifyModal reload={setReload} date={date} nickname={nickname} isOpen={isOpen} onRequestClose={setIsOpen}/>
            <div className={styles.myReadActDiv}>
                <h3 style={{marginBottom:"0"}}>나의 독후활동</h3>
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
                <hr/>
                <div className={styles.readActDiv}>
                    {
                        activeIndex === 0 ? <div>0</div> 
                        : activeIndex === 1 ? <div>1</div>
                        : activeIndex === 2 ? <div>2</div>
                        : activeIndex === 3 ? <QuizRecord/>
                        : <div>4</div>
                    }
                </div>

            </div>
        </div>
    )
}

export default Mypage;