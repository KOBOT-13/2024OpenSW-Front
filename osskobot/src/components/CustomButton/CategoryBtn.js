import styled from "styled-components";

const Button = styled.button`
    font-family: ${(index) => (index ? 'Pretendard-Bold':'Pretendard-Medium')};
    font-size: 16px;
    color: ${({index}) => (index ? 'white' : '#38383C')};
    background-color: ${({index}) => (index ? '#38383C' : 'white')};
    padding: 10px 20px 10px 20px;
    border-radius: 20px;
    border-color: rgba(0, 0, 0, 0.05);
    margin-top: 10px;
    margin-right: 10px;
`;

function CategoryBtn({index, content, onClick}){
    return(
        <Button onClick={onClick} index={index}>{content}</Button>
    )
}

export default CategoryBtn;