// src/features/builder/components/concept/CharacterDetails.tsx

import { Box, Title, Text, Stack, Paper, SimpleGrid, TextInput } from '@mantine/core';
import { updateCharacterDetails, type CharacterDetailsState } from '../../../shared/stores/characterDetailsSlice';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import type { RootState } from '../../../app/store';


const LABELS: { field: keyof CharacterDetailsState; label: string; span: { base: number; md: number } }[] = [
    { field: 'name', label: 'Name', span: { base: 12, md: 6 } },
    { field: 'player', label: 'Player', span: { base: 12, md: 6 } },
    { field: 'chronicle', label: 'Chronicle', span: { base: 12, md: 6 } },
    { field: 'needle', label: 'Needle', span: { base: 12, md: 6 } },
    { field: 'thread', label: 'Thread', span: { base: 12, md: 6 } },
];

export const CharacterDetails = () => {
    const dispatch = useAppDispatch();
    const characterDetails = useAppSelector((state: RootState) => state.character.characterDetails);

    const handleUpdate = (field: keyof CharacterDetailsState, value: string) => {
        dispatch(updateCharacterDetails({ field, value }));
    };

    return (
        <Box p="md">
            <Stack align="center" mb="xl">
                <Title order={2}>1. Character Details</Title>
                <Text c="dimmed" ta="center" maw={600}>
                    Enter the core details of your character, their background, and their connection to the Dreaming.
                </Text>
            </Stack>

            <Paper withBorder p="md">
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                    {LABELS.map(({ field, label }) => (
                        <TextInput
                            key={field}
                            label={label}
                            value={characterDetails[field]}
                            onChange={(event) => handleUpdate(field, event.currentTarget.value)}
                            size="md"
                            placeholder={`Enter ${label}...`}
                        />
                    ))}
                </SimpleGrid>
            </Paper>
        </Box>
    );
};