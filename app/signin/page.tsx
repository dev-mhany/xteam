'use client';
import React, { useState } from 'react';
import SignIn from './SignIn';
import { User } from 'firebase/auth';

const SignInPage = () => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <div>
            <SignIn setUser={setUser} />
        </div>
    );
};

export default SignInPage;
