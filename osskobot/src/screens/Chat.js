import image from '../assets/profile.png';
import styles from './Chat.module.css';
import { IoSend } from "react-icons/io5";


function Chat() {
    return(
        <div className={styles.mainContainer}>
            <div className={styles.imgChatDiv}>
                <img src={image} className={styles.profileImg} />
                <div className={styles.chatDiv}>

                </div>
            </div>
            <div className={styles.inputDiv}>
                <input className={styles.chatInput} type="text"></input>
                <button className={styles.chatBtn}><IoSend size={20}/></button>
            </div>
        </div>
    )
}

export default Chat;