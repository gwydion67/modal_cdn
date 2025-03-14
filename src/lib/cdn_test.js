import Modal_Container from "../components/ModalContainer";

document.addEventListener("DOMContentLoaded", () => {
  console.log("dom loaded");
  try {
    const container = document.getElementById("__modal_component");
    console.log("loaded", container);

    const props = {
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
    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(Modal_Container, props));
  } catch (e) {
    console.log("some error occured");
  }
});
