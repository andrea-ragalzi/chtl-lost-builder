import { Paper, Grid, TextInput, Stack, Title } from '@mantine/core';
import { useAppSelector } from '../../../shared/hooks/hooks';

const capitalize = (s: string | null) => {
    if (s === null) return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export const CharacterDetails = () => {
    const character = useAppSelector((state) => state.character);

    return (
        <Paper withBorder p="md">
            <Title order={4} ta="center" mb="sm">Character Details</Title>
            <Stack>
                <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput label="Name" value={character.characterDetails.name} readOnly />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput label="Player" value={character.characterDetails.player} readOnly />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        {/* Gestisci il valore nullo del seeming */}
                        <TextInput label="Seeming" value={capitalize(character.seeming.selected)} readOnly />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        {/* Gestisci il valore nullo del kith */}
                        <TextInput label="Kith" value={capitalize(character.kith.selected)} readOnly />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput label="Court" value={character.characterDetails.court} readOnly />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput label="Chronicle" value={character.characterDetails.chronicle} readOnly />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <TextInput label="Concept" value={character.characterDetails.concept} readOnly />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput label="Needle" value={character.characterDetails.needle} readOnly />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput label="Thread" value={character.characterDetails.thread} readOnly />
                    </Grid.Col>
                </Grid>
            </Stack>
        </Paper>
    );
};