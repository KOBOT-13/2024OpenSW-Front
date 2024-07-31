import React, { useEffect, useState, useRef } from 'react';
import styles from './Chat.module.css'; // 이미 정의된 스타일 파일
import { IoBowlingBallOutline, IoSend } from "react-icons/io5";
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
import { useParams } from 'react-router-dom';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState("");
    const [character, setCharacter] = useState(null);
    const [STTNone, setSTTNone] = useState(false);
    const [conversationid, setConversationid] = useState(null);
    const messagesEndRef = useRef(null);
    const { transcript, listening, resetTranscript } = STT();
    const audioRef = useRef(null);
    const { id, characterid } = useParams();

    const get_characters_url = process.env.REACT_APP_API_GET_CHARACTERS_URL;
    const post_mtt_url = process.env.REACT_APP_API_POST_MTT

    // API로부터 캐릭터 데이터 가져오기
    useEffect(() => {
        const getCharacters = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_ADDRESS}books/${id}/characters/`);
                if (response.status !== 200) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const characters = response.data;
                const foundCharacter = characters.find(char => char.id === Number(characterid));
                setCharacter(foundCharacter);
            } catch (error) {
                console.error('Error get characters:', error);
            }
        };
        getCharacters();
    }, []);


    useEffect(() => {
        const createConversation = async () => {
            const response = await axios.post(`${process.env.REACT_APP_API_ADDRESS}dialogs/conversation/`,
                {
                    book: id,
                    character: characterid,
                },
                {
                    headers: {
                        "Content-Type": 'application/json',
                        'Authorization': `Bearer ${cookies.get('token')}`
                    }
                }
            );
            const conid = response.data.id;
            console.log(conid);
            setConversationid(conid);
        };
        createConversation();
    }, []);

    useEffect(() => {
        const getMsg = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_ADDRESS}dialogs/${characterid}/messages/`);
            const data = response.data;
            const last30Messages = data.slice(-30);
            const lastMessages = last30Messages.map(msg => ({
                message: msg.message,
                time: format(new Date(msg.timestamp), 'hh:mm aa'),
                tts: msg.tts_file,
                isOwnMessage: msg.sender_type === 'user'
            }));
            setMessages(lastMessages);
        };
        if(conversationid !== null){
            getMsg();
        }
            
    }, [conversationid]);

    const MTT = (message) => {
        if (!character) {
            console.error('Character data is missing');
            return; // 캐릭터 데이터가 없으면 함수 종료
        }       
        axios.post(post_mtt_url,
            {
                conversation_id: conversationid,
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
                playAudio(`${process.env.REACT_APP_ADDRESS}${tts_url}`)
            });
        };   
    

    const handleChatInput = (e) => {
        setMsg(e.target.value);
    }

    const onClickChatBtn = () => {

        if (msg === "") {
            return;
        }
        if (!character) {
            console.error('Character data is missing');
            return; // 캐릭터 데이터가 없으면 함수 종료
        }
        const newMsg = {
            message: msg,
            time: format(new Date(), 'hh:mm aa'),
            isOwnMessage: true
        }
        console.log(msg)
        console.log(character.id)
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

    // const onClickEndBtn = () => {

    // }

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
