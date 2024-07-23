import profile from '../../assets/profile.png';
import styles from './CharProfile.module.css';
import Modal from '../Modal/CharIntroModal';
import { useState } from 'react';

function CharProfile({img, name, mode}){
    const Name = "이재영";
    const [isClk, setIsClk] = useState(false);
    const onClickBtn = () => {
        setIsClk(true);
    }

    return (
        <div className={styles.profileDiv}>
            <button className={styles.profileBtn} onClick={onClickBtn} >
                <img className={styles.profileImg} src={profile}/>
            </button>
            <p className={styles.name}>{Name}</p>
            <Modal isOpen={isClk} onRequestClose={setIsClk} name={"뽀로로"} description={"눈 덮인 숲속마을 꼬마펭귄 나가신다. 언제나 즐거워 개구쟁이 뽀로로"} src={profile} mode={mode} content={`${Name} 안녕? 나는 뽀로로야 나와 함께 대화해볼래?`}/>
        </div>
    )
};

export default CharProfile;