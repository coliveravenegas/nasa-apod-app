import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import DateSelector from '../DateSelector';

describe('DateSelector', () => {
  const mockProps = {
    selectedDate: dayjs('2024-01-15'),
    onDateChange: jest.fn(),
    loading: false,
    onFetch: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders date picker and fetch button', () => {
    render(<DateSelector {...mockProps} />);

    expect(screen.getByTestId('date-selector-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /fetch/i })).toBeInTheDocument();
  });

  it('displays helper text about NASA APOD availability', () => {
    render(<DateSelector {...mockProps} />);

    expect(
      screen.getByText(/nasa apod available from june 16, 1995 to today/i),
    ).toBeInTheDocument();
  });

  it('calls onFetch when fetch button is clicked', async () => {
    const user = userEvent.setup();
    render(<DateSelector {...mockProps} />);

    const fetchButton = screen.getByRole('button', { name: /fetch/i });
    await user.click(fetchButton);

    expect(mockProps.onFetch).toHaveBeenCalledTimes(1);
  });

  it('calls onFetch when form is submitted with Enter key', async () => {
    const user = userEvent.setup();
    render(<DateSelector {...mockProps} />);

    const input = screen.getByTestId('date-selector-input');
    await user.click(input);
    await user.keyboard('{Enter}');

    expect(mockProps.onFetch).toHaveBeenCalledTimes(1);
  });
});
