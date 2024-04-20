import React from 'react';
import './Popup.css'; // You may need to create this CSS file for styling

function Popup({isOpen, onClose, mode, children}) {
    if (!isOpen) {
        return null;
    }
    return (
        <div className="popup-overlay" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                {mode === 'add' && <h2>Add New Item</h2>}
                {mode === 'edit' && <h2>Edit Item</h2>}
                {children}
            </div>
        </div>
    );
}

export default Popup;