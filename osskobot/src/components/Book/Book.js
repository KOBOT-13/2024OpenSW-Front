import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
    &.Book{
        display: flex;
        justify-content: center;
        width: 290px;
        height: 420px;
    }
    &.Frame{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items:
    }
    &.Info{
        margin-top: 15px;
    }
`

const BookImage = styled.img`
    margin: 0;
    width: 220px;
    height: 326px;
    // object-fit: cover;
    box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.3);
`

const P = styled.p`
    margin: 0;
    &.title{
        font-family: 'Pretendard-SemiBold';
        font-size: 18px;
    }
    &.author{
        font-family: 'Pretendard-Regular';
        font-size: 14px;
        opacity: 0.4;
        margin-top: 10px;
    }
`

function Book({title, author, id, cover_image}) {
    const navigate = useNavigate();
    const onClickBook = () => {
        navigate(`/bookclick/${id}/`)
    }
    return (
        <Div className="Book" onClick={onClickBook}>
            <Div className="Frame">
                <BookImage src={`${process.env.REACT_APP_ADDRESS}/${cover_image}`} />
                <Div className="Info">
                    <P className="title">{title}</P>
                    <P className="author">저자 {author}</P>
                </Div>
            </Div>
        </Div>
    )
}

export default Book;