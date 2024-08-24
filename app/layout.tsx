import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Head from 'next/head';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <title>XTeam | Custom Mobile Skins & Screen Protectors</title>
        <meta name="description" content="Discover the latest CNC laser machines and materials for creating professional mobile skins and screen protectors." />
        <meta property="og:url" content="https://xteam-eta.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="XTeam | Custom Mobile Skins & Screen Protectors" />
        <meta property="og:description" content="Discover the latest CNC laser machines and materials for creating professional mobile skins and screen protectors." />
        <meta property="og:image" content="https://opengraph.b-cdn.net/production/images/2eedf9ec-0c78-4e71-ad7c-38990283a006.png?token=eaqRJg1PsrLQrMKe_-PwM886_zG1DuYofGuyZrY0j7o&height=500&width=500&expires=33260498090" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="xteam-eta.vercel.app" />
        <meta property="twitter:url" content="https://xteam-eta.vercel.app/" />
        <meta name="twitter:title" content="XTeam | Custom Mobile Skins & Screen Protectors" />
        <meta name="twitter:description" content="Discover the latest CNC laser machines and materials for creating professional mobile skins and screen protectors." />
        <meta name="twitter:image" content="https://opengraph.b-cdn.net/production/images/2eedf9ec-0c78-4e71-ad7c-38990283a006.png?token=eaqRJg1PsrLQrMKe_-PwM886_zG1DuYofGuyZrY0j7o&height=500&width=500&expires=33260498090" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
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
