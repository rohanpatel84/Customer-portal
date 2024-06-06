import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  action: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, action }) => {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h2>{action === 'closed' ? 'Close Ticket' : 'Re-open Ticket'}</h2>
            <p>Please provide a reason:</p>
            <input type="text" />
            <button onClick={onSubmit}>Submit</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
