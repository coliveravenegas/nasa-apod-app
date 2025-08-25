import { APODData } from '../types/apod';
import dayjs, { Dayjs } from 'dayjs';

const API_BASE_URL = '/api/apod';

export const fetchAPOD = async (date?: Dayjs): Promise<APODData> => {
  const dateParam = date ? `?date=${date.format('YYYY-MM-DD')}` : '';
  const response = await fetch(`${API_BASE_URL}${dateParam}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch APOD data');
  }

  return response.json();
};

export const fetchRecentAPODs = async (): Promise<APODData[]> => {
  const endDate = dayjs();
  const startDate = dayjs().subtract(5, 'day');

  const startDateStr = startDate.format('YYYY-MM-DD');
  const endDateStr = endDate.format('YYYY-MM-DD');

  const response = await fetch(
    `${API_BASE_URL}?start_date=${startDateStr}&end_date=${endDateStr}`
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to fetch recent APODs');
  }

  const data = await response.json();
  const apodArray = (Array.isArray(data) ? data : [data]).sort((a, b) => b.date.localeCompare(a.date));

  const todayStr = dayjs().format('YYYY-MM-DD');
  const filteredAPODs = apodArray[0].date === todayStr ? apodArray.slice(1, 6) : apodArray.slice(0, 5);

  return filteredAPODs;
};