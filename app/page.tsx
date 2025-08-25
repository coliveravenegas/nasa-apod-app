'use client';

import { Container, Box, Typography } from '@mui/material';
import APODDisplay from './components/APODDisplay';
import DateSelector from './components/DateSelector';
import APODsList from './components/APODsList';
import Navbar from './components/Navbar';
import FavoritesView from './components/FavoritesView';
import { useApod } from './hooks/useApod';

export default function Home() {
  const {
    selectedDate,
    currentAPOD,
    recentAPODs,
    favorites,
    favoritesLookup,
    loading,
    error,
    loadingRecent,
    errorRecent,
    showFavorites,
    handleDateChange,
    handleFetch,
    handleAPODSelect,
    handleFavoriteToggle,
    setShowFavorites,
  } = useApod();

  return (
    <>
      <Navbar onFavoritesClick={() => setShowFavorites(!showFavorites)} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {showFavorites ? (
          <FavoritesView
            favorites={favorites}
            onAPODSelect={handleAPODSelect}
            onFavoriteToggle={handleFavoriteToggle}
            onBack={() => setShowFavorites(false)}
          />
        ) : (
          <Box>
            <DateSelector
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
              loading={loading}
              onFetch={handleFetch}
            />

            <APODDisplay
              apod={currentAPOD}
              loading={loading}
              error={error}
              onRetry={handleFetch}
              onFavoriteToggle={handleFavoriteToggle}
              isFavorite={
                currentAPOD ? favoritesLookup.has(currentAPOD.date) : false
              }
            />

            <Box component="section" mt={4}>
              <Typography variant="h6" gutterBottom mb={1}>
                Recent Days
              </Typography>
              <APODsList
                apods={recentAPODs}
                onAPODSelect={handleAPODSelect}
                onFavoriteToggle={handleFavoriteToggle}
                favorites={favorites}
                loading={loadingRecent}
                error={errorRecent}
              />
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
}
