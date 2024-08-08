import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
    background: #3063d2;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 500px;
    padding: 0 24px 0 24px;
`;

const P = styled.p`
    font-family: 'Pretendard-SemiBold';
    font-size: 14px;
    color: white;
    margin-left: 5px;
    user-select: none;
    white-space: nowrap;
`;

function BookClickBtn({icon, label, path, id}){
    const navigate = useNavigate();
    const onClickDiv = () => {
        navigate(`/bookclick/${id}/${path}`);
    };
    const Icon = styled(icon)``;
    return(
        <Div onClick={onClickDiv}>
            <Icon/>
            <P>{label}</P>
        </Div>
    );
}

export default BookClickBtn;