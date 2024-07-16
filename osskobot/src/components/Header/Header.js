import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useEffect, useState } from 'react';
import cookie from 'react-cookies';

function Header() {
    const rest_api_key = process.env.REACT_APP_REST_API_KEY;
    const login_redirect_uri = process.env.REACT_APP_LOGIN_REDIRECT_URI;
    const join_redirect_uri = process.env.REACT_APP_JOIN_REDIRECT_URI;
    const logout_redirect_uri = process.env.REACT_APP_LOGOUT_REDIRECT_URI;
    const [isLogin, setIsLogin] = useState(!!cookie.load('token'));
    const token = cookie.load('token');
    useEffect(() => {
        // 쿠키에서 토큰을 로드하여 로그인 상태 업데이트
        setTimeout(() => {
            setIsLogin(!!cookie.load('token'));
        }, 500);
    }, [token]);
    
    const SocialKakaoLogin = () => {
        const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${login_redirect_uri}&response_type=code`;
        const handleLogin = ()=>{
            window.location.href = kakaoURL;
        }
        return handleLogin();
    };
    const SocialKakaoJoin = () => {
        const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${join_redirect_uri}&response_type=code`;
        const handleLogin = ()=>{
            window.location.href = kakaoURL;
        };
        return handleLogin();
    };
    const handleLogout = () => {
        const kakaoURL = `https://kauth.kakao.com/oauth/logout?client_id=${rest_api_key}&logout_redirect_uri=${logout_redirect_uri}&state=code`;
        window.location.href = kakaoURL;
    };
    return (
        <header className={styles.Header}>
            <Link className={styles.appname} to="/">웹이름</Link>
            {isLogin ?
                <div className={styles.logoutmypagediv}>
                    <button className={styles.logout} onClick={handleLogout}><strong>로그아웃</strong></button>
                    <Link className={styles.mypage} to="/mypage">
                        <strong>마이페이지</strong>
                    </Link>
                </div>
                :
                <div className={styles.loginjoindiv}>
                    <button className={styles.login} onClick={SocialKakaoLogin}><strong>로그인</strong></button>
                    <button className={styles.join} onClick={SocialKakaoJoin}><strong>회원가입</strong></button>
                </div>
            }
        </header>
    )
}

export default Header;