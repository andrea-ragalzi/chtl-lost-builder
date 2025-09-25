import { Container, Title, Button, Stack, Text } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../shared/hooks/hooks';
import { setCredentials } from '../features/auth/stores/authSlice';

const DevPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const bypassLogin = () => {
    // Simulate a successful login
    dispatch(
      setCredentials({
        user: { id: 'dev-user', email: 'dev@example.com' },
      })
    );
    navigate('/characters'); // Redirect to characters page after bypass
  };

  return (
    <Container>
      <Stack align="center" justify="center" style={{ height: '80vh' }}>
        <Title>Development Page</Title>
        <Text size="lg" c="dimmed">Quick navigation for development purposes.</Text>
        <Stack justify="center" gap="xl" mt="xl">
          <Button onClick={bypassLogin}>Bypass Login</Button>
          <Button component={Link} to="/characters">
            Go to Characters Page
          </Button>
          <Button component={Link} to="/builder">
            Go to Builder Page
          </Button>
          <Button component={Link} to="/sheet">
            Go to Sheet Page (replace with a valid character ID)
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default DevPage;