import { Box, Title, Text, Stack, TextInput } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { updateConcept } from '../../../shared/stores/conceptSlice';
import { useDebouncedCallback } from '@mantine/hooks';

export const ConceptSelection = () => {
    const dispatch = useAppDispatch();
    const conceptState = useAppSelector((state) => state.character.concept);

    // Debounced dispatch to avoid updating the store on every keystroke
    const debouncedDispatch = useDebouncedCallback((payload: { name: string, value: string }) => {
        dispatch(updateConcept({ [payload.name]: payload.value }));
    }, 300);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        debouncedDispatch({ name, value });
    };

    return (
        <Box p="md">
            <Stack align="center" mb="xl">
                <Title order={2}>Create Your Character</Title>
                <Text c="dimmed" ta="left" maw={500}>
                    Your journey begins with a story. Think about who you were and how you became one of the Lost. Answer these questions to bring your character to life.
                </Text>
            </Stack>

            <Stack gap="lg">
                <TextInput
                    name="lifeBefore"
                    label="1. Who were you before?"
                    description="Briefly describe your character's life before they were abducted."
                    placeholder="I was an artist, a student, a factory worker..."
                    defaultValue={conceptState.lifeBefore}
                    onChange={handleChange}
                />
                <TextInput
                    name="durance"
                    label="2. What kind of durance did you endure?"
                    description="Consider your role in Arcadia. This will influence your Seeming and Kith."
                    placeholder="I was a toy, a servant, a warrior..."
                    defaultValue={conceptState.durance}
                    onChange={handleChange}
                />
                <TextInput
                    name="escape"
                    label="3. How did you escape?"
                    description="Your escape defines your character. Think about the event that brought you home."
                    placeholder="I ran away, I outsmarted them, I rebelled..."
                    defaultValue={conceptState.escape}
                    onChange={handleChange}
                />
            </Stack>

            {/* The navigation button can be part of the parent layout */}
            {/* 
            <Group justify="flex-end" mt="xl">
                <Button>Next: Choose Seeming</Button>
            </Group> 
            */}
        </Box>
    );
};