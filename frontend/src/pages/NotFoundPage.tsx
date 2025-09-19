import { Title, Text, Stack } from '@mantine/core';

const NotFoundPage = () => (
  <Stack py="lg">
    <Title order={2}>404</Title>
    <Text c="dimmed">Pagina non trovata.</Text>
  </Stack>
);

export default NotFoundPage;
