import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ py: 3, textAlign: 'center', mt: 'auto', backgroundColor: '#f5f5f5' }}>
            <Typography variant="body2">
                © 2024 XTeam. All rights reserved. | <Link href="eyadwael444@gmail.com">Contact us</Link>
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Follow us on{' '}
                <Link href="https://www.facebook.com/0.XTeam.0/" target="_blank" rel="noopener">
                    Facebook
                </Link>
                ,{' '}
                <Link href="https://www.instagram.com/0_xteam_0/" target="_blank" rel="noopener">
                    Instagram
                </Link>
                , and{' '}
                <Link href="https://wa.me/+201012821111" target="_blank" rel="noopener">
                    WhatsApp
                </Link>
            </Typography>
        </Box>
    );
};

export default Footer;
