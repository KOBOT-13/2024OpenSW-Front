import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import cookie from 'react-cookies';
import styles from './Join.module.css';

function Join() {
    const [isJoin, setIsJoin] = useState(true);
    const [nickname, setNickName] = useState("");
    const [date, setDate] = useState("");
    const code = new URL(window.location.href).searchParams.get("code");
    const rest_api_key = process.env.REACT_APP_REST_API_KEY;
    const redirect_uri = process.env.REACT_APP_JOIN_REDIRECT_URI;
    const navigate = useNavigate();
    useEffect(() => {
        // code 를 백엔드로 넘겨주는 코드 작성해야 함.
        async function fetchData() {
            const headers = {
                "Content-Type": "application/x-www-form-urlencoded"
            }
            const data = {
                grant_type: "authorization_code",
                client_id: rest_api_key,
                redirect_uri: redirect_uri,
                code: code
            }
            try {
                const res = await axios.post("https://kauth.kakao.com/oauth/token", qs.stringify(data), { headers });
                if (res && res.data) {
                    const expires = new Date();
                    expires.setSeconds(expires.getSeconds() + res.data.expires_in);
                    cookie.save('token', res.data.access_token, {
                        path: '/',
                        expires,
                    });
                    setIsJoin(false);
                    // navigate('/');
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    function submit(event) {
        event.preventDefault();
        cookie.save('nickname', nickname);
        cookie.save('date', date);
        navigate('/');
    }
    const onChangeNicknameHandler = (e) => {
        const nicknameValue = e.target.value;
        setNickName(nicknameValue);
    }
    const onChangeDateHandler = (e) => {
        const dateValue = e.target.value
        setDate(dateValue);
    }

    return (
        isJoin ?
            <h1>회원가입 중...</h1> :
            <form onSubmit={submit} className={styles.mainContainer}>
                <div className={styles.h3Div}>
                    <h2>계정 설정</h2>
                </div>
                <div className={styles.accountDiv}>
                    <h4 className={styles.account}>계정</h4>
                    <input type='text' className={styles.accountInput} value={"rktlskan021@naver.com"} readOnly />
                </div>
                <div className={styles.nicknameDiv}>
                    <h4 className={styles.nickname}>닉네임</h4>
                    <input type='text' className={styles.nicknameInput} value={nickname} placeholder='닉네임 입력' onChange={onChangeNicknameHandler} />
                </div>
                <div className={styles.dateDiv}>
                    <h4 className={styles.date}>생년월일</h4>
                    <input type='date' className={styles.dateInput} onChange={onChangeDateHandler} />
                </div>
                <button type='submit'>확인</button>
            </form>
    )
}

export default Join;