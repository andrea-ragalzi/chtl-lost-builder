import { Title, Stack, Group, Text } from '@mantine/core';
import { DotRating } from './DotRating';
import { useAppDispatch } from '../../../shared/hooks/hooks';
import { setSkillPoints } from '../../../shared/stores/skillSlice';

interface SkillsGroupProps {
    groupKey: string;
    skills: string[];
    individual: Record<string, number>;
    priority: number;
    specialties: Record<string, string | undefined>; // Permetti che le specialty siano undefined
}

export const SkillsGroup = ({ groupKey, skills, individual, priority, specialties }: SkillsGroupProps) => {
    const dispatch = useAppDispatch();

    const handleSkillUpdate = (skill: string, newValue: number) => {
        dispatch(setSkillPoints({ skill, value: newValue }));
    };

    return (
        <>
            <Group justify="space-between" align="center">
                <Title order={6} tt="capitalize">{groupKey}</Title>
                <Text size="sm" c="dimmed">({priority} )</Text>
            </Group>
            <Stack gap="xs" mt="xs">
                {skills.map(skill => {
                    const specialty = specialties[skill];
                    const label = typeof specialty === 'string' ? `${skill} (${specialty})` : skill;

                    return (
                        <DotRating
                            key={skill}
                            label={label}
                            rating={individual[skill]}
                            max={5}
                            onChange={(value: number) => handleSkillUpdate(skill, value)}
                        />
                    );
                })}
            </Stack>
        </>
    );
};