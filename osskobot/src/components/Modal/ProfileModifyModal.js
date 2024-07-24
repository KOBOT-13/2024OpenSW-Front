import { useEffect, useState } from 'react';
import styles from './ProfileModifyModal.module.css';
import Modal from 'react-modal';

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

function LabelPassword({ label, btnName, type }) {
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
            />
            <button className={styles.btn}>{btnName}</button>
        </div>
    )
}

function ProfileModify({ isOpen, onRequestClose }) {
    // api 사용해서 newNickName, newDate와 각각의 placeholder에 기존 값 넣어두기
    const [newNickName, setNewNickName] = useState("이재영");
    const [newDate, setNewDate] = useState("2002-12-04");
    const [newPassword, setNewPassword] = useState("");

    const onClickApply = () => {
        console.log(
            `nickname => ${newNickName}\ndate => ${newDate}로 변경`
        )
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => onRequestClose(false)}
            className={styles.profileModal}
        >
            <h1>프로필 수정</h1>
            <div className={styles.modifyDiv}>
                <LabelContent label={"닉네임"} type={"text"} placeholder={"이재영"} value={newNickName} onChange={setNewNickName} />
                <LabelContent label={"생년월일"} type={"date"} value={newDate} onChange={setNewDate} />
                <p style={{ marginLeft: "3%", marginBottom: "0px" }}>비밀번호 변경</p>
                <LabelPassword label={"이메일"} btnName={"이메일 인증"} type={"text"} />
                <LabelPassword label={"인증번호"} btnName={"확인"} type={"number"} />
                <button className={styles.applyBtn} onClick={onClickApply}>적용</button>
                <button className={styles.cancleBtn} onClick={() => onRequestClose(false)}>취소</button>
            </div>
        </Modal>
    )
}

export default ProfileModify;