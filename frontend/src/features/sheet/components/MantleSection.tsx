import { Box, Title, Group, Stack, Text } from '@mantine/core';
import React from 'react';
import { useAppSelector } from '../../../shared/hooks/hooks';
import type { RootState } from '../../../app/store';

const MantleDisplayRow: React.FC<{ id: string }> = ({ id }) => {
    const mantle = useAppSelector((state: RootState) => 
        state.character.mantles.find(m => m.id === id)
    );

    if (!mantle) return null;

    return (
        <Stack gap="xs" p="sm" style={{ border: '1px solid var(--mantine-color-gray-3)', borderRadius: '4px' }}>
            <Group justify="space-between">
                <Text fw={700} size="md">{mantle.court} ({mantle.level})</Text>
            </Group>
            
            <Text size="sm" c="dimmed" fw={500}>Beneficio:</Text>
            <Text size="sm">{mantle.benefit || 'Nessun beneficio descritto.'}</Text>
            
            <Text size="sm" c="dimmed" fw={500}>Penalità:</Text>
            <Text size="sm">{mantle.drawback || 'Nessuna penalità descritta.'}</Text>
        </Stack>
    );
};

export const MantleSection: React.FC = () => {
    const mantles = useAppSelector((state: RootState) => state.character.mantles);
    
    return (
        <Box>
            <Title order={4} mb="sm">MANTLE</Title>
            <Stack gap="md" mb="md">
                {mantles.length === 0 ? (
                    <Text c="dimmed" size="sm">Nessun Mantle tracciato. Aggiungi nel Builder.</Text>
                ) : (
                    mantles.map(mantle => (
                        <MantleDisplayRow key={mantle.id} id={mantle.id} />
                    ))
                )}
            </Stack>
        </Box>
    );
};