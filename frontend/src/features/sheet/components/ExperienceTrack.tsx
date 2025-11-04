import { Group, Paper, Text, ActionIcon, Box } from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { addBeat, removeBeat, addExperience, removeExperience } from '../../../shared/stores/experienceSlice';
import { DotRating } from './DotRating';

export const ExperienceTrack = () => {
    const dispatch = useAppDispatch();
    const { beats, experiences } = useAppSelector((state) => state.character.experience);
    const lastClickRef = useRef<number>(0);
    const DEBOUNCE_TIME = 150; // milliseconds

    const handleBeatsChange = (newValue: number) => {
        if (newValue > beats) {
            dispatch(addBeat());
        } else if (newValue < beats) {
            dispatch(removeBeat());
        }
    };

    const handleExperienceChange = (action: () => void) => {
        const now = Date.now();
        if (now - lastClickRef.current < DEBOUNCE_TIME) {
            return;
        }
        lastClickRef.current = now;
        action();
    };

    return (
        <Paper p="md" mb="md" withBorder>
            <Group align="flex-start" wrap="nowrap" gap="xl">
                {/* Beats Section */}
                <Box style={{ flex: 1 }}>
                    <Group justify="space-between" mb="xs">
                        <Text fw={700} size="sm">Beats</Text>
                        <Text size="xs" c="dimmed">{beats} / 5</Text>
                    </Group>

                    <DotRating
                        rating={beats}
                        max={5}
                        onChange={handleBeatsChange}
                    />

                    <Text size="xs" c="dimmed" mt="xs" style={{ fontStyle: 'italic' }}>
                        *5 Beats = 1 Experience
                    </Text>
                </Box>

                {/* Experiences Section */}
                <Box style={{ flex: 1 }}>
                    <Text fw={700} size="sm" mb="xs">Experience</Text>

                    <Group gap="xs" align="center">
                        <ActionIcon
                            size="lg"
                            variant="filled"
                            color="red"
                            onClick={() => handleExperienceChange(() => dispatch(removeExperience()))}
                            disabled={experiences === 0}
                        >
                            <IconMinus size={18} />
                        </ActionIcon>

                        <Box
                            style={{
                                flex: 1,
                                textAlign: 'center',
                                padding: '5px',
                                border: '1px solid var(--mantine-color-gray-7)',
                                borderRadius: 'var(--mantine-radius-sm)',
                            }}
                        >
                            <Text size="md" fw={500}>{experiences}</Text>
                        </Box>

                        <ActionIcon
                            size="lg"
                            variant="filled"
                            color="green"
                            onClick={() => handleExperienceChange(() => dispatch(addExperience()))}
                        >
                            <IconPlus size={18} />
                        </ActionIcon>
                    </Group>

                </Box>
            </Group>
        </Paper>
    );
};