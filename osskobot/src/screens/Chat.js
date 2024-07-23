import image from '../assets/profile.png';
import styles from './Chat.module.css';
import ChatMsg from '../components/ChatMsg/ChatMsg';

import { format } from 'date-fns';
import { IoSend } from "react-icons/io5";
import { useEffect, useState, useRef } from 'react';

function Chat() {
    const messagesEndRef = useRef(null);
    const [messages, setMessages] = useState([]); 
    const id = messages.length + 1;  // 메시지의 id를 설정하는 방법 중 하나
    const [msg, setMsg] = useState("");

    const handleChatInput = (e) => {
        setMsg(e.target.value);
    }

    const chatBotChatting = () => {
        const newMsg = {
            id: id+1,
            message: "챗봇의 채팅입니다.",
            time: format(new Date(), 'hh:mm aa'),
            isOwnMessage: true
        };

        setMessages((prevMessages) => [...prevMessages, newMsg]);
    }

    const onClickChatBtn = () => {
        if(msg === ""){
            return;
        }
        const newMsg = {
            id: id,
            message: msg,
            time: format(new Date(), 'hh:mm aa'),
            isOwnMessage: false
        };

        setMessages((prevMessages) => [...prevMessages, newMsg]);

        setMsg("");

        chatBotChatting();
    }

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

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
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className={styles.inputDiv}>
                <input className={styles.chatInput} onChange={handleChatInput} value={msg} type="text"></input>
                <button className={styles.chatBtn} onClick={onClickChatBtn} ><IoSend size={20} /></button>
            </div>
        </div>
    )
}

export default Chat;