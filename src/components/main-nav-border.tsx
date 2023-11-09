"use client";

import { useMemo } from "react";
import { useScrollPosition } from "@/hooks/use-scroll-position";

export function MainNavBorder() {
  const scrollPosition = useScrollPosition();
  const classnames = useMemo(() => {
    return scrollPosition > 0
      ? "absolute bottom-[-1px] left-0 w-full h-[1px] border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      : "hidden";
  }, [scrollPosition]);

  return <div className={classnames} />;
}
