import { Box, Title, Text, Stack, Button, Group, SimpleGrid, Paper, ActionIcon } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { setPriority, updateAttribute } from '../../../shared/stores/attributeSlice';
import { IconPlus, IconMinus } from '@tabler/icons-react';

const ATTRIBUTE_GROUPS = {
    mental: ['intelligence', 'wits', 'resolve'],
    physical: ['strength', 'dexterity', 'stamina'],
    social: ['presence', 'manipulation', 'composure']
};

const PRIORITIES = [5, 4, 3];

export const AttributeSelection = () => {
    const dispatch = useAppDispatch();
    const priorities = useAppSelector((state) => state.character.attributes.priorities);
    const individual = useAppSelector((state) => state.character.attributes.individual);

    const resetAttributes = () => {
        Object.keys(ATTRIBUTE_GROUPS).forEach(groupKey => {
            ATTRIBUTE_GROUPS[groupKey as keyof typeof ATTRIBUTE_GROUPS].forEach(attribute => {
                dispatch(updateAttribute({ attribute: attribute as keyof typeof individual, value: 1 }));
            });
        });
    };

    const handleSetPriority = (group: keyof typeof ATTRIBUTE_GROUPS, value: number) => {
        resetAttributes();
        dispatch(setPriority({ group, value }));
    };

    const handleAttributeChange = (attribute: string, delta: number) => {
        const currentValue = individual[attribute as keyof typeof individual];
        const group = Object.keys(ATTRIBUTE_GROUPS).find(key =>
            ATTRIBUTE_GROUPS[key as keyof typeof ATTRIBUTE_GROUPS].includes(attribute)
        ) as keyof typeof ATTRIBUTE_GROUPS;

        const remaining = getPointsRemaining(group);

        if (delta > 0 && remaining <= 0) {
            return;
        }

        if (delta < 0 && currentValue <= 1) {
            return;
        }

        const newValue = Math.max(1, currentValue + delta);
        dispatch(updateAttribute({ attribute: attribute as keyof typeof individual, value: newValue }));
    };

    const getGroupTotal = (group: keyof typeof ATTRIBUTE_GROUPS) => {
        const attrs = ATTRIBUTE_GROUPS[group];
        return attrs.reduce((sum, attr) => sum + (individual[attr.toLowerCase() as keyof typeof individual] - 1), 0);
    };

    const getPointsRemaining = (group: keyof typeof ATTRIBUTE_GROUPS) => {
        const budget = priorities[group];
        const used = getGroupTotal(group);
        return budget - used;
    };

    return (
        <Box p="md">
            <Stack align="center" mb="xl">
                <Title order={2}>2. Assign Your Attributes</Title>
                <Text c="dimmed" ta="center" maw={600}>
                    Attributes represent your character's innate qualities: their mind, body, and social skills. Assign priorities to groups, then distribute points within each group.
                </Text>
            </Stack>

            <Stack gap="lg" mb="xl">
                {Object.keys(ATTRIBUTE_GROUPS).map((group) => (
                    <Group key={group} >
                        <Text fw={700} tt="capitalize" style={{ flex: 1 }}>{group}</Text>
                        <Group justify="end" style={{ flex: 2 }}>
                            {PRIORITIES.map((value) => {
                                const isSelected = priorities[group as keyof typeof priorities] === value;
                                return (
                                    <Button
                                        key={value}
                                        variant={isSelected ? 'filled' : 'outline'}
                                        onClick={() => handleSetPriority(group as keyof typeof ATTRIBUTE_GROUPS, value)}
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
                {Object.entries(ATTRIBUTE_GROUPS).map(([groupKey, attrs]) => {
                    const group = groupKey as keyof typeof ATTRIBUTE_GROUPS;
                    const used = getGroupTotal(group);
                    const remaining = getPointsRemaining(group);
                    return (
                        <Paper withBorder p="md" key={groupKey}>
                            <Title order={4} tt="capitalize">{groupKey}</Title>
                            <Text size="sm" c={remaining < 0 ? 'red' : 'green'}>Used: {used} / Remaining: {remaining}</Text>
                            <Stack mt="md">
                                {attrs.map(attr => {
                                    const attrKey = attr.toLowerCase() as keyof typeof individual;
                                    const value = individual[attrKey];
                                    const canIncrement = remaining > 0;
                                    const canDecrement = value > 1;
                                    return (
                                        <Group key={attr} justify="space-between">
                                            <Text tt="capitalize">{attr}</Text>
                                            <Group gap="xs">
                                                <ActionIcon
                                                    size="sm"
                                                    onClick={() => canDecrement && handleAttributeChange(attr, -1)}
                                                    disabled={!canDecrement}
                                                >
                                                    <IconMinus size={16} />
                                                </ActionIcon>
                                                <Text fw={700} style={{ minWidth: 20, textAlign: 'center' }}>{value}</Text>
                                                <ActionIcon
                                                    size="sm"
                                                    onClick={() => canIncrement && handleAttributeChange(attr, 1)}
                                                    disabled={!canIncrement}
                                                >
                                                    <IconPlus size={16} />
                                                </ActionIcon>
                                            </Group>
                                        </Group>
                                    );
                                })}
                            </Stack>
                        </Paper>
                    );
                })}
            </SimpleGrid>
        </Box>
    );
};