import { Box, Title, Text, Stack, Button, Group, SimpleGrid, Paper, ActionIcon, Divider } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { setSkillPoints, setSkillPriority } from '../stores/skillSlice';
import { SKILL_GROUPS } from '../data/skillData';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import { useMemo } from 'react';

const SKILL_PRIORITIES = [11, 7, 4];

// A helper component for a single skill row with a counter
const SkillCounter = ({ name, value, onUpdate, canIncrease }: { name: string, value: number, onUpdate: (newValue: number) => void, canIncrease: boolean }) => {
    return (
        <Group justify="space-between">
            <Text>{name}</Text>
            <Group gap="xs" align="center">
                <ActionIcon size="sm" variant="outline" onClick={() => onUpdate(value - 1)} disabled={value <= 0}>
                    <IconMinus size={14} />
                </ActionIcon>
                <Text w={20} ta="center" fw={700}>{value}</Text>
                <ActionIcon size="sm" variant="outline" onClick={() => onUpdate(value + 1)} disabled={value >= 3 || !canIncrease}>
                    <IconPlus size={14} />
                </ActionIcon>
            </Group>
        </Group>
    );
};

export const SkillSelection = () => {
    const dispatch = useAppDispatch();
    const { priorities: skillPointDistribution, points: skillPoints } = useAppSelector((state) => state.builder.skills);

    const handlePriorityChange = (group: keyof typeof SKILL_GROUPS, value: number) => {
        dispatch(setSkillPriority({ group, value }));
    };

    const handleSkillUpdate = (skill: string, value: number) => {
        dispatch(setSkillPoints({ skill, value }));
    };

    // Calculate remaining points for each group
    const remainingPoints = useMemo(() => {
        const remaining: Record<string, number> = {};
        for (const group in SKILL_GROUPS) {
            const totalPoints = skillPointDistribution[group as keyof typeof skillPointDistribution] ?? 0;
            const spentPoints = SKILL_GROUPS[group as keyof typeof SKILL_GROUPS].reduce((sum, skill) => {
                return sum + (skillPoints[skill.toLowerCase()] || 0);
            }, 0);
            remaining[group] = totalPoints - spentPoints;
        }
        return remaining;
    }, [skillPoints, skillPointDistribution]);


    return (
        <Box p="md">
            <Stack align="center" mb="xl">
                <Title order={2}>3. Assign Your Skills</Title>
                <Text c="dimmed" ta="center" maw={600}>
                    Skills represent the competencies your character has learned. First, assign point values to the groups, then distribute those points to the individual skills.
                </Text>
            </Stack>

            <Paper withBorder p="md" mb="xl">
                <Text ta="center" fw={500}>1. Assign the values 11, 7, and 4 to the Skill groups.</Text>
            </Paper>

            <Stack gap="lg" mb="xl">
                {Object.keys(SKILL_GROUPS).map((group) => (
                    <Group key={group} grow>
                        <Text fw={700} tt="capitalize" ta="right" style={{ flex: 1 }}>{group}</Text>
                        <Group justify="center" style={{ flex: 2 }}>
                            {SKILL_PRIORITIES.map((value) => {
                                const isSelected = skillPointDistribution[group as keyof typeof skillPointDistribution] === value;
                                return (
                                    <Button
                                        key={value}
                                        variant={isSelected ? 'filled' : 'outline'}
                                        onClick={() => handlePriorityChange(group as keyof typeof SKILL_GROUPS, value)}
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

            <Divider my="xl" label="2. Distribute points to individual Skills" labelPosition="center" />

            {/* --- Existing Point Distribution Section --- */}
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
                {Object.entries(SKILL_GROUPS).map(([groupKey, skills]) => {
                    const groupName = groupKey as keyof typeof SKILL_GROUPS;
                    const totalPoints = skillPointDistribution[groupName];
                    const pointsLeft = remainingPoints[groupName];

                    return (
                        <Paper withBorder p="md" key={groupKey}>
                            <Group justify="space-between">
                                <Title order={4} tt="capitalize">{groupName}</Title>
                                <Text fw={700} c={pointsLeft < 0 ? 'red' : 'dimmed'}>
                                    {pointsLeft} / {totalPoints}
                                </Text>
                            </Group>
                            <Stack mt="md" gap="sm">
                                {skills.map(skill => (
                                    <SkillCounter
                                        key={skill}
                                        name={skill}
                                        value={skillPoints[skill.toLowerCase()] || 0}
                                        onUpdate={(newValue) => handleSkillUpdate(skill, newValue)}
                                        canIncrease={pointsLeft > 0}
                                    />
                                ))}
                            </Stack>
                        </Paper>
                    );
                })}
            </SimpleGrid>


        </Box>
    );
};