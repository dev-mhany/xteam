'use client';
import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Facebook, Instagram, WhatsApp } from '@mui/icons-material';

export default function Home() {
  const handleClick = (platform: string) => {
    const urls: Record<string, string> = {
      facebook: 'https://www.facebook.com/0.XTeam.0/',
      instagram: 'https://www.instagram.com/0_xteam_0/',
      whatsapp: 'https://wa.me/+201012821111',
    };
    window.open(urls[platform], '_blank');
  };

  return (
    <Box sx={{ width: '100%', textAlign: 'center', mt: 10 }}>
      <Typography variant="h2" gutterBottom>
        مرحباً بكم في XTeam!
      </Typography>
      <Typography variant="h5" gutterBottom>
        يسعدنا انضمامكم لعائلة XTeam! هنا بنقدم لكم أحدث التقنيات في ماكينات CNC ليزر وآلات الكاتر لتصميم اسكرينات وكفرات موبايل مخصصة. احنا بنهتم إنك تطلع بأعلى جودة وباحترافية.
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        اكتشف معنا كل الجديد في عالم التكنولوجيا والتصميم، وخلّي إبداعك يطلع للنور بأفضل الخامات وأحدث الماكينات.
      </Typography>
      <Typography variant="h3" gutterBottom sx={{ mt: 5, color: 'secondary.main', fontWeight: 'bold' }}>
        Coming Soon
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        تابعونا على وسائل التواصل الاجتماعي عشان تفضلوا على تواصل وتعرفوا كل جديد.
      </Typography>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Facebook />}
          sx={{ m: 1, transition: '0.3s', '&:hover': { transform: 'scale(1.1)' } }}
          onClick={() => handleClick('facebook')}
        >
          فيسبوك
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Instagram />}
          sx={{ m: 1, transition: '0.3s', '&:hover': { transform: 'scale(1.1)' } }}
          onClick={() => handleClick('instagram')}
        >
          انستجرام
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<WhatsApp />}
          sx={{ m: 1, transition: '0.3s', '&:hover': { transform: 'scale(1.1)' } }}
          onClick={() => handleClick('whatsapp')}
        >
          واتساب
        </Button>
      </Box>
      <Typography variant="body1" gutterBottom sx={{ mt: 5, color: 'text.secondary' }}>
        بنقدّر دعمكم وثقتكم في XTeam. اتواصلوا معنا دايماً لأي استفسارات أو اقتراحات.
      </Typography>
    </Box>
  );
}
