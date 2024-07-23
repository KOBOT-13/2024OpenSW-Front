import styles from './ChatMsg.module.css';

const ChatMsg = ({ message, time, isOwnMessage }) => { 
    return (
        <div className={isOwnMessage ? styles.messageContainer : styles.messageContainerOwnMessage}>
            <div className={styles.bubbleDiv}>
                <div className={styles.msg}>{message}</div>
            </div>
            <div className={styles.msgInfoDiv}>
                    <span className={styles.msgTime}>{time}</span>
            </div>
        </div>
    );
}

export default ChatMsg;