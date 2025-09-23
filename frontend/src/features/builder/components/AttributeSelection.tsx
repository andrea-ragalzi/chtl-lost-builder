import { Box, Title, Text, Stack, Button, Group, SimpleGrid, Paper } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { setPriority } from '../stores/attributeSlice';

const ATTRIBUTE_GROUPS = {
    mental: ['Intelligence', 'Wits', 'Resolve'],
    physical: ['Strength', 'Dexterity', 'Stamina'],
    social: ['Presence', 'Manipulation', 'Composure'],
};

const PRIORITIES = [4, 3, 2];

export const AttributeSelection = () => {
    const dispatch = useAppDispatch();
    const priorities = useAppSelector((state) => state.builder.attributes.priorities);


    const handleSetPriority = (group: keyof typeof ATTRIBUTE_GROUPS, value: number) => {
        dispatch(setPriority({ group, value }));
    };

    return (
        <Box p="md">
            <Stack align="center" mb="xl">
                <Title order={2}>2. Assign Your Attributes</Title>
                <Text c="dimmed" ta="center" maw={600}>
                    Attributes represent your character's innate qualities: their mind, body, and social skills. Assign points to the three groups according to the instructions.
                </Text>
            </Stack>

            <Paper withBorder p="md" mb="xl">
                <Text ta="center" fw={500}>Assign the values 4, 3, 2 to the Mental, Physical, and Social groups.</Text>
            </Paper>

            <Stack gap="lg" mb="xl">
                {Object.keys(ATTRIBUTE_GROUPS).map((group) => (
                    <Group key={group} grow>
                        <Text fw={700} tt="capitalize" ta="right" style={{ flex: 1 }}>{group}</Text>
                        <Group justify="center" style={{ flex: 2 }}>
                            {PRIORITIES.map((value) => {
                                const isSelected = priorities[group as keyof typeof priorities] === value;
                                return (
                                    <Button
                                        key={value}
                                        variant={isSelected ? 'filled' : 'outline'}
                                        onClick={() => handleSetPriority(group as keyof typeof ATTRIBUTE_GROUPS, value)}
                                        // The 'disabled' prop has been removed to allow swapping.
                                        size="xs"
                                    >
                                        {value}
                                    </Button>
                                );
                            })}
                        </Group>
                    </Group>
                ))}
            </Stack>

            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
                {Object.entries(ATTRIBUTE_GROUPS).map(([groupKey, attrs]) => (
                    <Paper withBorder p="md" key={groupKey}>
                        <Title order={4} tt="capitalize">{groupKey}</Title>
                        <Stack mt="md">
                            {attrs.map(attr => (
                                <Group key={attr} justify="space-between">
                                    <Text>{attr}</Text>
                                    <Text fw={700}>{priorities[groupKey as keyof typeof priorities]}</Text>
                                </Group>
                            ))}
                        </Stack>
                    </Paper>
                ))}
            </SimpleGrid>


        </Box>
    );
};