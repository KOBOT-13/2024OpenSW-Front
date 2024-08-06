import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";

const CommentContainer = styled.div`
    width: 100%;
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
    max-height: ${(props) => props.expanded ? `${props.scrollHeight}px` : '3.2em'};
    overflow: hidden;
    text-overflow: ellipsis;
    transition: max-height 0.3s ease;
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
    text-decoration: underline;
`;

function Comments({ comments }) {
    const commentRefs = useRef([]);
    const [expandedCommentId, setExpandedCommentId] = useState(null);
    const [scrollHeights, setScrollHeights] = useState({});
    const [showMore, setShowMore] = useState({});

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
            default:
                return '헨젤과 그레텔';
        }
    };

    useEffect(() => {
        commentRefs.current = commentRefs.current.slice(0, comments.length);
    }, [comments]);

    useEffect(() => {
        const newScrollHeights = {};
        const newShowMore = {};
        commentRefs.current.forEach((ref, index) => {
            if (ref) {
                const height = ref.scrollHeight;
                newScrollHeights[comments[index].id] = height;
                newShowMore[comments[index].id] = height > 51;
            }
        });
        setScrollHeights(newScrollHeights);
        setShowMore(newShowMore);
    }, [comments]);

    const handleShowMore = (id) => {
        setExpandedCommentId((prevId) => (prevId === id ? null : id));
    };

    return (
        <CommentContainer>
            <h1>내가 쓴 댓글</h1>
            <ChatList>
                {comments.map((comment, index) => (
                    <ChatListItem key={comment.id}>
                        <CommentTitle>책 제목: {getBookTitle(comment.book)}</CommentTitle>
                        <CommentContent
                            ref={(el) => (commentRefs.current[index] = el)}
                            expanded={expandedCommentId === comment.id}
                            scrollHeight={scrollHeights[comment.id] || 0}
                        >
                            내용: {comment.content}
                        </CommentContent>
                        <CommentDate>날짜: {format(new Date(comment.updated_at), 'yyyy-MM-dd hh:mm aa')}</CommentDate>
                        {showMore[comment.id] && (
                            <ShowMore onClick={() => handleShowMore(comment.id)}>
                                {expandedCommentId === comment.id ? '접기' : '더보기'}
                            </ShowMore>
                        )}
                    </ChatListItem>
                ))}
            </ChatList>
        </CommentContainer>
    );
}

export default Comments;
