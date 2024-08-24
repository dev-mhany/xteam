import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    XTeam
                </Typography>
                <Box>
                    <Button color="inherit" href="/">
                        Home
                    </Button>
                    <Button color="inherit" href="#about">
                        About
                    </Button>
                    <Button color="inherit" href="#contact">
                        Contact
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
