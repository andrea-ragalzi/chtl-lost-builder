import { Fieldset, Stack, Text, Box } from '@mantine/core';
import React from 'react';
import { useAppSelector } from '../../../shared/hooks/hooks';
import type { RootState } from '../../../app/store';

const FaeMountDisplayRow: React.FC<{ id: string }> = ({ id }) => {
    const mount = useAppSelector((state: RootState) =>
        state.character.faeMounts.find(m => m.id === id)
    );

    if (!mount) return null;


    return (
        <Box>
            <Stack gap={4}>
                <Text fw={700} size="sm">{mount.name}</Text>
                <Text size="sm">{mount.description || 'No description.'}</Text>
            </Stack>
        </Box>
    );
};

export const FaeMountSection: React.FC = () => {
    const mounts = useAppSelector((state: RootState) => state.character.faeMounts);

    return (
        <Fieldset legend="Fae Mount" mb="md">
            <Stack gap="md">
                {mounts.length === 0 ? (
                    <Text c="dimmed" size="sm">No fae mount tracked. Add in the Builder.</Text>
                ) : (
                    mounts.map(mount => (
                        <FaeMountDisplayRow key={mount.id} id={mount.id} />
                    ))
                )}
            </Stack>
        </Fieldset>
    );
};