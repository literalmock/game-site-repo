import { useEffect, useState } from "react";

const MIN_LOADER_MS = 260;

const useAuthPageReady = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let frameId = 0;
    let timeoutId = 0;

    const finishLoading = () => {
      frameId = window.requestAnimationFrame(() => {
        timeoutId = window.setTimeout(() => {
          setIsReady(true);
        }, MIN_LOADER_MS);
      });
    };

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading, { once: true });
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      window.removeEventListener("load", finishLoading);
    };
  }, []);

  return isReady;
};

export default useAuthPageReady;
