import { Box, Title, Stack, Text } from '@mantine/core';
import React from 'react';
import { useAppSelector } from '../../../shared/hooks/hooks';
import type { RootState } from '../../../app/store';

const FaeMountDisplayRow: React.FC<{ id: string }> = ({ id }) => {
    const mount = useAppSelector((state: RootState) =>
        state.character.faeMounts.find(m => m.id === id)
    );

    if (!mount) return null;

    const mountTitle = mount.description.substring(0, 40).trim() || 'Cavalcatura Fae';

    return (
        <Stack gap="xs" p="sm" style={{ border: '1px solid var(--mantine-color-gray-3)', borderRadius: '4px' }}>
            <Text fw={700} size="md">{mountTitle}</Text>
            <Text size="sm">{mount.description || 'Nessuna descrizione.'}</Text>
        </Stack>
    );
};

export const FaeMountSection: React.FC = () => {
    const mounts = useAppSelector((state: RootState) => state.character.faeMounts);

    return (
        <Box>
            <Title order={4} mb="sm">FAE MOUNT</Title>
            <Stack gap="md" mb="md">
                {mounts.length === 0 ? (
                    <Text c="dimmed" size="sm">Nessuna Cavalcatura Fae tracciata. Aggiungi nel Builder.</Text>
                ) : (
                    mounts.map(mount => (
                        <FaeMountDisplayRow key={mount.id} id={mount.id} />
                    ))
                )}
            </Stack>
        </Box>
    );
};