"use client";

import { useContext } from "react";

import { Icons } from "@/components/icons";
import { AudioContext } from "@/components/audio-provider";
import { Button } from "@/components/ui/button";

export function AudioToggle() {
  const { audioAllowed, toggleAudio } = useContext(AudioContext);

  return (
    <Button
      variant="ghost"
      className="w-9 px-0"
      onClick={() => toggleAudio(!audioAllowed)}
    >
      {!audioAllowed && <Icons.soundOff className="h-[1.2rem] w-[1.2rem]" />}
      {audioAllowed && <Icons.soundOn className="h-[1.2rem] w-[1.2rem]" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
