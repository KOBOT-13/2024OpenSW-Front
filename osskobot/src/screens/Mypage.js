import { format } from 'date-fns';
import { ko } from 'date-fns/locale'
import { useState } from 'react';
import styles from './Mypage.module.css';
import image from '../assets/profile.png';
import ProfileModifyModal from '../components/Modal/ProfileModifyModal';
import PreviousChat from '../components/PreviousChat/PreviousChat';

function Mypage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const btns = ['내가 읽은 책' ,'이전 대화', '독후감', '퀴즈기록', '내가 쓴 글'];
    const nickname = "이재영";
    const date = format(new Date("2002-12-04"), 'PPP', { locale: ko });
    const email = "rktlskan021@naver.com";

    const handleButtonClick = (index) => {
        setActiveIndex(index);
    };

    const onClickProfile = () =>{
        console.log("실행됨");
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
            <ProfileModifyModal isOpen={isOpen} onRequestClose={setIsOpen}/>
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
                        : activeIndex === 1 ? <PreviousChat />
                        : activeIndex === 2 ? <div>2</div>
                        : activeIndex === 3 ? <div>3</div>
                        : <div>4</div>
                    }
                </div>

            </div>
        </div>
    )
}

export default Mypage;