'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  Alert,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogContent,
  CircularProgress,
  Fab,
} from '@mui/material';
import { Favorite as FavoriteIcon, FavoriteBorder } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import HdIcon from '@mui/icons-material/Hd';
import { APODData } from '../types/apod';
import { VideoPlayer } from './VideoPlayer';
import { SPACE_BLUR_PLACEHOLDER } from '../utils/imageUtils';

interface APODDisplayProps {
  apod: APODData | null;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onFavoriteToggle: (apod: APODData) => void;
  isFavorite: boolean;
}

function APODDisplay({
  apod,
  loading,
  error,
  onRetry,
  onFavoriteToggle,
  isFavorite,
}: APODDisplayProps) {
  const [isHdDialogOpen, setIsHdDialogOpen] = useState(false);
  const [isHdImageLoading, setIsHdImageLoading] = useState(false);

  const handleFavoriteToggle = () => {
    if (apod) {
      onFavoriteToggle(apod);
    }
  };

  const handleOpenHdDialog = () => {
    setIsHdDialogOpen(true);
    setIsHdImageLoading(true);
  };

  const handleCloseHdDialog = () => {
    setIsHdDialogOpen(false);
  };

  if (loading) {
    return (
      <Card sx={{ maxWidth: 800, margin: '0 auto' }}>
        <Skeleton variant="rectangular" height={400} />
        <CardContent>
          <Skeleton variant="text" height={40} width="80%" sx={{ mb: 1 }} />
          <Skeleton variant="text" height={20} width="40%" sx={{ mb: 2 }} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} width="90%" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={onRetry}>
            Retry
          </Button>
        }
        sx={{ mb: 2 }}
      >
        {error}
      </Alert>
    );
  }

  if (!apod) {
    return (
      <Alert severity="info">
        No APOD data available for the selected date.
      </Alert>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderMedia = () => {
    const mediaType = apod.media_type;

    if (mediaType === 'image') {
      return (
        <>
          <Image
            src={apod.url}
            alt={apod.title}
            width={600}
            height={400}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            placeholder="blur"
            blurDataURL={SPACE_BLUR_PLACEHOLDER}
            priority
          />
          {apod.hdurl && (
            <Fab
              size="small"
              color="primary"
              aria-label="view HD image"
              onClick={handleOpenHdDialog}
              sx={{ position: 'absolute', top: 16, left: 16 }}
            >
              <HdIcon />
            </Fab>
          )}
        </>
      );
    }

    if (mediaType === 'video') {
      return <VideoPlayer apod={apod} />;
    }

    return (
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          height: 400,
        }}
      >
        <Typography variant="body1" color="text.secondary">
          Unsupported media type.
        </Typography>
      </Box>
    );
  };

  return (
    <Card sx={{ maxWidth: 800, margin: '0 auto' }} id="APODDISPLAY">
      {/* Media */}
      <Box sx={{ position: 'relative' }}>{renderMedia()}</Box>

      {/* Content */}
      <CardContent sx={{ position: 'relative' }}>
        <Tooltip title={isFavorite ? 'Unlike' : 'Like'} arrow>
          <IconButton
            aria-label={
              isFavorite ? 'Remove from favorites' : 'Add to favorites'
            }
            sx={{
              position: 'absolute',
              top: 8,
              right: 10,
            }}
            onClick={handleFavoriteToggle}
          >
            {isFavorite ? (
              <FavoriteIcon sx={{ color: '#f15151' }} />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>
        </Tooltip>
        <Typography variant="h6" component="h2">
          {apod.title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {formatDate(apod.date)}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {apod.explanation}
        </Typography>
      </CardContent>

      {apod.hdurl && (
        <Dialog
          open={isHdDialogOpen}
          onClose={handleCloseHdDialog}
          maxWidth="xl"
          fullWidth
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseHdDialog}
            autoFocus
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: (theme) => theme.palette.grey[500],
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)',
              },
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent sx={{ p: 0, minHeight: '200px' }}>
            {isHdImageLoading && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  backgroundColor: '#000',
                  alignItems: 'center',
                  height: '100%',
                  position: 'absolute',
                  width: '100%',
                }}
              >
                <CircularProgress />
                <Typography
                  variant="subtitle2"
                  textAlign="center"
                  mt={1}
                  color="white"
                >
                  Loading HD image...
                </Typography>
              </Box>
            )}
            {/* We are using here a img tag to handle the image load manually, this doesn't affect the page performance */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={apod.hdurl}
              alt={`HD version of ${apod.title}`}
              style={{
                width: '100%',
                height: 'auto',
                display: isHdImageLoading ? 'none' : 'block',
              }}
              onLoad={() => setIsHdImageLoading(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}

export default APODDisplay;
