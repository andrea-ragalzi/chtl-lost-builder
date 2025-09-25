import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, TextInput, PasswordInput, Text } from '@mantine/core';
import { useRegisterMutation } from '../api/authApi';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      await register({ email, password }).unwrap(); // unwrap to catch errors
      navigate('/characters');
    } catch (err) {
      // Handle errors (e.g., display an error message)
      console.error('Registration failed', err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography component="h1" variant="h5">
        Sign up
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
        type="password"
        id="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && (
        <Text c="red" size="sm" mt="sm">
          { 'data' in error ? (error.data as {message: string}).message : 'Registration failed. Please try again.'}
        </Text>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isLoading}
        mt="xl"
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default RegisterForm;