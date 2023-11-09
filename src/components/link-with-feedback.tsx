"use client";

import React, { useContext } from "react";
import Link, { LinkProps } from "next/link";
import { useAudio } from "@/hooks/use-audio";
import { AudioContext } from "@/components/audio-provider";

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode;
  target?: string;
  rel?: string;
  title?: string;
  className?: string;
}

export const LinkWithFeedback = React.forwardRef<
  HTMLAnchorElement,
  CustomLinkProps
>(function CustomLink(props, ref) {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.BASE_URL;
  const { audioAllowed } = useContext(AudioContext);
  const { play, volume } = useAudio(`${baseUrl}/pop.wav`);

  const handleMouseEnter = () => {
    if (audioAllowed) {
      volume(0.5);
      play();
    }
  };

  return <Link ref={ref as any} onMouseEnter={handleMouseEnter} {...props} />;
});
