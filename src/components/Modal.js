import React from "react";
import "../styles/Modal.css";
import { useRef, useEffect } from "react";

function Modal({ isOpen, onClose, children }) {
    const modalRef = useRef();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 27) { // Escape key
                onClose();
            }
        };

        if (isOpen) {
            // Set focus to the modal when it opens
            modalRef.current?.focus();
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

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
