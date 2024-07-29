import { useState } from 'react';
import styles from './BookRequestModal.module.css';
import Modal from 'react-modal';

function LabelContent({ label, placeholder, value, onChange }) {
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
                type={"text"}
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

function BookRequest({isOpen, onRequestClose}) {
    const [bookName, setBookName] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [characters, setCharacters] = useState('');

    const onClickApply = () => {
        console.log(`책 : ${bookName}\n저자 : ${author}\n출판사 : ${publisher}\n등장인물 : ${characters}`)
        alert("신청되었습니다.");
        setBookName('');
        setAuthor('');
        setPublisher('');
        setCharacters('');
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => onRequestClose(false)}
            className={styles.bookRequestModal}
        >
            <div className={styles.titleDiv}>
                <h3>도서 신청하기</h3>
                <button className={styles.titleBtn} onClick={() => onRequestClose(false)} >X</button>
            </div>
            <div className={styles.contentDiv}>
                <LabelContent label={"책제목"} placeholder={"책제목을 입력해주세요."} value={bookName} onChange={setBookName}/>
                <LabelContent label={"저자"} placeholder={"저자를 입력해주세요."} value={author} onChange={setAuthor}/>
                <LabelContent label={"출판사"} placeholder={"출판사를 입력해주세요."} value={publisher} onChange={setPublisher}/>
                <LabelContent label={"대화하고 싶은 등장인물"} placeholder={"대화하고 싶은 인물을 입력해주세요."} value={characters} onChange={setCharacters}/>
            </div>
            <button className={styles.applyBtn} onClick={onClickApply}>신청하기</button>
        </Modal>
    )
}

export default BookRequest;