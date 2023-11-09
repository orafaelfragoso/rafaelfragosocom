import React, { createContext, ReactNode, useState } from "react";

const AUDIO_ALLOWED = true;

export interface AudioContextProps {
  audioAllowed: boolean;
  toggleAudio: (state: boolean) => void;
}

export const AudioContext = createContext<AudioContextProps>({
  audioAllowed: AUDIO_ALLOWED,
  toggleAudio: () => {},
});

export interface AudioContextProviderProps {
  children: ReactNode;
}

export const AudioContextProvider: React.FC<AudioContextProviderProps> = ({
  children,
}) => {
  const [audioAllowed, setAudioPermission] = useState<boolean>(AUDIO_ALLOWED);

  const toggleAudio = (state: boolean) => setAudioPermission(state);
  const value = { audioAllowed, toggleAudio };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};
