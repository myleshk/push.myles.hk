import React, { useMemo } from 'react';
import phoneImage from '../assets/phone.jpg';
import AnimatedSpan from './AnimatedSpan';
import { Message } from '../types';
import styled from 'styled-components';

const StyledContainer = styled.div`
margin-top: 40px;
position: relative;
`;

interface Props {
    notification: Message | null;
}

export default function Phone({ notification }: Props) {
    const compactMessage = useMemo(() => {
        if (!notification) return '欢迎回来！';
        const { heading, content } = notification;
        return `${heading}：${content}`
    }, [notification])
    return (
        <>
            <StyledContainer>
                <img
                    src={phoneImage}
                    alt="Phone"
                    width="190"
                    height="410"
                />
                <AnimatedSpan content={compactMessage} duration={8} />
            </StyledContainer>
        </>
    )
}