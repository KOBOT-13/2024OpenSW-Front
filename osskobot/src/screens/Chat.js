import image from '../assets/profile.png';
import styles from './Chat.module.css';
import { IoSend } from "react-icons/io5";
import ChatMsg from '../components/ChatMsg/ChatMsg';

const messages = [
    { id: 1, message: 'Hello!', time: '10:00 AM', isOwnMessage: false },
    { id: 2, message: 'Hi, Alice!', time: '10:01 AM', isOwnMessage: true },
    { id: 3, message: 'How are you?', time: '10:02 AM', isOwnMessage: false },
    { id: 4, message: 'I am good, thanks!', time: '10:03 AM', isOwnMessage: true },
];

function Chat() {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.imgChatDiv}>
                <img src={image} className={styles.profileImg} />
                <div className={styles.chatDiv}>
                    {messages.map(msg => (
                        <ChatMsg
                            key={msg.id}
                            message={msg.message}
                            time={msg.time}
                            isOwnMessage={msg.isOwnMessage}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.inputDiv}>
                <input className={styles.chatInput} type="text"></input>
                <button className={styles.chatBtn}><IoSend size={20} /></button>
            </div>
        </div>
    )
}

export default Chat;