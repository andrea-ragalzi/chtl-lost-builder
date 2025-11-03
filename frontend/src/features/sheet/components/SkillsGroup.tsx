import { Title, Stack, Group, Grid, Divider } from '@mantine/core';
import { DotRating } from './DotRating';
import { useAppDispatch } from '../../../shared/hooks/hooks';
import { setSkillPoints } from '../../../shared/stores/skillSlice';

interface SkillsGroupProps {
    groupKey: string;
    skills: string[];
    individual: Record<string, number>;
    specialties: Record<string, string | undefined>; // Permetti che le specialty siano undefined
}

export const SkillsGroup = ({ groupKey, skills, individual, specialties }: SkillsGroupProps) => {
    const dispatch = useAppDispatch();

    const handleSkillUpdate = (skill: string, newValue: number) => {
        dispatch(setSkillPoints({ skill, value: newValue }));
    };

    // Divide le skill in due colonne
    const skillsColumn1 = skills.slice(0, Math.ceil(skills.length / 2));
    const skillsColumn2 = skills.slice(Math.ceil(skills.length / 2));

    return (
        <>
            <Group justify="space-between" align="center">
                <Title order={4} tt="capitalize">{groupKey} Skills</Title>
            </Group>
            <Divider size="md" mb="xs" />
            <Grid mt="xs">
                <Grid.Col span={6}>
                    <Stack gap="xs">
                        {skillsColumn1.map(skill => {
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
                </Grid.Col>
                <Grid.Col span={6}>
                    <Stack gap="xs">
                        {skillsColumn2.map(skill => {
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
                </Grid.Col>
            </Grid>
        </>
    );
};