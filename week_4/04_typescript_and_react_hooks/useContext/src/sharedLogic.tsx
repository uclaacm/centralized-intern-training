import { useState, useEffect } from "react";

export function useWindowDimensions() {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());
  const [windowHeight, setWindowHeight] = useState(getWindowHeight());

  function getWindowWidth() {
    const { innerWidth: width } = window;
    return width;
  }

  function getWindowHeight() {
    const { innerHeight: height } = window;
    return height;
  }

  useEffect(() => {
    //function that updates our state variables for height and width
    function handleResize() {
      setWindowWidth(getWindowWidth());
      setWindowHeight(getWindowHeight());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return [windowWidth, windowHeight];
}
