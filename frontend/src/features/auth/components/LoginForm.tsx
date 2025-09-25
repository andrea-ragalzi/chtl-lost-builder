import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextInput, PasswordInput, Button, Typography, Text } from '@mantine/core';
import { useLoginMutation } from '../api/authApi';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading, error }] = useLoginMutation();
    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            await login({ email, password }).unwrap(); // unwrap to catch errors
            navigate('/characters');
        } catch (err) {
            // Handle errors (e.g., display an error message)
            console.error('Login failed', err);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <TextInput
                mt="md"
                required
                style={{ width: '100%' }}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
                mt="md"
                required
                style={{ width: '100%' }}
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
                <Text c="red" size="sm" mt="sm">
                    { 'message' in error ? error.message : 'Login failed. Please check your credentials.'}
                </Text>
            )}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                mt="xl"
            >
                Sign In
            </Button>
        </Box>
    );
};

export default LoginForm;