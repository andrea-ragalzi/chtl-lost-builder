import { Container, Title, Text, Button, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <Container>
            <Stack align="center" justify="center" style={{ height: '80vh' }}>
                <Title>Welcome to the Changeling Builder!</Title>
                <Text size="lg" c="dimmed">Create your character and explore the Lost.</Text>
                <Stack justify="center" align="center" gap="xl" mt="xl">
                    <Button component={Link} to="/login" variant="outline">
                        Login
                    </Button>
                    <Button component={Link} to="/register">
                        Register
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
};

export default LandingPage;