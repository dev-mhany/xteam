'use client';
import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Facebook, Instagram, WhatsApp } from '@mui/icons-material';

export default function Home() {
  const handleClick = (platform: string) => {
    const urls: Record<string, string> = {
      facebook: 'https://www.facebook.com/your-page-url',
      instagram: 'https://www.instagram.com/your-page-url',
      whatsapp: 'https://wa.me/+201012821111',
    };
    window.open(urls[platform], '_blank');
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h2" gutterBottom>
        مرحباً بكم في XTeam!
      </Typography>
      <Typography variant="h5" gutterBottom>
        بنقدملك أحدث ماكينات CNC ليزر وآلات الكاتر لتصميم اسكرينات وكفرات موبايل مخصصة. وكمان بنوفر كل الخامات اللي هتحتاجها عشان تطلع منتجات بجودة عالية وباحترافية.
      </Typography>
      <Typography variant="h3" gutterBottom sx={{ mt: 5 }}>
        Coming Soon
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Facebook />}
          sx={{ m: 1 }}
          onClick={() => handleClick('facebook')}
        >
          فيسبوك
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Instagram />}
          sx={{ m: 1 }}
          onClick={() => handleClick('instagram')}
        >
          انستجرام
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<WhatsApp />}
          sx={{ m: 1 }}
          onClick={() => handleClick('whatsapp')}
        >
          واتساب
        </Button>
      </Box>
    </Box>
  );
}
