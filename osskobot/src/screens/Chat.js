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
import cookies from 'js-cookie';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState("");
    const [character, setCharacter] = useState(null);
    const [STTNone, setSTTNone] = useState(false);
    const messagesEndRef = useRef(null);
    const { transcript, listening, resetTranscript } = STT();
    const audioRef = useRef(null);

    const get_characters_url = process.env.REACT_APP_API_GET_CHARACTERS_URL;
    const post_mtt_url = process.env.REACT_APP_API_POST_MTT

    // API로부터 캐릭터 데이터 가져오기
    useEffect(() => {
        const getCharacters = async () => {
            try {
                const response = await axios.get(get_characters_url);
                if (response.status !== 200) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                setCharacter(response.data[0]); // 여길 동적으로 바꿔줘야 함
            } catch (error) {
                console.error('Error get characters:', error);
            }
        };
        getCharacters();
    }, [get_characters_url]);


    const MTT = (message) => {
        console.error('Character data is missing');
        axios.post(post_mtt_url,
            {
                conversation_id: character.book,
                character_id: character.id,
                message: message,
                speaker: character.speaker,
                volume: character.volume,
                speed: character.speed,
                pitch: character.pitch,
                emotion: character.emotion,
                emotion_strength: character.emotion_strength,
                format: character.format,
                alpha: character.alpha,
                end_pitch: character.end_pitch,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.get('token')}`
                }
            }
        )
            .then((response) => {
                const bot_response = response.data.message
                const tts_url = response.data.file_url
                const newMsg = {
                    message: bot_response,
                    time: format(new Date(), 'hh:mm aa'),
                    tts: `${process.env.REACT_APP_ADDRESS}${tts_url}`,
                    isOwnMessage: false
                };
                console.log(newMsg.tts)
                setMessages((prevMessages) => [...prevMessages, newMsg]);
            });
        };   
    

    const handleChatInput = (e) => {
        setMsg(e.target.value);
    }

    const onClickChatBtn = () => {
        if (msg === "") {
            return;
        }
        const newMsg = {
            message: msg,
            time: format(new Date(), 'hh:mm aa'),
            isOwnMessage: true
        }
        setMessages((prevMessages) => [...prevMessages, newMsg]);
        MTT(msg)
        setMsg("");
    }

    const onClickSTTBtn = () => {
        if (listening) {
            SpeechRecognition.stopListening();
            if (transcript) {
                const newMsg = {
                    message: transcript,
                    time: format(new Date(), 'hh:mm aa'),
                    isOwnMessage: true
                };
                setMessages((prevMessages) => [...prevMessages, newMsg]);
                MTT(transcript)
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

    const playAudio = (url) => {
        if (audioRef.current) {
            audioRef.current.src = url;
            audioRef.current.play();
        }
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.imgChatDiv}>
                <img src={image} className={styles.profileImg} alt="Profile" />
                <div className={styles.chatDiv}>
                    {messages.map(msg => (
                        <ChatMsg
                            message={msg.message}
                            time={msg.time}
                            isOwnMessage={msg.isOwnMessage}
                            playAudio={() => playAudio(msg.tts)}
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
            <audio ref={audioRef} />
        </div>
    );
}

export default Chat;
