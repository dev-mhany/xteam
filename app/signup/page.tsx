'use client';
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { createUserWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth'; // Import GoogleAuthProvider
import { auth, db } from '../lib/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const Signup: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [mobilePhone, setMobilePhone] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string>('');

    const saveUserData = async (uid: string, name: string, email: string, mobilePhone: string) => {
        try {
            await setDoc(doc(db, 'users', uid), {
                name: name,
                email: email,
                mobilePhone: mobilePhone,
            });
            console.log('User data saved successfully!');
        } catch (err) {
            console.error('Error saving user data:', err);
            setError('Failed to save user data. Please try again.');
        }
    };

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await saveUserData(user.uid, name, email, mobilePhone);
            setSuccessMessage('Signup successful! Please sign in.');
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setMobilePhone('');
        } catch (error: any) {
            console.error('Signup error:', error);
            setError('Failed to sign up. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(null);

        try {
            const provider = new GoogleAuthProvider(); // Create an instance of GoogleAuthProvider
            await signInWithRedirect(auth, provider); // Pass the auth instance and provider
        } catch (error: any) {
            console.error('Google Sign-In error:', error);
            setError('Failed to sign in with Google. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSignup} sx={{ mt: 3 }}>
            <Typography variant="h4">Sign Up</Typography>
            {successMessage && <Typography variant="h6" color="success.main">{successMessage}</Typography>}
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
                required
            />
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
                label="Mobile Phone"
                value={mobilePhone}
                onChange={(e) => setMobilePhone(e.target.value)}
                fullWidth
                margin="normal"
                required
                type="tel"
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
            <TextField
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                margin="normal"
                required
                type="password"
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <Button type="submit" variant="contained" color="primary">
                            Sign Up
                        </Button>
                        <Button onClick={handleGoogleSignIn} variant="outlined" color="secondary" sx={{ ml: 2 }}>
                            Sign in with Google
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default Signup;
