import { Paper, Title, Code, Collapse, Group, ActionIcon } from '@mantine/core';
import { useAppSelector } from '../hooks/hooks';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

export const DebugState = () => {
    const [isOpen, { toggle }] = useDisclosure(true);
    const builderState = useAppSelector((state) => state.character);

    return (
        <Paper
            withBorder
            p="md"
            mt="xl"
            style={{
                position: 'fixed',
                bottom: 20,
                zIndex: 1000,
                transition: 'all 200ms ease',
                ...(isOpen
                    ? {
                        right: 20,
                        left: 'auto',
                        width: 400,
                        maxWidth: '90vw',
                        maxHeight: '80vh',
                        overflowY: 'hidden'
                    }
                    : {
                        right: 20,
                        width: 100
                    })
            }}
        >
            <Group justify="space-between" onClick={toggle} style={{ cursor: 'pointer' }}>
                {isOpen ? (
                    <Title order={5}>Debug: Character State</Title>
                ) : <Title order={6}>Debug</Title>}
                <ActionIcon variant="transparent" color="gray">
                    {isOpen ? <IconChevronDown size={18} /> : <IconChevronUp size={18} />}
                </ActionIcon>
            </Group>

            <Collapse in={isOpen}>
                <Code block mt="sm" style={{ maxHeight: 'calc(80vh - 80px)', overflowY: 'auto' }}>
                    {JSON.stringify(builderState, null, 2)}
                </Code>
            </Collapse>
        </Paper>
    );
};