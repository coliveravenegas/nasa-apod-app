import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import ClientProviders from './components/ClientProviders';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NASA APOD Dashboard',
  description:
    'Astronomy Picture of the Day - Explore stunning space images from NASA',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className={inter.className} style={{ margin: 0 }}>
        <AppRouterCacheProvider>
          <ClientProviders>{children}</ClientProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
