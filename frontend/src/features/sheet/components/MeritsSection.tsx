import { Paper, Title, Stack, Text, Modal, Button, Group } from '@mantine/core';
import { useAppSelector } from '../../../shared/hooks/hooks';
import { useState } from 'react';
import { meritData } from '../../../shared/data/meritData';
import type { Merit } from '../../../shared/types/meritType';

export const MeritsSection = () => {
    const merits = useAppSelector((state) => state.character.merits.selected);
    const [opened, setOpened] = useState(false);
    const [selectedMerit, setSelectedMerit] = useState<Merit | null>(null);

    const openModal = (meritName: string) => {
        const merit: Merit | undefined = meritData.find(m => m.name === meritName);
        setSelectedMerit(merit || null);
        setOpened(true);
    };

    return (
        <Paper withBorder p="md">
            <Title order={4} ta="center" tt="uppercase">Merits</Title>
            <Stack mt="sm">
                {Object.entries(merits).map(([name, level]) => (
                    <Group key={name}>
                        <Text>
                            {name} (Level: {level})
                        </Text>
                        <Button size="xs" onClick={() => openModal(name)}>Details</Button>
                    </Group>
                ))}
            </Stack>

            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title={selectedMerit?.name || 'Merit Details'}
            >
                {selectedMerit && (
                    <Stack>
                        <Text>Category: {selectedMerit.category}</Text>
                        {selectedMerit.prerequisites && <Text>Prerequisites: {selectedMerit.prerequisites}</Text>}
                        {selectedMerit.tags && <Text>Tags: {selectedMerit.tags.join(', ')}</Text>}
                        <Text>Effect: {selectedMerit.effect}</Text>
                        <Text>Cost: {selectedMerit.cost.join(', ')}</Text>
                    </Stack>
                )}
            </Modal>
        </Paper>
    );
};