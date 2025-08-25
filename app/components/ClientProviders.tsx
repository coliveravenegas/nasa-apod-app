'use client';

import { ReactNode } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../../theme';
import ErrorBoundary from './ErrorBoundary';

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>{children}</ErrorBoundary>
    </ThemeProvider>
  );
}
