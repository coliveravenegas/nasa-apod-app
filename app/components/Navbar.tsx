'use client';

import { AppBar, Toolbar, Typography, Button } from '@mui/material';

interface NavbarProps {
  onFavoritesClick: () => void;
}

export default function Navbar({ onFavoritesClick }: NavbarProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
          NASA APOD App
        </Typography>
        <Button variant="text" color="inherit" onClick={onFavoritesClick}>
          Favorites
        </Button>
      </Toolbar>
    </AppBar>
  );
}
