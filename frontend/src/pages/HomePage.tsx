import { Title, Text, Stack, Button } from '@mantine/core';
import { NavLink } from 'react-router-dom';

const HomePage = () => (
  <Stack py="lg">
    <Title order={2}>Home</Title>
    <Text c="dimmed">Routing pronto. Aggiungi rotte e layout annidati quando vuoi.</Text>
    <Button component={NavLink} to="/login">Vai al Login</Button>
  </Stack>
);

export default HomePage;
