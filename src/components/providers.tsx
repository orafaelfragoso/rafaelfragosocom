"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

import { AudioContextProvider } from "@/components/audio-provider";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <AudioContextProvider>{children}</AudioContextProvider>
    </NextThemesProvider>
  );
}
