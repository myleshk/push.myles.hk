import React from "react"
import styled from "styled-components";
import { getAllMessages } from "../helpers/messageStore";
import dayjs from 'dayjs';

const StyledContainer = styled.div`
background-color: rgba(0,0,0,0.8);
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;

const StyledInner = styled.div`
display: flex;
flex-direction: column;
align-items: start;
overflow-y: scroll;
width: 100%;
padding-left: 30px;
padding-right: 30px;
padding-top: 47px;
padding-bottom: 34px;
`

const StyledContent = styled.p`
color: white;
`

const StyledMessageContainer = styled.div`
width: 100%;
`


interface MessageDetailProps {
  onClose: () => void;
}

function MessageDetail({ onClose }: MessageDetailProps) {
  const messages = getAllMessages();

  return (
    <StyledContainer onClick={onClose}>
      <StyledInner onClick={onClose}>
        {messages.map(({ id, heading, content, data: { timestamp } }, index) => (
          <StyledMessageContainer key={id}>
            {index > 0 && (<hr />)}
            <StyledContent>{dayjs(new Date(timestamp)).format('M-D H:mm')}</StyledContent>
            <StyledContent>{heading}</StyledContent>
            <StyledContent>{content}</StyledContent>
          </StyledMessageContainer>
        ))}
      </StyledInner>
    </StyledContainer>
  )
}

export default MessageDetail;