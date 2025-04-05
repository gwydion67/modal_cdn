import { useEffect, useState } from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import Frame from "react-frame-component";
import "./App.css";

const TailwindLoader = ({ children }: { children: React.ReactNode }) => {
  const [twLoaded, setTwLoaded] = useState(false);
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
      tw.setAttribute(
        "src",
        "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
      );

      const styles = iframeDoc.createElement("style");
      styles.textContent = `
           body {
            height: 100vh;
            width: 100vw;
            margin: 0;
            padding: 0;
            overflow: hidden;
          }

          #root {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            overflow: hidden;
          }`;
      iframeDoc.head.appendChild(styles);
      tw.onload = () => {
        console.log("load");
        setTwLoaded(true);
        console.log(tw);
      };
      iframeDoc.head.appendChild(tw);
    }

    etw();
  }, [children]);

  return <>{twLoaded ? children : null}</>;
};

(function () {
  const mountWidget = () => {
    const domElement = document.getElementById("__modal_component") as HTMLElement & { __isMounted?: boolean };
    if (!domElement) {
      console.error(
        'Shadow Widget: Target element with ID "__modal_component" not found.',
      );
      return;
    }

    // Prevent duplicate mounts
    if (domElement.__isMounted) return;
    domElement.__isMounted = true;

    domElement.style.height = "100%";
    domElement.style.width = "100%";
    const apiKey = domElement.getAttribute("data-api-key");

    createRoot(domElement).render(
      <Frame id="__modal_iframe" style={{ height: "100%", width: "100%" }}>
        <TailwindLoader>
          <App apiKey={apiKey} />
        </TailwindLoader>
      </Frame>,
    );
  };

  const observeDomChanges = () => {
    const observer = new MutationObserver(() => {
      const domElement = document.getElementById("__modal_component") as HTMLElement & { __isMounted?: boolean };
      if (domElement && !domElement.__isMounted) {
        setTimeout(mountWidget, 0);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(mountWidget, 1000);
      observeDomChanges();
    });
  } else {
    setTimeout(mountWidget, 1000);
    observeDomChanges();
  }
})();
