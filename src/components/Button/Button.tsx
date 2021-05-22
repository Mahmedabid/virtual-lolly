import React from 'react';
import './Button.css';

interface Button {
    value?: string
    type?: "button" | "reset" | "submit"
    onClick?: () => void
    style?: {}
    className: string
}

const Button: React.FC<Button> = ({value, type, onClick, style, className}) => {

    const typeVal = type? type: "button";

    return (
        <button className={`SBbutton ${className}`} type={typeVal} onClick={onClick} style={{...style}}>
            {value}
        </button>
    )
}

export default Button
