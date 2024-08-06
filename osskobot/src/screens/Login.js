import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './Login.module.css';
import {privateAxios, publicAxios} from '../services/axiosConfig';
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

    const getUserReadBook = () => {
        privateAxios.get(`books/user-read-book-list/get/`)
        .then((response) => {
            const newReadBooks = response.data.map((value) => value.book.id);
            cookies.set("read_books", JSON.stringify(newReadBooks));
        }).catch((error) => {
            console.log(error);
        });
    } 

    const login = () => {
        publicAxios.post(`users/auth/login/`,
            {
                email: userInfo.email,
                password: userInfo.password
            },
        ).then((response) => {
            const token = response.data.access;
            const refresh_token = response.data.refresh;
            const expires = new Date(new Date().getTime() + 25 * 60000);
            console.log(expires);
            cookies.set('token', token);
            cookies.set('expires', expires);
            cookies.set('refresh_token', refresh_token);
            cookies.set('pk', response.data.user['pk']);
            cookies.set('email', response.data.user['email']);
            getUserReadBook();
            setReload((current) => { return !current });
            privateAxios.get(`users/profile/`)
            .then((response) => {
                    cookies.set('username', response.data.username);
                }).catch((error) => {
                    console.log(error);
                })
            alert("로그인이 완료되었습니다.");
            navigate("/");
        }).catch((error) => {
            console.log(error);
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