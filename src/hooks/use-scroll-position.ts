import { useEffect, useState, useMemo } from "react";

export const useScrollPosition = (): number => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", updatePosition);

    updatePosition();

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  // Memoize the scroll position using useMemo
  const memoizedScrollPosition = useMemo(
    () => scrollPosition,
    [scrollPosition]
  );

  return memoizedScrollPosition;
};
