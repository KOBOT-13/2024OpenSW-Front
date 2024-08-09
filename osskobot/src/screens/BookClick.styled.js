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
    &.Info{
        margin-top: 57px;
    }
    &.Btns{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        gap:20px;
    }
    &.Bottom{
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    &.Btns-Bottom{
        width: 1160px;
        display: flex;
    }
    &.Content-Bottom{
        width: 1160px;
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }
    &.Book-Intro{
        font-family: 'Pretendard-Regular';
        font-size: 16px;
        line-height: 30px;
    }
    &.Char-Intro{
        display: flex;
        justify-content: space-evenly;
    }
    &.Comment-Bottom{
        width: 100%;
    }
    &.Comment-Board{
        display: flex;
        flex-direction: column;
        height: 200px;
        border: 1px solid rgba(0,0,0,0.15);
        border-radius: 10px;
        box-sizing: border-box;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &.Comment-Btn{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;

export const Image = styled.img`
    margin-right: 100px;
    margin: 57px 100px 57px 80px;
    box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.3);
`;

export const P = styled.p`
    font-family: 'Pretendard-Regular';
    font-size: 16px;
    color: rgba(0,0,0,0.8);

    &.title{
        font-family: 'Pretendard-Bold';
        font-size: 24px;
        color: black;
        margin-top: 0;
    }
    &.comment-size{
        margin: 0;
        margin-left: 10px;
        font-size: 11px;
        align-self: flex-end;
    }
`;

export const Hr = styled.hr`
    width: 40px;
    margin: 0;
    border: 1px solid #007aff;
`;

export const TextArea = styled.textarea`
    width: 100%;
    height: 100%;
    border:0;
    padding: 10px;
    resize: none;
    overflow: auto;
    box-sizing: border-box;
    &:focus{
        outline: 0;
    }
`;

export const Button = styled.button`
    font-family: 'Pretendard-Bold';
    font-size: 14px;
    background: none;
    width: 97px;
    height: 40px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    margin-left: 10px;
    cursor: pointer;
`;