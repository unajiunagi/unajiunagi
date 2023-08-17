import { useEffect, useState } from "react";

export const useWindowSize = (): number[] => {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    const updateSize = (): void => {
      setSize([window.innerHeight, window.innerWidth]);
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};
