import App from "./App";
import { createRoot } from "react-dom/client";
import styleText from "./App.css?inline";

(function () {
  const mountWidget = () => {
    // Find the container element
    const container = document.getElementById("bytebellai");

    // Exit if container is not found
    if (!container) {
      console.error(
        'Shadow Widget: Target element with ID "bytebellai" not found.',
      );
      return;
    }

    // Get API key from data attribute
    const apiKey = container.getAttribute("data-api-key");

    const shadowRoot = container.attachShadow({ mode: "open" });

    // Create container for React
    const reactContainer = document.createElement("div");
    reactContainer.id = "bytebell-widget-root";

    // Append container to shadow root
    shadowRoot.appendChild(reactContainer);
    const style = document.createElement("style");
    style.textContent = styleText;
    shadowRoot.appendChild(style);

    // Initialize React and render the App
    const reactRoot = createRoot(reactContainer);
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
