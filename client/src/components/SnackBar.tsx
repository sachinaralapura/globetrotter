import React, { useState, useEffect } from 'react';
import { SnackbarProps } from '../types';

const Snackbar: React.FC<SnackbarProps> = ({
    message,
    severity,
    open,
    onClose,
    duration = 3000, // Default duration
}) => {
    const [isVisible, setIsVisible] = useState(open);

    useEffect(() => {
        setIsVisible(open);
    }, [open]);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose, duration]);

    if (!isVisible) {
        return null;
    }

    let backgroundColor = 'lightgray';
    let textColor = 'black';

    switch (severity) {
        case 'success':
            backgroundColor = 'lightgreen';
            textColor = 'darkgreen';
            break;
        case 'error':
            backgroundColor = 'lightcoral';
            textColor = 'darkred';
            break;
        case 'warning':
            backgroundColor = 'yellow';
            textColor = 'orange';
            break;
        case 'info':
            backgroundColor = 'lightblue';
            textColor = 'darkblue';
            break;
        default:
            break;
    }

    return (
        <div
            style={{
                backgroundColor,
                color: textColor,
                padding: '10px',
                position: 'fixed',
                bottom: '20px',
                left: '20px',
                borderRadius: '5px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minWidth: '300px',

            }}
        >
            <span>{message}</span>
            <button
                onClick={() => {
                    setIsVisible(false);
                    onClose();
                }}
                style={{ marginLeft: '10px', background: 'none', border: 'none', cursor: 'pointer', color: textColor }}
            >
                ✕
            </button>
        </div>
    );
};

export default Snackbar;