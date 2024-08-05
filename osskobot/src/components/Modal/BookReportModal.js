import styled from "styled-components";
import Modal from "react-modal";
import { privateAxios } from "../../services/axiosConfig";

const CustomModal = styled(Modal)`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 400px;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 1px solid black;
    border-radius: 8px;
`

const TestArea = styled.textarea`
    width: 100%;
    height: 90%;
    padding: 20px;
    box-sizing: border-box; 
    overflow-y: scroll;
`

const Button = styled.button`
    float: right;
    margin-right: 10px;

    &.delete {
        background: #e65054;
        border-style: solid;
        border-color: #e65054;
        border-radius: 2px;
    }
`

function BookReportModal({ isOpen, onRequestClose, content, id, setReload }) {
    const onClickDelete = () => {
        privateAxios.delete(`books/posts/${id}/`)
            .then(() => {
                onRequestClose(false);
                setReload((current) => !current);
                alert("독후감이 삭제되었습니다.");
            }).catch((error) => {
                console.log(error);
            })
    }

    return (
        <CustomModal
            isOpen={isOpen}
            onRequestClose={() => onRequestClose(false)}
        >
            <TestArea disabled defaultValue={content}>
            </TestArea>
            <Button className="delete" onClick={onClickDelete}>
                삭제
            </Button>
            <Button onClick={() => onRequestClose(false)}>
                나가기
            </Button>
        </CustomModal>
    )
}

export default BookReportModal;