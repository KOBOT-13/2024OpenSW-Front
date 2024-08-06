import { useEffect, useState } from 'react';
import styles from './ProfileModifyModal.module.css';
import Modal from 'react-modal';
import { privateAxios, publicAxios } from '../../services/axiosConfig';
import styled from 'styled-components';
import cookies from 'js-cookie';

const ErrorSpan = styled.span`
    position: absolute;
    left: 50%;   /* 부모 요소의 50% 오른쪽으로 이동 */
    transform: translate(-50%, -50%); /* 본래 위치에서 -50%, -50% 이동하여 중앙 정렬 */
    font-size: 10px;
    color: lightcoral;
`;

function LabelContent({ label, type, placeholder, value, onChange }) {
    const [activeBorder, setActiveBorder] = useState({
        labelBorder: false,
    });
    const { labelBorder } = activeBorder;
    const handleFocusBorder = border => {
        setActiveBorder({
            ...activeBorder,
            [border]: true,
        });
    };
    const handleBlurBorder = border => {
        setActiveBorder({
            ...activeBorder,
            [border]: false,
        });
    };
    return (
        <div className={styles.labelContentDiv}>
            <p
                className={`${styles['label']} ${labelBorder ? styles['active'] : ''}`}
            >
                {label}
            </p>
            <input
                type={type}
                className={`${styles['content']} ${labelBorder ? styles['active'] : ''}`}
                onFocus={() => handleFocusBorder('labelBorder')}
                onBlur={() => handleBlurBorder('labelBorder')}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div >
    )
}

function LabelPassword({ label, btnName, type, value, onChange, onClick }) {
    const [activeBorder, setActiveBorder] = useState({
        labelBorder: false,
    });
    const { labelBorder } = activeBorder;
    const handleFocusBorder = border => {
        setActiveBorder({
            ...activeBorder,
            [border]: true,
        });
    };
    const handleBlurBorder = border => {
        setActiveBorder({
            ...activeBorder,
            [border]: false,
        });
    };
    return (
        <div className={styles.labelPasswordDiv}>
            <div className={styles.labelDiv}>
                <label className={`${styles['label']} ${labelBorder ? styles['active'] : ''}`}>
                    {label}
                </label>
            </div>
            <input
                type={type}
                className={`${styles['password']} ${labelBorder ? styles['active'] : ''}`}
                onFocus={() => handleFocusBorder('labelBorder')}
                onBlur={() => handleBlurBorder('labelBorder')}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <button className={styles.btn} onClick={onClick} >{btnName}</button>
        </div>
    )
}

function ProfileModify({ isOpen, onRequestClose, nickname, date, reload }) {
    const [newNickName, setNewNickName] = useState('');
    const [newDate, setNewDate] = useState('');
    const [email, setEmail] = useState('');
    const [validMsg, setValidMsg] = useState('');

    useEffect(() => {
        setNewNickName(nickname);
        setNewDate(date);
    }, [nickname, date])

    const onClickApply = async() => {
        if(newNickName === nickname){
            privateAxios.patch(`users/profile/update/`,
                {
                    'birth_date': newDate
                }
            ).then((response) => {
                alert("프로필을 수정하였습니다.");
                reload((current) => {return !current});
            }).catch((error) => {
                console.log(error);
            });
        } else{
            publicAxios.post('users/check-username/',
                {
                    "username": newNickName
                }
            ).then((response) => {
                privateAxios.patch(`users/profile/update/`,
                    {
                        'username': newNickName,
                        'birth_date': newDate
                    }
                ).then((response) => {
                    alert("프로필을 수정하였습니다.");
                    cookies.set("username", newNickName);
                    reload((current) => {return !current});
                    setValidMsg("");
                }).catch((error) => {
                    console.log(error);
                });
            }).catch((error) => {
                setValidMsg(error.response.data.detail);
            });
        }
    }
 
    const onClickEmailValidate = () => {
        if(cookies.get('email') === email){
            publicAxios.post(`users/password_reset/`, 
                {
                    "email" : email
                }
            ).then(() => {
                alert("비밀번호 변경 이메일이 전송되었습니다.");
            }).catch((error) => {
                console.log(error);
            })
        }else{
            alert("로그인 된 계정의 이메일을 입력해주세요.");
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => onRequestClose(false)}
            className={styles.profileModal}
        >
            <h1>프로필 수정</h1>
            <div className={styles.modifyDiv}>
                <LabelContent label={"닉네임"} type={"text"} placeholder={nickname} value={newNickName} onChange={setNewNickName} />
                <LabelContent label={"생년월일"} type={"date"} value={newDate} onChange={setNewDate} />
                <p style={{ marginLeft: "3%", marginBottom: "0px" }}>비밀번호 변경</p>
                <LabelPassword label={"이메일"} btnName={"이메일 인증"} type={"text"} value={email} onChange={setEmail} onClick={onClickEmailValidate} />
                <ErrorSpan>{validMsg}</ErrorSpan>
                <button className={styles.applyBtn} onClick={onClickApply}>적용</button>
                <button className={styles.cancleBtn} onClick={() => onRequestClose(false)}>취소</button>
            </div>
        </Modal>
    )
}

export default ProfileModify;