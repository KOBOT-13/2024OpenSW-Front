import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

const CommentContainer = styled.div`
    width: 200%;
    z-index: -1000;
`;

const ChatList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const ChatListItem = styled.li`
    background-color: white;
    padding: 10px;
    margin: 10px 0;
    cursor: pointer;
    overflow: hidden;
    position: relative;

    &:hover {
        background-color: #e0e0e0;
    }
`;

const CommentTitle = styled.p`
    font-weight: bold;
    margin-bottom: 5px;
`;

const CommentContent = styled.p`
    margin-bottom: 5px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const CommentDate = styled.p`
    font-size: 0.9em;
    color: gray;
`;

const ShowMore = styled.span`
    display: inline-block;
    margin-top: 5px;
    color: blue;
    cursor: pointer;
`;

function MyComments({ comments }) {

    const getBookTitle = (bookId) => {
        switch (bookId) {
            case 1:
                return '아기 돼지 삼형제';
            case 2:
                return '백설공주';
            case 3:
                return '피터팬';
            case 4:
                return '흥부와 놀부';
            case 5:
                return '헨젤과 그레텔';
            default:
                return '알 수 없는 책';
        }
    };

    const handleShowMore = (e) => {
        console.log('더보기 버튼 클릭됨');
        const parent = e.target.closest('li');
        if (parent) {
            const content = parent.querySelector('.comment-content');
            if (content) {
                console.log('댓글 내용 엘리먼트 찾음');
                content.style.webkitLineClamp = 'unset';
                e.target.style.display = 'none';
            } else {
                console.log('댓글 내용 엘리먼트 없음');
            }
        } else {
            console.log('부모 엘리먼트 없음');
        }
    };

    const shouldShowMore = (content) => content.length > 100;

    return (
        <CommentContainer>
            <h1>내가 쓴 댓글</h1>
            <ChatList>
                {comments.map(comment => (
                    <ChatListItem key={comment.id}>
                        <CommentTitle>책 제목: {getBookTitle(comment.book)}</CommentTitle>
                        <CommentContent className="comment-content">내용: {comment.content}</CommentContent>
                        <CommentDate>날짜: {format(new Date(comment.updated_at), 'yyyy-MM-dd hh:mm aa')}</CommentDate>
                        {shouldShowMore(comment.content) && <ShowMore onClick={handleShowMore}>더보기</ShowMore>}
                    </ChatListItem>
                ))}
            </ChatList>
        </CommentContainer>
    );
}

export default MyComments;
