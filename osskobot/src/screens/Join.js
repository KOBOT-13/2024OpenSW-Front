import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Join.module.css';

function Join() {
    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState("");
    const [validIdMsg, setValidIdMsg] = useState("");
    const [validPasswordMsg, setValidPasswordMsg] = useState("");
    const [validPassword2Msg, setValidPassword2Msg] = useState("");
    const [validEmailMsg, setValidEmail2Msg] = useState("");

    const [isId, setIsId] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isPassword2, setIsPassword2] = useState(false);
    const [isEmail, setIsEmail] = useState(false);

    const [userInfo, setUserInfo] = useState({
        email: '',
        id: '',
        password: '',
        password2: '',
        nickname: '',
        date: '',
    });

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUserInfo(userInfo => ({
            ...userInfo,
            [name]: value,
        }));
    };

    const onChangeEmail = ((e) => {
        handleInputChange(e);
        const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
        const emailCurrent = e.target.value;

        if (e.target.value.length === 0) {
            setValidEmail2Msg("필수 입력항목입니다.");
        }
        else if (!emailRegEx.test(emailCurrent)) {
            setValidEmail2Msg("이메일 형식을 지켜주세요.");
        }
        else {
            setValidEmail2Msg("O");
            setIsEmail(true);
        }

    });

    const onChangeId = ((e) => {
        handleInputChange(e);
        if (e.target.value.length === 0) {
            setValidIdMsg("필수 입력항목입니다.");
            setIsId(false);
        }
        else if (e.target.value.length < 3 || e.target.value.length > 16) {
            setValidIdMsg("아이디는 3글자 이상 16글자 이하로 해주세요.");
            setIsId(false);
        }
        else {
            setValidIdMsg("O");
            setIsId(true);
        }
    });

    const onChangePassword = ((e) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,32}$/;
        const passwordCurrent = e.target.value;
        handleInputChange(e);

        if (e.target.value.length === 0) {
            setValidPasswordMsg('필수 입력항목입니다.')
            setIsPassword(false)
        }
        else if (!passwordRegex.test(passwordCurrent)) {
            setValidPasswordMsg('숫자+영문자+특수문자 조합으로 8자리 이상 32자 이하로 입력해주세요!')
            setIsPassword(false)
        }
        else {
            setValidPasswordMsg('O')
            setIsPassword(true)
        }

    });

    const onChangePassword2 = ((e) => {
        handleInputChange(e);
        if (userInfo.password !== e.target.value) {
            setValidPassword2Msg('비밀번호가 일치하지 않습니다.');
            setIsPassword2(false);
        }
        else {
            setValidPassword2Msg('O');
            setIsPassword2(true);
        }
    });

    const join = () => {
        if (isId && isPassword && isPassword2 && isEmail) {
            axios.post(`${process.env.REACT_APP_API_ADDRESS}users/auth/registration/`,
                {
                    username: userInfo.id,
                    email: userInfo.email,
                    password1: userInfo.password,
                    password2: userInfo.password2
                },
                {
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            )
                .then((response) => {
                    navigate("/login");
                    alert("회원가입이 완료되었습니다.");
                })
                .catch((error) => {
                    console.log(error);
                    const usernameErr = error.response.data['username'];
                    const emailErr = error.response.data['email'];
                    setErrorMsg(`${usernameErr!==undefined ? usernameErr : ""}\n${emailErr!==undefined ? emailErr : ""}`);
                })
        }
        else {
            alert("정보를 다시 확인해주세요.");
        }
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.joinDiv}>
                <div className={styles.joinFontDiv}>
                    회원가입
                </div>
                <div className={styles.joinInfo1}>
                    <input type='text' className={styles.emailInput} placeholder='이메일' name='email' onChange={onChangeEmail} />
                    <span className={styles.validSpan}>{validEmailMsg}</span>
                    <input type='text' className={styles.idInput} placeholder='아이디' name='id' onChange={onChangeId} />
                    <span className={styles.validSpan}>{validIdMsg}</span>
                    <input type='password' className={styles.passwordInput} placeholder='비밀번호' name='password' onChange={onChangePassword} />
                    <span className={styles.validSpan}>{validPasswordMsg}</span>
                    <input type='password' className={styles.passwordInput} placeholder='비밀번호 확인' name='password2' onChange={onChangePassword2} />
                    <span className={styles.validSpan}>{validPassword2Msg}</span>
                    <input type='text' className={styles.idInput} placeholder='닉네임' name='nickname' onChange={handleInputChange} />
                    <input type='date' className={styles.idInput} placeholder='생년월일' name='date' onChange={handleInputChange} />
                </div>
                <div>
                    <pre className={styles.errorMsg}>{errorMsg}</pre>
                    <button className={styles.joinBtn} onClick={join}><strong>회원가입</strong></button>
                </div>
            </div>
        </div>
    )
}

export default Join;