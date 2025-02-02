import React from "react";

interface ModalProps {
  title?: string;
  message?: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, message, children, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          {title && <h2 className="modal-title">{title}</h2>}
          {message && <p className="modal-message">{message}</p>}
          {children}
          <button onClick={onClose} className="modal-close-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
