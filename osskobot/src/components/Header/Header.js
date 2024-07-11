import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useState } from 'react';

function Header() {
    const [isLogin, setIsLogin] = useState(true);
    const logoutClick = (() => setIsLogin(false))
    const loginClick = (() => setIsLogin(true))
    return (
        <header className={styles.Header}>
            <Link className={styles.appname} to="/">웹이름</Link>
            {isLogin ?
                <div className={styles.logoutmypagediv}>
                    <button className={styles.logout} onClick={logoutClick}><strong>로그아웃</strong></button>
                    <Link className={styles.mypage} to="/mypage">
                        <strong>마이페이지</strong>
                    </Link>
                </div>
                :
                <div className={styles.loginjoindiv}>
                    <Link className={styles.login} onClick={loginClick} to="/login"><strong>로그인</strong></Link>
                    <Link className={styles.join} to="/join"><strong>회원가입</strong></Link>
                </div>
            }
        </header>
    )
}

export default Header;