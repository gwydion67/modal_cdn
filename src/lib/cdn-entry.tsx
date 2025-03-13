import React from "react";
import ReactDOM from "react-dom/client";
import Modal_Container from "../components/ModalContainer";

// Auto-initialize if there's a container with the expected ID
document.addEventListener("DOMContentLoaded", () => {
  // Look for containers with data attributes
  const container = document.getElementById("__modal_component");

  const props: Record<string, string | null | undefined> = {
    buttonText: container?.getAttribute("data-button-text"),
    modalTitle: container?.getAttribute("data-modal-title"),
    modalContent: container?.getAttribute("data-modal-content"),
    apiKey: container?.getAttribute("data-api-key"),
    apiUrl: container?.getAttribute("data-api-url"),
    theme: container?.getAttribute("data-theme") || "light",
  };

  // Clean up props (remove null values)
  Object.keys(props).forEach((key) => {
    if (props[key] === null) delete props[key];
  });

  // Render the component
  const root = ReactDOM.createRoot(container as Element);
  root.render(React.createElement(Modal_Container, props));
});
