import { useState } from 'react';
import styles from './ProfileModifyModal.module.css';
import Modal from 'react-modal';

function LabelContent({ label, type }) {
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
            />
        </div >
    )
}

function LabelPassword({ label, btnName }) {
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
            <label className={`${styles['label']} ${labelBorder ? styles['active'] : ''}`}>
                {label}
            </label>
            <input
                type={"number"}
                className={`${styles['password']} ${labelBorder ? styles['active'] : ''}`}
                onFocus={() => handleFocusBorder('labelBorder')}
                onBlur={() => handleBlurBorder('labelBorder')}
            />
            <button className={styles.btn}>{btnName}</button>
        </div>
    )
}

function ProfileModify({ isOpen, onRequestClose }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => onRequestClose(false)}
            className={styles.profileModal}
        >
            <h1>프로필 수정</h1>
            <div className={styles.modifyDiv}>
                <LabelContent label={"닉네임"} type={"text"} />
                <LabelContent label={"생년월일"} type={"date"} />
                <p style={{ marginLeft: "3%", marginBottom: "0px" }}>비밀번호 변경</p>
                <LabelPassword label={"전화번호"} btnName={"인증번호 전송"} />
                <LabelPassword label={"인증번호"} btnName={"확인"} />
                <button className={styles.applyBtn}>적용</button>
            </div>
        </Modal>
    )
}

export default ProfileModify;