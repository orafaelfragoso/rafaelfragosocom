import { useCallback, useEffect, useMemo } from "react";

export interface AudioState {
  volume: number;
  muted: boolean;
  paused: boolean;
  src?: string;
}

const createAudio = (path: string) => {
  if (typeof Audio !== "undefined") {
    return new Audio(path);
  } else {
    return {
      play: () => {},
      pause: () => {},
      volume: 1,
      muted: false,
      paused: true,
      src: path,
    };
  }
};

export const useAudio = (path: string) => {
  const audioRef = useMemo(() => createAudio(path), [path]);

  const play = useCallback(() => {
    if (audioRef.play) {
      audioRef.play();
    }
  }, [audioRef]);

  const pause = useCallback(() => {
    if (audioRef.pause) {
      audioRef.pause();
    }
  }, [audioRef]);

  const volume = useCallback(
    (vol: number) => {
      if (audioRef.volume !== undefined) {
        audioRef.volume = vol;
      }
    },
    [audioRef]
  );

  const mute = useCallback(() => {
    if (audioRef.muted !== undefined) {
      audioRef.muted = true;
    }
  }, [audioRef]);

  const unmute = useCallback(() => {
    if (audioRef.muted !== undefined) {
      audioRef.muted = false;
    }
  }, [audioRef]);

  const state = useCallback((): AudioState => {
    return {
      volume: audioRef.volume || 1,
      muted: audioRef.muted || false,
      paused: audioRef.paused || true,
      src: audioRef.src,
    };
  }, [audioRef]);

  useEffect(() => {
    let isMounted = true;

    const cleanup = () => {
      if (isMounted) {
        if (audioRef.src !== undefined) {
          audioRef.src = "";
        }

        audioRef.pause();
        audioRef.src = "";
      }
    };

    return () => {
      isMounted = false;
      cleanup();
    };
  }, [audioRef]);

  return { play, pause, volume, mute, unmute, state };
};
