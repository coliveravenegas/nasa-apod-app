'use client';
import { Box, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import APODsList from './APODsList';
import { APODData } from '../types/apod';

interface FavoritesViewProps {
  favorites: APODData[];
  onAPODSelect: (apod: APODData) => void;
  onFavoriteToggle: (apod: APODData) => void;
  onBack: () => void;
}

function FavoritesView({
  favorites,
  onAPODSelect,
  onFavoriteToggle,
  onBack,
}: FavoritesViewProps) {
  // Empty view
  if (favorites.length === 0) {
    return (
      <Box
        sx={{
          py: 24,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: 'center', py: 4 }}
        >
          No favorites yet. Start exploring APODs and click the heart icon to
          add them to your favorites!
        </Typography>
        <Button
          variant="outlined"
          onClick={onBack}
          aria-label="Back to main view"
        >
          Explore photos
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        variant="text"
        onClick={onBack}
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Back
      </Button>
      <APODsList
        apods={favorites}
        onAPODSelect={onAPODSelect}
        onFavoriteToggle={onFavoriteToggle}
        favorites={favorites}
        loading={false}
        error={null}
      />
    </Box>
  );
}

export default FavoritesView;
