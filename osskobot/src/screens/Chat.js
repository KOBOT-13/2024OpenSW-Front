import React, { useEffect, useState, useRef } from 'react';
import styles from './Chat.module.css'; // 이미 정의된 스타일 파일
import { IoSend } from "react-icons/io5";
import { IoMdMic } from "react-icons/io";
import { IoIosWarning } from "react-icons/io";
import image from '../assets/profile.png';
import ChatMsg from '../components/ChatMsg/ChatMsg';
import STT from '../components/ChatMsg/STT';
import STTLoading from '../components/ChatMsg/STTLoading';
import { format } from 'date-fns';
import SpeechRecognition from 'react-speech-recognition';
import axios from 'axios';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState("");
    const [characters, setCharacters] = useState([]);
    const [STTNone, setSTTNone] = useState(false);
    const messagesEndRef = useRef(null);
    const { transcript, listening, resetTranscript } = STT();

    const get_characters_url = process.env.REACT_APP_API_GET_CHARACTERS_URL;

    // API로부터 캐릭터 데이터 가져오기
    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get(get_characters_url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                setCharacters(response.data);    
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };

        fetchCharacters();
    }, [get_characters_url]);

    const handleChatInput = (e) => {
        setMsg(e.target.value);
    }

    const chatBotChatting = () => {
        const newMsg = {
            id: messages.length + 1,
            message: "챗봇의 채팅입니다.",
            time: format(new Date(), 'hh:mm aa'),
            isOwnMessage: true
        };

        setMessages((prevMessages) => [...prevMessages, newMsg]);
    }

    const onClickChatBtn = () => {
        if (msg === "") {
            return;
        }
        const newMsg = {
            id: messages.length + 1,
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
            if (transcript) {
                const newMsg = {
                    id: messages.length + 1,
                    message: transcript,
                    time: format(new Date(), 'hh:mm aa'),
                    isOwnMessage: false
                };
                setMessages((prevMessages) => [...prevMessages, newMsg]);
                chatBotChatting();
                setSTTNone(false);
            } else {
                setSTTNone(true);
            }
            resetTranscript();
        } else {
            resetTranscript();
            SpeechRecognition.startListening({ language: 'ko-KR', continuous: true });
            setSTTNone(false);
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
                <img src={image} className={styles.profileImg} alt="Profile" />
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
            {STTNone && (
                <div className={styles.warningContainer}>
                    <IoIosWarning size={24} color="red" />
                    <span className={styles.warningText}>음성 인식 결과가 없습니다. 다시 시도해 주세요.</span>
                </div>
            )}
            <div className={styles.inputDiv}>
                {listening && (
                    <div className={styles.sttLoading}>
                        <STTLoading type="bubbles" color="#00f" />
                    </div>
                )}
                <input
                    className={styles.chatInput}
                    onChange={handleChatInput}
                    value={msg}
                    type="text"
                    placeholder=""/>
                <button className={styles.chatBtn} onClick={onClickChatBtn}><IoSend size={20} /></button>
                <button className={styles.STTBtn} onClick={onClickSTTBtn}><IoMdMic size={20} color={listening ? "red" : "black"} /></button>
            </div>
        </div>
    );
}

export default Chat;
