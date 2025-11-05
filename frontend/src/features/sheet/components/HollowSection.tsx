import { Fieldset, Group, Stack, Text, Box, Badge } from '@mantine/core';
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
        <Box>
            <Group justify="space-between" mb="xs">
                <Group gap="md">
                    <Text fw={700} size="sm">{hollow.size}</Text>
                    <Badge>Security {hollow.security}</Badge>
                </Group>
            </Group>

            {hollow.description && (
                <Stack gap={4}>
                    <Text size="sm">{hollow.description}</Text>
                </Stack>
            )}
        </Box>
    );
};

export const HollowSection: React.FC = () => {
    const hollows = useAppSelector((state: RootState) => state.character.hollows);

    return (
        <>
        <Fieldset legend="Hollow" mb="md">
            <Stack gap="md">
                {hollows.length === 0 ? (
                    <Text c="dimmed" size="sm">No hollow tracked. Add in the Builder.</Text>
                ) : (
                    hollows.map(hollow => (
                        <HollowDisplayRow
                            key={hollow.id}
                            id={hollow.id} />
                    ))
                )}
            </Stack>
        </Fieldset>
        </>
    );
};