import { Fieldset, Group, Stack, Text, Paper } from '@mantine/core';
import React from 'react';
import { useAppSelector } from '../../../shared/hooks/hooks';
import type { RootState } from '../../../app/store';

const HollowDisplayRow: React.FC<{ id: string }> = ({
    id }) => {
    const hollow = useAppSelector((state: RootState) =>
        state.character.hollows.find(h => h.id === id)
    );

    if (!hollow) return null;

    return (
        <Paper p="sm" withBorder>
            <Group justify="space-between" mb="xs">
                <Group gap="md">
                    <Text fw={700} size="sm">Size: {hollow.size}</Text>
                    <Text fw={700} size="sm">Security: {hollow.security}</Text>
                </Group>
            </Group>

            {hollow.description && (
                <Stack gap={4}>
                    <Text size="xs" c="dimmed" fw={500}>Description:</Text>
                    <Text size="sm">{hollow.description}</Text>
                </Stack>
            )}
        </Paper>
    );
};

export const HollowSection: React.FC = () => {
    const hollows = useAppSelector((state: RootState) => state.character.hollows);

    return (
        <Fieldset legend="Hollow">
            <Stack gap="md">
                {hollows.length === 0 ? (
                    <Text c="dimmed" size="sm">No hollow tracked. Add in the Builder.</Text>
                ) : (
                    hollows.map(hollow => (
                        <HollowDisplayRow
                            key={hollow.id}
                            id={hollow.id}
                        />
                    ))
                )}
            </Stack>
        </Fieldset>
    );
};