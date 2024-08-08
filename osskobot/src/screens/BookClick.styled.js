import styled from "styled-components";

export const Div = styled.div`
    &.Detail{
        display: flex;
        justify-content: center;
    }
    &.Frame{
        width: 1160px;
        display: flex;
        justify-content: center;
        margin: 30px 140px 0 140px;
        padding: 57px 0 57px 100px;
        background-color: #fafafa;
        border-radius: 20px;
    }
    &.Right{
        width: 100%;
        height: 90%;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
    }
    &.Btns{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        gap:20px;
    }
`;

export const Image = styled.img`
    margin-right: 100px;
`;

export const P = styled.p`
    font-family: 'Pretendard-Regular';
    font-size: 16px;
    color: rgba(0,0,0,0.8);

    &.title{
        font-family: 'Pretendard-Bold';
        font-size: 24px;
        color: black;
    }
`;

export const Hr = styled.hr`
    width: 40px;
    margin: 0;
    border: 1px solid #007aff;
`;