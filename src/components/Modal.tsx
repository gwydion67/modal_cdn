import React from "react";

interface ModalProps {
  title: string;
  content: string;
  apiKey?: string;
  apiUrl?: string;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  content,
  apiKey,
  apiUrl,
  onClose,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Example: You can process data here using apiKey and apiUrl
    console.log("Using API Key:", apiKey);
    console.log("API URL:", apiUrl);

    // Example data to submit
    const data = {
      timestamp: new Date().toISOString(),
      // Additional data as needed
    };

    onSubmit(data);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>{content}</p>
          {/* You can add more content or form elements here */}
        </div>
        <div className="modal-footer">
          <button className="modal-cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
