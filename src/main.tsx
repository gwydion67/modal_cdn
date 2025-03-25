import App from "./App";
import { createRoot } from "react-dom/client";
import styleText from "./App.css?inline";
//
(function () {
  const mountWidget = () => {
    // Find the container element
    const container = document.createElement("div");

    // Exit if container is not found
    // Create container for React
    const domElement = document.getElementById("__modal_component");
    if (!domElement) {
      console.error(
        'Shadow Widget: Target element with ID "__modal_component" not found.',
      );
      return;
    }

    // Get API key from data attribute
    const apiKey = domElement.getAttribute("data-api-key");

    // Append container to shadow root
    const shadowRoot = container.attachShadow({ mode: "open" });
    domElement.appendChild(container);

    const defStyle = document.createElement("style");
    defStyle.textContent = `
      :host {
        all: initial;
        display: contents;
      };
      :host * {
        all: initial;
      }
    `;
    shadowRoot.appendChild(defStyle);

    // Initialize React and render the App
    const style = document.createElement("style");
    style.textContent = styleText;
    shadowRoot.appendChild(style);

    const reactRoot = createRoot(shadowRoot);
    reactRoot.render(<App apiKey={apiKey} />);
  };

  // Determine when to mount the widget based on document state
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(mountWidget, 1000);
    });
  } else {
    setTimeout(mountWidget, 1000);
  }
})();
