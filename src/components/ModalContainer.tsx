import React, { useState } from "react";
import Modal from "./Modal";

// Define the props interface for your component
export interface MyComponentProps {
  buttonText?: string;
  modalTitle?: string;
  modalContent?: string;
  // Environment variables that will be passed from the consumer
  apiKey?: string;
  apiUrl?: string;
  theme?: "light" | "dark";
  onClose?: () => void;
  onSubmit?: (data: any) => void;
}

const Modal_Container: React.FC<MyComponentProps> = ({
  buttonText = "Open Modal",
  modalTitle = "Modal Title",
  modalContent = "Modal Content",
  apiKey,
  apiUrl,
  theme = "light",
  onClose,
  onSubmit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (onClose) onClose();
  };

  const handleSubmit = (data: any) => {
    if (onSubmit) onSubmit(data);
    handleCloseModal();
  };

  return (
    <div className={`my-component ${theme}`}>
      <button className="my-component-button" onClick={handleOpenModal}>
        {buttonText}
      </button>
      {isModalOpen && (
        <Modal
          title={modalTitle}
          content={modalContent}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          apiKey={apiKey}
          apiUrl={apiUrl}
        />
      )}
    </div>
  );
};

export default Modal_Container;
