'use client';

import { Box, Typography } from '@mui/material';
import { APODData } from '../types/apod';

export const VideoPlayer = ({ apod }: { apod: APODData }) => {
  const isYouTube = apod.url.includes('youtube.com');
  const isMp4 = apod.url.endsWith('.mp4');

  const renderPlayer = () => {
    if (isYouTube) {
      return (
        <iframe
          src={apod.url}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      );
    }

    if (isMp4) {
      return (
        <video
          controls
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <source src={apod.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }

    return (
      <Box
        sx={{
          p: 2,
          textAlign: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography variant="body1" color="text.secondary">
          Unsupported video format.
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        position: 'relative',
        paddingTop: '56.25%', // 16:9 aspect ratio
        height: 0,
        overflow: 'hidden',
        bgcolor: 'black',
      }}
    >
      {renderPlayer()}
    </Box>
  );
};
