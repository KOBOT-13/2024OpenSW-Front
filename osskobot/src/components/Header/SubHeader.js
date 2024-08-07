import { useState } from "react";
import styled from "styled-components";

const Div = styled.div`
    &.BG{
        width: 1920px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #FAFAFA;
    }
    &.Menu{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 1440px;
    }
    &.Content{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const P = styled.p`
    margin: 0;
    font-family: 'Pretendard-Medium';
    font-size: 20px;
    color: ${({ index }) => (index ? 'black' : '#BBBBBB')};
`;

const Ul = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;

`;

const Li = styled.li`
    width: 480px;
    height: 80px;
    background-color: #FAFAFA;
    display: flex;
    align-items: center;
    &::before {
        content: '|';
        font-size: 25px;
        padding-right: 30px;
        color: #D8D8D8;
    }

    &:first-child::before {
        content: none;
    }
`;

function SubHeader() {
    const [index, setIndex] = useState(0);

    const handleMenuClick = (index) => {
        setIndex(index);
    };

    return (
        <header>
            <Div className="BG">
                <Div className="Menu">
                    <Ul>
                        <Li onClick={() => handleMenuClick(0)} >
                            <Div className="Content">
                                <P index={index === 0}>둘러보기</P>
                            </Div>
                        </Li>
                        <Li onClick={() => handleMenuClick(1)}>
                            <Div className="Content">
                                <P index={index === 1}>내 책장</P>
                            </Div>
                        </Li>
                        <Li onClick={() => handleMenuClick(2)}>
                            <Div className="Content">
                                <P index={index === 2}>추천 도서</P>
                            </Div>
                        </Li>
                    </Ul>
                </Div>
            </Div>
        </header>
    )
}

export default SubHeader;