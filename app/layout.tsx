import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';

export const metadata = {
  title: 'XTeam | Custom Mobile Skins & Screen Protectors',
  description: 'Discover the latest CNC laser machines and materials for creating professional mobile skins and screen protectors.',
  openGraph: {
    url: 'https://xteam-eta.vercel.app/',
    type: 'website',
    title: 'XTeam | Custom Mobile Skins & Screen Protectors',
    description: 'Discover the latest CNC laser machines and materials for creating professional mobile skins and screen protectors.',
    images: [
      {
        url: 'https://opengraph.b-cdn.net/production/images/2eedf9ec-0c78-4e71-ad7c-38990283a006.png?token=eaqRJg1PsrLQrMKe_-PwM886_zG1DuYofGuyZrY0j7o&height=500&width=500&expires=33260498090',
        width: 500,
        height: 500,
        alt: 'XTeam Product Image'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    domain: 'xteam-eta.vercel.app',
    url: 'https://xteam-eta.vercel.app/',
    title: 'XTeam | Custom Mobile Skins & Screen Protectors',
    description: 'Discover the latest CNC laser machines and materials for creating professional mobile skins and screen protectors.',
    image: 'https://opengraph.b-cdn.net/production/images/2eedf9ec-0c78-4e71-ad7c-38990283a006.png?token=eaqRJg1PsrLQrMKe_-PwM886_zG1DuYofGuyZrY0j7o&height=500&width=500&expires=33260498090'
  },
  charset: 'UTF-8',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CssBaseline />
          <Navbar />
          <Container sx={{ width: '100vw', height: 'auto', overflow: 'hidden' }}>
            {children}
          </Container>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
