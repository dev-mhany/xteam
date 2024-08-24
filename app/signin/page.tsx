'use client';
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { User } from 'firebase/auth'; // Correct import for User type
import { useFirebaseAuth } from '../hooks/useFirebaseAuth'; // Import the custom hook

interface SignInProps {
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const SignIn: React.FC<SignInProps> = ({ setUser }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { user, loading, error, handleEmailSignIn, handleGoogleSignIn } = useFirebaseAuth();

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const success = await handleEmailSignIn(email, password);
        if (success) setUser(user);
    };

    return (
        <Box component="form" onSubmit={handleSignIn} sx={{ mt: 3 }}>
            <Typography variant="h4">Sign In</Typography>
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                required
                type="email"
            />
            <TextField
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                required
                type="password"
            />
            {error && <Typography color="error">{error}</Typography>}
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                            Sign In
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleGoogleSignIn}>
                            Sign In with Google
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default SignIn;
