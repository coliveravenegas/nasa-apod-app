'use client';

import FavoriteIcon from '@mui/icons-material/Favorite';
import { Masonry } from '@mui/lab';
import Image from 'next/image';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  IconButton,
  Tooltip,
  Alert,
} from '@mui/material';
import { APODData } from '../types/apod';
import { FavoriteBorder } from '@mui/icons-material';
import { SPACE_BLUR_PLACEHOLDER } from '../utils/imageUtils';

interface APODsListProps {
  apods: APODData[];
  onAPODSelect: (apod: APODData) => void;
  onFavoriteToggle: (apod: APODData) => void;
  favorites: APODData[];
  loading: boolean;
  error: string | null;
}

function APODsList({
  apods,
  onAPODSelect,
  onFavoriteToggle,
  favorites,
  loading,
  error,
}: APODsListProps) {
  if (loading) {
    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(5, 1fr)',
          },
          gap: 2,
        }}
      >
        {[...Array(5)].map((_, index) => (
          <Card key={index}>
            <Skeleton variant="rectangular" height={150} />
            <CardContent>
              <Skeleton variant="text" height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" height={16} />
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (apods.length === 0) {
    return <Alert severity="info">No images found.</Alert>;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const isFavorite = (apod: APODData) => {
    return favorites.some((fav) => fav.date === apod.date);
  };

  const renderMedia = (item: APODData) => {
    if (item.media_type === 'video' || item.media_type === 'image') {
      return (
        <Image
          src={item.thumbnail_url || item.url}
          alt={item.title}
          width={600}
          height={400}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          placeholder="blur"
          blurDataURL={SPACE_BLUR_PLACEHOLDER}
        />
      );
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
        <Typography>Unsupported media type</Typography>
      </Box>
    );
  };

  return (
    <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
      {apods.map((item, i) => (
        <Card key={i} sx={{ position: 'relative' }}>
          <Box sx={{ cursor: 'pointer' }} onClick={() => onAPODSelect(item)}>
            {renderMedia(item)}
          </Box>

          {/* Desktop Overlay */}
          <Box
            className="overlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0,0,0,0.6)',
              color: '#fff',
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              p: 2,
              cursor: 'pointer',
              '&:hover': { opacity: 1 },
            }}
            onClick={() => onAPODSelect(item)}
          >
            <Tooltip title={isFavorite(item) ? 'Unlike' : 'Like'} arrow>
              <IconButton
                aria-label={
                  isFavorite(item)
                    ? 'Remove from favorites'
                    : 'Add to favorites'
                }
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 10,
                  color: '#fff',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onFavoriteToggle(item);
                }}
              >
                {isFavorite(item) ? (
                  <FavoriteIcon sx={{ color: '#f15151' }} />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
            </Tooltip>
            <Typography variant="subtitle2">{item.title}</Typography>
            <Typography variant="body2">{formatDate(item.date)}</Typography>
          </Box>

          {/* Mobile Subtitle */}
          <CardContent sx={{ display: { xs: 'block', md: 'none' } }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <Box>
                <Typography variant="subtitle2" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(item.date)}
                </Typography>
              </Box>
              <Tooltip title={isFavorite(item) ? 'Unlike' : 'Like'} arrow>
                <IconButton
                  aria-label={
                    isFavorite(item)
                      ? 'Remove from favorites'
                      : 'Add to favorites'
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    onFavoriteToggle(item);
                  }}
                >
                  {isFavorite(item) ? (
                    <FavoriteIcon sx={{ color: '#f15151' }} />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Masonry>
  );
}

export default APODsList;
