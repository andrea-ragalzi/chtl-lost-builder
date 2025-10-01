import { Box, Title, Group, Stack, Text } from '@mantine/core';
import React from 'react';
import { useAppSelector } from '../../../shared/hooks/hooks';
import type { RootState } from '../../../app/store';

const HollowDisplayRow: React.FC<{ id: string }> = ({ id }) => {
    const hollow = useAppSelector((state: RootState) =>
        state.character.hollows.find(h => h.id === id)
    );

    if (!hollow) return null;

    return (
        <Stack gap="xs" p="sm" style={{ border: '1px solid var(--mantine-color-gray-3)', borderRadius: '4px' }}>
            <Group justify="space-between" align="baseline">
                <Text fw={700} size="md">Hollow: {hollow.size}</Text>
                <Text size="sm" c="dimmed">Sicurezza: {hollow.security}</Text>
            </Group>

            <Text size="sm" c="dimmed" fw={500}>Descrizione / Poteri:</Text>
            <Text size="sm">{hollow.description || 'Nessuna descrizione.'}</Text>
        </Stack>
    );
};

export const HollowSection: React.FC = () => {
    const hollows = useAppSelector((state: RootState) => state.character.hollows);

    return (
        <Box>
            <Title order={4} mb="sm">HOLLOW</Title>
            <Stack gap="md" mb="md">
                {hollows.length === 0 ? (
                    <Text c="dimmed" size="sm">Nessun Hollow tracciato. Aggiungi nel Builder.</Text>
                ) : (
                    hollows.map(hollow => (
                        <HollowDisplayRow key={hollow.id} id={hollow.id} />
                    ))
                )}
            </Stack>
        </Box>
    );
};