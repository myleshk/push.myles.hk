import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components";
import { Notification } from "../types";

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
padding-left: 30px;
padding-right: 30px;
`

const StyledContent = styled.p`
color: white;
`

const StyledAnchor = styled.a`
color: white;
`


interface MessageDetailProps {
  notification: Notification;
  onClose: () => void;
}

function MessageDetail({ notification, onClose }: MessageDetailProps) {
  const { heading, content } = notification;

  return (
    <StyledContainer>
      <StyledInner>
        <StyledContent>{heading}</StyledContent>
        <StyledContent>{content}</StyledContent>
      </StyledInner>
      <StyledAnchor href="#" onClick={onClose}>关闭</StyledAnchor>
    </StyledContainer>
  )
}

export default MessageDetail;