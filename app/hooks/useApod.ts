import { useState, useEffect, useCallback, useMemo } from 'react';
import { APODData } from '../types/apod';
import dayjs, { Dayjs } from 'dayjs';
import * as nasaApi from '../services/nasaApi';

export const useApod = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [currentAPOD, setCurrentAPOD] = useState<APODData | null>(null);
  const [recentAPODs, setRecentAPODs] = useState<APODData[]>([]);
  const [favorites, setFavorites] = useState<APODData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [errorRecent, setErrorRecent] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);

  // Memoize favorites lookup for better performance
  const favoritesLookup = useMemo(() => {
    return new Set(favorites.map((fav) => fav.date));
  }, [favorites]);

  const handleFetchAPOD = useCallback(async (date?: Dayjs) => {
    try {
      setLoading(true);
      setError(null);
      const data = await nasaApi.fetchAPOD(date);
      setCurrentAPOD(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFetchRecentAPODs = useCallback(async () => {
    try {
      setLoadingRecent(true);
      setErrorRecent(null);
      const data = await nasaApi.fetchRecentAPODs();
      setRecentAPODs(data);
    } catch (err) {
      setErrorRecent(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoadingRecent(false);
    }
  }, []);

  const loadFavorites = useCallback(() => {
    try {
      const storedFavorites = localStorage.getItem('nasa-apod-favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (err) {
      console.error('Error loading favorites:', err);
    }
  }, []);

  const handleFavoriteToggle = (apod: APODData) => {
    try {
      const isCurrentlyFavorite = favoritesLookup.has(apod.date);
      const newFavorites = isCurrentlyFavorite
        ? favorites.filter((fav) => fav.date !== apod.date)
        : [...favorites, apod];

      setFavorites(newFavorites);
      try {
        localStorage.setItem(
          'nasa-apod-favorites',
          JSON.stringify(newFavorites),
        );
      } catch (err) {
        console.error('Error saving favorites:', err);
      }
    } catch (err) {
      console.error('Error updating favorites:', err);
    }
  };

  useEffect(() => {
    handleFetchAPOD();
    handleFetchRecentAPODs();
    loadFavorites();
  }, [handleFetchAPOD, handleFetchRecentAPODs, loadFavorites]);

  const handleDateChange = (date: Dayjs) => {
    setSelectedDate(date);
  };

  const handleFetch = () => {
    handleFetchAPOD(selectedDate);
  };

  const handleAPODSelect = (apod: APODData) => {
    setCurrentAPOD(apod);
    if (apod.date) {
      setSelectedDate(dayjs(`${apod.date}T12:00:00`));
    }
    setShowFavorites(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return {
    selectedDate,
    currentAPOD,
    recentAPODs,
    favorites,
    favoritesLookup,
    loading,
    error,
    // isError removed; use !!error in components if needed
    loadingRecent,
    errorRecent,
    showFavorites,
    handleDateChange,
    handleFetch,
    handleAPODSelect,
    handleFavoriteToggle,
    setShowFavorites,
  };
};
