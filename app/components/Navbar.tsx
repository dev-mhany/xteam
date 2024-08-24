'use client';
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../lib/firebaseConfig';

const Navbar = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('Navbar must be used within an AuthProvider');
    }

    const { user, setUser } = authContext;

    const handleSignOut = () => {
        auth.signOut().then(() => {
            setUser(null);
        });
    };

    // State for handling mobile menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" color="primary" sx={{ width: '100%' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                    XTeam
                </Typography>

                {/* Mobile menu icon */}
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ display: { xs: 'flex', sm: 'none' } }}
                    onClick={handleMenuOpen}
                >
                    <MenuIcon />
                </IconButton>

                {/* Full menu for larger screens */}
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
                    <Button color="inherit" href="/">
                        Home
                    </Button>
                    <Button color="inherit" href="#about">
                        About
                    </Button>
                    <Button color="inherit" href="#contact">
                        Contact
                    </Button>
                    {user ? (
                        <>
                            <Typography variant="body1" sx={{ marginRight: 2 }}>
                                Hi, {user.displayName ?? user.email}
                            </Typography>
                            <Button color="inherit" onClick={handleSignOut}>
                                Sign Out
                            </Button>
                        </>
                    ) : (
                        <Button color="inherit" href="/signin">
                            Sign In
                        </Button>
                    )}
                </Box>

                {/* Mobile menu */}
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                    sx={{ display: { xs: 'block', sm: 'none' } }}
                >
                    <MenuItem onClick={handleMenuClose} component="a" href="/">Home</MenuItem>
                    <MenuItem onClick={handleMenuClose} component="a" href="#about">About</MenuItem>
                    <MenuItem onClick={handleMenuClose} component="a" href="#contact">Contact</MenuItem>
                    {user ? (
                        <MenuItem onClick={() => { handleMenuClose(); handleSignOut(); }}>
                            Sign Out
                        </MenuItem>
                    ) : (
                        <MenuItem onClick={handleMenuClose} component="a" href="/signin">
                            Sign In
                        </MenuItem>
                    )}
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
