import React from 'react';
import phoneImage from '../assets/phone.png';

export default function Phone() {
    const message = "Hello World! 3";

    return (
        <div className="phone">
            <img
                src={phoneImage}
                alt="Phone"
                width="190"
                height="410"
            />
            <span className="message">
                {message}
            </span>
        </div>)
}