import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  AppShell,
  Container,
  Group,
  Title,
  Anchor,
  Burger,
  Drawer,
  Stack,
  Button,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const RootLayout = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const location = useLocation();
  const isActive = (to: string): boolean => location.pathname === to;

  return (
    <AppShell header={{ height: 56 }} padding="md">
      {/* Header */}
      <AppShell.Header>
        <Container size="lg" style={{ height: '100%' }}>
          <Group h="100%" justify="space-between" wrap="nowrap">
            {/* Brand */}
            <Title order={4} style={{ lineHeight: 1 }}>
              <Anchor component={NavLink} to="/" underline="never" c="inherit">
                CHTL: Lost Builder
              </Anchor>
            </Title>

            {/* Link desktop */}
            <Group gap="md" visibleFrom="sm">
              <Anchor component={NavLink} to="/" underline="never" fw={isActive('/') ? 700 : 400}>
                Home
              </Anchor>
              <Button
                component={NavLink}
                to="/login"
                variant={isActive('/login') ? 'filled' : 'light'}
                size="xs"
              >
                Login
              </Button>
            </Group>

            {/* Burger mobile */}
            <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          </Group>
        </Container>
      </AppShell.Header>

      {/* Drawer mobile */}
      <Drawer opened={opened} onClose={close} size="xs" padding="md" title="Menu" hiddenFrom="sm">
        <Stack gap="sm">
          <Button
            component={NavLink}
            to="/"
            justify="flex-start"
            variant={isActive('/') ? 'filled' : 'subtle'}
            onClick={close}
          >
            Home
          </Button>
          <Button
            component={NavLink}
            to="/login"
            justify="flex-start"
            variant={isActive('/login') ? 'filled' : 'subtle'}
            onClick={close}
          >
            Login
          </Button>
        </Stack>
      </Drawer>

      {/* Contenuto */}
      <AppShell.Main>
        <Container size="lg">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};

export default RootLayout;
