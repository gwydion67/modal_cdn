import React from "react";
import ReactDOM from "react-dom/client";
import Modal_Container from "../components/ModalContainer";

// Extend the Window interface to include renderMyComponent
declare global {
  interface Window {
    renderMyComponent: (
      containerId?: string,
      props?: Record<string, any>,
    ) => void;
  }
}

// This function will be available globally
window.renderMyComponent = (
  containerId: string = "__modal_component",
  props: Record<string, any> = {},
) => {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with id "${containerId}" not found`);
    return;
  }

  const root = ReactDOM.createRoot(container);
  root.render(React.createElement(Modal_Container, props));
};

// Auto-initialize if there's a container with the expected ID
document.addEventListener("DOMContentLoaded", () => {
  // Look for containers with data attributes
  const containers = document.querySelectorAll("[data-my-component]");

  containers.forEach((container) => {
    // Get props from data attributes
    const props: Record<string, string | null> = {
      buttonText: container.getAttribute("data-button-text"),
      modalTitle: container.getAttribute("data-modal-title"),
      modalContent: container.getAttribute("data-modal-content"),
      apiKey: container.getAttribute("data-api-key"),
      apiUrl: container.getAttribute("data-api-url"),
      theme: container.getAttribute("data-theme") || "light",
    };

    // Clean up props (remove null values)
    Object.keys(props).forEach((key) => {
      if (props[key] === null) delete props[key];
    });

    // Render the component
    const root = ReactDOM.createRoot(container as Element);
    root.render(React.createElement(Modal_Container, props));
  });
});
