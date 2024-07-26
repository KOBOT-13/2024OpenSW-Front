import image from '../assets/profile.png';
import styles from './Chat.module.css';
import ChatMsg from '../components/ChatMsg/ChatMsg';
import STT from '../components/ChatMsg/STT';
import STTLoading from '../components/ChatMsg/STTLoading';

import { format } from 'date-fns';
import { IoSend } from "react-icons/io5";
import { IoMdMic } from "react-icons/io";
import { useEffect, useState, useRef } from 'react';
import SpeechRecognition from 'react-speech-recognition';

function Chat() {
    const messagesEndRef = useRef(null);
    const [messages, setMessages] = useState([]); 
    const id = messages.length + 1;  // 메시지의 id를 설정하는 방법 중 하나
    const [msg, setMsg] = useState("");
    const { transcript, listening, resetTranscript } = STT();

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

    const onClickSTTBtn = () => {
        if (listening) {
            SpeechRecognition.stopListening();
            const newMsg = {
                id: messages.length + 1,
                message: transcript,
                time: format(new Date(), 'hh:mm aa'),
                isOwnMessage: false
            };
            setMessages((prevMessages) => [...prevMessages, newMsg]);
            resetTranscript();
        } else {
            resetTranscript();
            SpeechRecognition.startListening({ language: 'ko-KR', continuous: true });
        }
    };

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
                {listening && (<div className={styles.loadingContainer}><STTLoading type="bubbles" color="#00f" /></div>)}
                <input className={styles.chatInput} onChange={handleChatInput} value={msg} type="text"></input>
                <button className={styles.chatBtn} onClick={onClickChatBtn} ><IoSend size={20} /></button>
                <button className={styles.chatBtn} onClick={onClickSTTBtn} ><IoMdMic size={20} color={listening ? "red" : "black"} /></button>
            </div>
            
        </div>
    )
}

export default Chat;