import { NextResponse } from 'next/server';

const NASA_API_KEY = process.env.NASA_API_KEY;
const BASE_URL = 'https://api.nasa.gov/planetary/apod';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const startDate = searchParams.get('start_date');
  const endDate = searchParams.get('end_date');

  try {
    let apiUrl = `${BASE_URL}?api_key=${NASA_API_KEY}`;

    if (date) {
      apiUrl += `&date=${date}`;
    } else if (startDate && endDate) {
      apiUrl += `&start_date=${startDate}&end_date=${endDate}`;
    }

    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.msg || 'Failed to fetch data from NASA API' },
        { status: response.status },
      );
    }

    const data = await response.json();

    // Cache APOD data for 1 hour (3600 seconds) since it doesn't change frequently
    // Allow stale content while revalidating for up to 24 hours
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
