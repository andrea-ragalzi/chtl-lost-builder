import { Box, Title, Text, Stack, Button, Group, SimpleGrid, Paper, ActionIcon } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { setSkillPoints, setSkillPriority } from '../../../shared/stores/skillSlice';
import { SKILL_GROUPS } from '../../../shared/data/skillData';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import { useMemo } from 'react';

const SKILL_PRIORITIES = [11, 7, 4];



// A helper component for a single skill row with a counter
const SkillCounter = ({ name, value, onUpdate, canIncrease }: { name: string, value: number, onUpdate: (newValue: number) => void, canIncrease: boolean }) => {
    return (
        <Group justify="space-between">
            <Text>{name}</Text>
            <Group gap="xs" align="center">
                <ActionIcon size="sm" onClick={() => onUpdate(value - 1)} disabled={value <= 0}>
                    <IconMinus size={14} />
                </ActionIcon>
                <Text w={20} ta="center" fw={700}>{value}</Text>
                <ActionIcon size="sm" onClick={() => onUpdate(value + 1)} disabled={value >= 3 || !canIncrease}>
                    <IconPlus size={14} />
                </ActionIcon>
            </Group>
        </Group>
    );
};

export const SkillSelection = () => {
    const dispatch = useAppDispatch();
    const { priorities: skillPointDistribution, points: skillPoints } = useAppSelector((state) => state.character.skills);

    const resetSkills = () => {
        Object.keys(SKILL_GROUPS).forEach(groupKey => {
            SKILL_GROUPS[groupKey as keyof typeof SKILL_GROUPS].forEach(skill => {
                dispatch(setSkillPoints({ skill, value: 0 }));
            });
        });
    };

    const handlePriorityChange = (group: keyof typeof SKILL_GROUPS, value: number) => {
        resetSkills();
        dispatch(setSkillPriority({ group, value }));
    };

    const handleSkillUpdate = (skill: string, value: number) => {
        dispatch(setSkillPoints({ skill, value }));
    };

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

            <Stack gap="lg" mb="xl">
                {Object.keys(SKILL_GROUPS).map((group) => (
                    <Group key={group} >
                        <Text fw={700} tt="capitalize" ta="left" style={{ flex: 1 }}>{group}</Text>
                        <Group justify="right" style={{ flex: 2 }}>
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

            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
                {Object.entries(SKILL_GROUPS).map(([groupKey, skills]) => {
                    const groupName = groupKey as keyof typeof SKILL_GROUPS;
                    const totalPoints = skillPointDistribution[groupName];
                    const pointsLeft = remainingPoints[groupName];

                    return (
                        <Paper withBorder p="md" key={groupKey}>
                            <Title order={4} tt="capitalize">{groupKey}</Title>
                            <Text size="sm" c={pointsLeft < 0 ? 'red' : 'green'}>Used: {totalPoints - pointsLeft} / Remaining: {pointsLeft}</Text>
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