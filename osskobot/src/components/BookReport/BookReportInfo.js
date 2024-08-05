import styled from "styled-components";
import BookReportModal from "../Modal/BookReportModal";
import { useState } from "react";

const CardContainer = styled.div`
  width: 160px; /* Adjust the width as needed */
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-bottom: 8px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Content = styled.div`
  padding: 16px;
  background-color: #f9f9f9;
`;

const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1.2em;
`;

const Date = styled.p`
  margin: 0;
  color: #555;
  font-size: 0.9em;
`;

function BookReportInfo({ imageSrc, title, reviewDate, content, id, setReload }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <CardContainer onClick={() => setIsOpen(true)}>
                <Image src={imageSrc} alt="Book Cover" />
                <Content>
                    <Title>{title}</Title>
                    <Date>작성일: {reviewDate}</Date>
                </Content>
            </CardContainer>
            <BookReportModal isOpen={isOpen} onRequestClose={setIsOpen} content={content} id={id} setReload={setReload} />
        </div>

    );
}

export default BookReportInfo;