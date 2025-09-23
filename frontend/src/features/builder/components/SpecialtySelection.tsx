import { Box, Title, Text, Stack, TextInput, Paper } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { setSpecialty } from '../stores/specialtySlice';
import { useMemo } from 'react';
import { useDebouncedCallback } from '@mantine/hooks';

export const SpecialtySelection = () => {
    const dispatch = useAppDispatch();
    const skillPoints = useAppSelector((state) => state.builder.skills.points);
    const specialties = useAppSelector((state) => state.builder.specialties.specialties);

    // Find all skills with a rating of 3
    const eligibleSkills = useMemo(() => {
        return Object.entries(skillPoints)
            .filter(([, rating]) => rating === 3)
            .map(([skillName]) => skillName);
    }, [skillPoints]);

    // Debounce the dispatch to avoid updating the store on every keystroke
    const debouncedUpdate = useDebouncedCallback((skill: string, text: string) => {
        dispatch(setSpecialty({ skill, text }));
    }, 300);

    return (
        <Box p="md">
            <Stack align="center" mb="xl">
                <Title order={2}>4. Choose Your Skill Specialties</Title>
                <Text c="dimmed" ta="center" maw={600}>
                    Specialties represent an area of exceptional talent within a Skill. For every Skill you assigned a rating of 3 in the previous step, you get to choose one free Specialty.
                </Text>
            </Stack>

            <Paper withBorder p="lg">
                <Stack>
                    {eligibleSkills.length > 0 ? (
                        eligibleSkills.map(skill => (
                            <TextInput
                                key={skill}
                                label={`${skill.charAt(0).toUpperCase() + skill.slice(1)}`}
                                placeholder="e.g., Parkour, Forgery, Bedside Manner..."
                                defaultValue={specialties[skill] || ''}
                                onChange={(event) => debouncedUpdate(skill, event.currentTarget.value)}
                            />
                        ))
                    ) : (
                        <Text ta="center" c="dimmed">
                            You have no skills rated at 3. Go back to the previous step if you want to assign specialties.
                        </Text>
                    )}
                </Stack>
            </Paper>


        </Box>
    );
};