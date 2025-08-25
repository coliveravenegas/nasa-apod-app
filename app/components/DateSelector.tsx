'use client';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, Button } from '@mui/material';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

interface DateSelectorProps {
  selectedDate: Dayjs;
  onDateChange: (date: Dayjs) => void;
  loading: boolean;
  onFetch: () => void;
}

export default function DateSelector({ selectedDate, onDateChange, loading, onFetch }: DateSelectorProps) {
  // NASA APOD started on June 16, 1995
  const minDate = dayjs('1995-06-16');
  // Cannot select future dates as APOD doesn't exist yet
  const maxDate = dayjs();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onFetch();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row'
          },
          gap: 2,
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={selectedDate}
            onChange={(newDate) => {
              if (newDate) {
                onDateChange(newDate);
              }
            }}
            disabled={loading}
            minDate={minDate}
            maxDate={maxDate}
            slotProps={{
              textField: {
                label: 'Selected Date',
                helperText: 'NASA APOD available from June 16, 1995 to today',
                inputProps: {
                  'data-testid': 'date-selector-input',
                },
              },
            }}
          />
        </LocalizationProvider>
        <Button type="submit" variant="contained" disabled={loading}>
          Fetch
        </Button>
      </Box>
    </form>
  );
}