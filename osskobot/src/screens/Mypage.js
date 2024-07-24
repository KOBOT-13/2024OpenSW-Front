import {format} from 'date-fns';
import {ko} from 'date-fns/locale'
import styles from './Mypage.module.css';
import image from '../assets/profile.png';

function Mypage(){
    const nickname = "이재영";
    const date = format(new Date("2002-12-04"), 'PPP', {locale: ko});
    console.log(date);
    return(
        <div className={styles.mainContainer}>
            <div className={styles.profileDiv}>
                <img src={image} className={styles.profileImg} />
                <div className={styles.userInfoDiv}>
                    <p><u>{nickname}</u>님 안녕하세요.</p>
                    <p>생년월일 : {date}</p>
                </div>
            </div>
            <div className={styles.myReadActDiv}>

            </div>
        </div>
    )
}

export default Mypage;