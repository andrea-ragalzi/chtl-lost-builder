import { AppShell, Burger, Title, Drawer, List, ListItem, Anchor, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, Link } from 'react-router-dom';
import { IconHome, IconList } from '@tabler/icons-react';

const RootLayout = () => {
    // Hook per gestire l'apertura/chiusura del menu su mobile
    const [opened, { toggle, close }] = useDisclosure(false);

    return (
        <>
            <AppShell
                header={{ height: 60 }}
                padding="md"
            >
                <AppShell.Header>
                    <Flex align="center" justify="space-between" style={{ height: '100%' }} px="md">
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                        <Title order={3}>Changeling: The Lost Builder</Title>
                    </Flex>
                </AppShell.Header>

                <AppShell.Main>
                    <Outlet />
                </AppShell.Main>
            </AppShell>

            <Drawer
                opened={opened}
                onClose={close}
                padding="md"
                size="xs"
                title="Navigation"
            >
                <List
                    spacing="xs"
                    size="sm"
                    icon={<IconList />}
                >
                    <ListItem icon={<IconHome size={16} />}>
                        <Anchor component={Link} to="/" onClick={close}>
                            Builder
                        </Anchor>
                    </ListItem>
                    <ListItem icon={<IconHome size={16} />}>
                        <Anchor component={Link} to="/sheet" onClick={close}>
                            Sheet
                        </Anchor>
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};

export default RootLayout;