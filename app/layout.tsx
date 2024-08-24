import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Head from 'next/head';

export const metadata = {
  title: 'XTeam | Custom Mobile Skins & Screen Protectors',
  description: 'Discover the latest CNC laser machines and materials for creating professional mobile skins and screen protectors.',
  openGraph: {
    title: 'XTeam | Custom Mobile Skins & Screen Protectors',
    description: 'Discover the latest CNC laser machines and materials for creating professional mobile skins and screen protectors.',
    url: 'https://your-website-url.com',
    type: 'website',
    images: [
      {
        url: '/xteam/public/c140feb9-6386-477c-b847-722c3899dd60_0760717e-7772-4c8c-b481-89300505848e.webp',
        width: 800,
        height: 600,
        alt: 'XTeam CNC Laser Machines',
      },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <link rel="icon" href="/favicon.ico" />
        <title>{metadata.title}</title>
      </Head>
      <body>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="lg" sx={{ minHeight: '80vh' }}>
          {children}
        </Container>
        <Footer />
      </body>
    </html>
  );
}
