import { Group, Text, ActionIcon, Box, Fieldset } from '@mantine/core';
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
        <Box mb="md">
            <Group align="flex-start" wrap="nowrap" gap={0}>
                <Fieldset
                    legend="Beats"
                    style={{
                        flex: 1,
                        borderRight: 'none',
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        margin: 0,
                        minHeight: '110px'
                    }}
                >
                    <DotRating
                        rating={beats}
                        max={5}
                        onChange={handleBeatsChange}
                    />

                    <Text size="xs" c="dimmed" mt="xs" style={{ fontStyle: 'italic' }}>
                        *5 Beats = 1 Experience
                    </Text>
                </Fieldset>

                <Fieldset
                    legend="Experience"
                    style={{
                        flex: 1,
                        borderLeft: 'none',
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        margin: 0,
                        minHeight: '110px'
                    }}
                >
                    <Group gap="xs" align="center" wrap="nowrap">
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
                                padding: '8px',
                                border: '1px solid var(--mantine-color-gray-4)',
                                borderRadius: 'var(--mantine-radius-sm)',
                                minHeight: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
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
                </Fieldset>
            </Group>
        </Box>
    );
};