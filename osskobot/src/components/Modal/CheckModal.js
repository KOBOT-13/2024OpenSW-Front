import Modal from "react-modal";
import styles from './CheckModal.module.css';

function CustomModal({ isOpen, onRequestClose, setIsDel }) {
    const onClickYes = () => {
        setIsDel(true);
        onRequestClose(false);
    }
    const onClickNo = () => {
        setIsDel(false);
        onRequestClose(false);
    }
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => onRequestClose(false)}
            className={styles.customModal}
        >
            <h1 style={{marginTop:"10%"}}>정말로 삭제하시겠습니까?</h1>
            <div className={styles.buttonDiv}>
                <button onClick={onClickYes} className={styles.yesBtn}>
                    네
                </button>
                <button onClick={onClickNo} className={styles.noBtn}>
                    아니오
                </button>
            </div>
        </Modal>

    )
}

export default CustomModal;