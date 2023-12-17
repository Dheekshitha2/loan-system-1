import React from "react";
import "../styles/Modal.css";

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                {children}
                <button className="close-modal" onClick={onClose}>X</button>
            </div>
        </div>
    );
}

export default Modal;
