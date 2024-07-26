import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './Login.module.css';

function Login(props) {
    const navigate = useNavigate();
    const {reload, setReload} = props;
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
        // 로그인과 비밀번호를 통해 token을 받아오는 로직 필요
        setReload(!reload);
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