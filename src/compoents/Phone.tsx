import React from 'react';
import phoneImage from '../assets/phone.jpg';
import AnimatedSpan from './AnimatedSpan';

interface Props {
    message?: string
}

export default function Phone({ message }: Props) {

    return (
        <div className="phone">
            <img
                src={phoneImage}
                alt="Phone"
                width="190"
                height="410"
            />
            <AnimatedSpan content={message} duration={5} />
        </div>)
}