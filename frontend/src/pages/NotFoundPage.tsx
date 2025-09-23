import { Container, Title, Text, Button, Stack } from '@mantine/core';
import { NavLink } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <Container>
            <Stack align="center" justify="center" style={{ height: '80vh' }}>
                <Title>404</Title>
                <Text c="dimmed">Page not found.</Text>
                <Button component={NavLink} to="/" mt="md">
                    Torna al Builder
                </Button>
            </Stack>
        </Container>
    );
};

export default NotFoundPage;