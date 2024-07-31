import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import cookies from 'js-cookie';

function Login({ setReload }) {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUserInfo(userInfo => ({
            ...userInfo,
            [name]: value,
        }));
    };

    const login = () => {
        axios.post(`${process.env.REACT_APP_API_ADDRESS}users/auth/login/`,
            {
                email: userInfo.email,
                password: userInfo.password
            },
            {
                headers: {
                    'Content-type': 'application/json'
                }
            }
        ).then((response) => {
            const token = response.data.access
            const refresh_token = response.data.access
            cookies.set('token', token, { expires: 1, sameSite: 'Lax' });
            cookies.set('refresh_token', refresh_token, { expires: 1, sameSite: 'Lax' });
            cookies.set('pk', response.data.user['pk'], {expires: 1, sameSite: 'Lax'});
            setReload((current) => { return !current });
            axios.get(`${process.env.REACT_APP_API_ADDRESS}users/profile/`,
                {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${cookies.get('token')}`
                    },
                    withCredentials: true,
                }).then((response) => {
                    cookies.set('username', response.data.username, {expires: 1, sameSite: 'Lax'})
                }).catch((error) => {
                    console.log(error);
                })
            alert("로그인이 완료되었습니다.");
            navigate("/");
        }).catch((error) => {
            alert("이메일 또는 비밀번호가 옳바르지 않습니다.");
        })
    }
    return (
        <div className={styles.mainContainer}>
            <div className={styles.loginDiv}>
                <div className={styles.loginFontDiv}>
                    로그인
                </div>
                <div className={styles.loginInfo}>
                    <input type='text' className={styles.idInput} placeholder='이메일' name='email' onChange={handleInputChange} />
                    <input type='password' className={styles.passwordInput} placeholder='비밀번호' name='password' onChange={handleInputChange} />
                </div>
                <button className={styles.loginBtn} onClick={login}><strong>로그인</strong></button>
                <div className={styles.linkDiv}>
                    <Link className={styles.findLink} to='/find'>비밀번호 찾기</Link>
                    <Link className={styles.joinLink} to='/join'>회원가입</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;