import styles from './ChatMsg.module.css';

const ChatMsg = ({ message, time, isOwnMessage, playAudio }) => { 
    return (
        <div className={isOwnMessage ? styles.messageContainerOwnMessage : styles.messageContainer}>
            <div className={styles.bubbleDiv}>
                <div className={styles.msg}>{message}</div>
            </div>
            <div className={styles.msgInfoDiv}>
                    <span className={styles.msgTime}>{time}</span>
                    {!isOwnMessage && playAudio && (
                        <button className={styles.TTSBtn} onClick={playAudio}></button>
                    )}
            </div>
        </div>
    );
}

export default ChatMsg;