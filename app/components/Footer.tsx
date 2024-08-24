import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ py: 3, textAlign: 'center', mt: 'auto', backgroundColor: '#f5f5f5' }}>
            <Typography variant="body2">
                © 2024 XTeam. All rights reserved. | <Link href="mailto:your-email@example.com">Contact us</Link>
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Follow us on{' '}
                <Link href="https://www.facebook.com/your-page-url" target="_blank" rel="noopener">
                    Facebook
                </Link>
                ,{' '}
                <Link href="https://www.instagram.com/your-page-url" target="_blank" rel="noopener">
                    Instagram
                </Link>
                , and{' '}
                <Link href="https://wa.me/your-number" target="_blank" rel="noopener">
                    WhatsApp
                </Link>
            </Typography>
        </Box>
    );
};

export default Footer;
