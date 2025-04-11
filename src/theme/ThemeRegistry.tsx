// src/theme/ThemeRegistry.tsx
'use client';

import { ReactNode } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

type Props = {
  children: ReactNode;
};

export default function ThemeRegistry({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
