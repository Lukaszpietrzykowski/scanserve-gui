import React from 'react';
import './Popup.css';

function Popup({isOpen, onClose, children}) {
    return isOpen ? (
            <div className="reusable-popup-container">
                <div className="reusable-popup-background" onClick={onClose}>
                    <div className="reusable-popup-content">
                        {children}
                    </div>
                </div>
            </div>
        ) :
        null;
}

export default Popup;