'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            p: 3,
            textAlign: 'center',
          }}
        >
          <Alert severity="error" sx={{ mb: 3, maxWidth: '600px' }}>
            <Typography variant="h6" gutterBottom>
              Something went wrong
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              An unexpected error occurred while loading this content.
            </Typography>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Typography
                variant="body2"
                component="pre"
                sx={{
                  mt: 2,
                  p: 2,
                  backgroundColor: 'grey.100',
                  borderRadius: 1,
                  fontSize: '0.75rem',
                  overflow: 'auto',
                  textAlign: 'left',
                }}
              >
                {this.state.error.message}
                {'\n'}
                {this.state.error.stack}
              </Typography>
            )}
          </Alert>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={this.handleRetry}
          >
            Try Again
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
