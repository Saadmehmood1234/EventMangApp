"use client";

import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from "next-themes";
import { ReactNode } from "react";

interface CustomThemeProviderProps extends Omit<ThemeProviderProps, 'children'> {
  children: ReactNode;
}

export function ThemeProvider({
  children,
  ...props
}: CustomThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
