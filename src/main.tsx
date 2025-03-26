import { useEffect } from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import Frame from "react-frame-component";
//
const TailwindLoader = ({ children }: { children: React.ReactNode }) => {
  let iframe = document.getElementById("__modal_iframe") as HTMLIFrameElement;
  if (!iframe || !iframe.contentWindow) {
    console.error("ERROR: there was some issue in loading component");
    return <></>;
  }
  useEffect(() => {
    function etw() {
      console.log("loading tailwind");
      let iframeDoc = iframe.contentDocument || iframe.contentWindow?.document!;
      let tw = iframeDoc.createElement("script");
      tw.setAttribute("src", "https://cdn.tailwindcss.com");
      iframeDoc.head.appendChild(tw);
    }

    etw();
  }, [children]);

  return <>{children}</>;
};
(function () {
  const mountWidget = () => {
    const domElement = document.getElementById("__modal_component");
    if (!domElement) {
      console.error(
        'Shadow Widget: Target element with ID "__modal_component" not found.',
      );
      return;
    }

    const apiKey = domElement.getAttribute("data-api-key");

    createRoot(domElement).render(
      <Frame id="__modal_iframe">
        <TailwindLoader>
          <App apiKey={apiKey} />
        </TailwindLoader>
      </Frame>,
    );
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

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.tsx";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <App apiKey="dummyKey" />
//   </StrictMode>,
// );
//
// <script>
//   function etw() {
//     var iframe = document.getElementById("__modal_iframe");
//     var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
//     var tw = iframeDoc.createElement("script");
//     tw.setAttribute("src", "https://cdn.tailwindcss.com");
//     tw.onload = function () {
//       iframeDoc.body.innerHTML = iframeDoc.body.innerHTML; //re render
//     };
//     iframeDoc.head.appendChild(tw);
//   }
//   window.addEventListener("DOMContentLoaded", function () {
//     iframe.contentWindow.addEventListener("DOMContentLoaded", etw);
//   });
// </script>
