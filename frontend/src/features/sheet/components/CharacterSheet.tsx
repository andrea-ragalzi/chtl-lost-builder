import React, { useCallback } from 'react';
import { useAppSelector } from '../../../shared/hooks/hooks';
import { initialCharacter } from '../data/characterSheetData';
import { type CharacterSheetType } from '../types/characterSheetType';
import { AttributesSection } from './AttributesSection';
import { SkillsSection } from './SkillsSection';
import { StatusTrack } from './StatusTrack';
import { Container, Grid, Button, TextInput, Paper, Stack, Text } from '@mantine/core';

// Utility per aggiornare lo stato annidato in modo immutabile
const setNestedValue = (obj: unknown, path: string, value: unknown) => {
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    const newObj = JSON.parse(JSON.stringify(obj)); // Deep copy for simplicity
    let current = newObj;
    for (const key of keys) {
        current = current[key];
    }
    current[lastKey] = value;
    return newObj;
};

export const CharacterSheet: React.FC = () => {
    const character = useAppSelector((state) => state.builder);

    const handleUpdate = useCallback((path: string, value: unknown) => {
        // setCharacter(prev => setNestedValue(prev, path, value));
    }, []);

    // --- Calculated Values ---
    const health = (character.attributes.priorities.physical || 0) + 7;
    const willpower = (character.attributes.priorities.mental || 0) + (character.attributes.priorities.social || 0);
    const speed = (character.attributes.priorities.physical || 0) + (character.attributes.priorities.physical || 0); // Placeholder, needs specific attributes
    const defense = (character.attributes.priorities.mental || 0) + (character.skills.points.athletics || 0); // Placeholder
    const initiative = (character.attributes.priorities.physical || 0) + (character.attributes.priorities.social || 0); // Placeholder

    const handlePrint = () => window.print();

    return (
        <Container fluid p="md">
            <Paper p="lg" shadow="sm">
                {/* --- HEADER --- */}
                <Grid>
                    <Grid.Col span={4}><TextInput label="NAME" defaultValue={character.concept.durance} /></Grid.Col>
                    <Grid.Col span={4}><TextInput label="PLAYER" /></Grid.Col>
                    <Grid.Col span={4}><TextInput label="CHRONICLE" /></Grid.Col>
                    <Grid.Col span={4}><TextInput label="NEEDLE" defaultValue={character.concept.lifeBefore} /></Grid.Col>
                    <Grid.Col span={4}><TextInput label="THREAD" defaultValue={character.concept.escape} /></Grid.Col>
                    <Grid.Col span={4}><TextInput label="CONCEPT" defaultValue={character.concept.durance} /></Grid.Col>
                    <Grid.Col span={4}><TextInput label="SEEMING" defaultValue={character.seeming.selected || ''} /></Grid.Col>
                    <Grid.Col span={4}><TextInput label="KITH" defaultValue={character.kith.selected || ''} /></Grid.Col>
                    <Grid.Col span={4}><TextInput label="COURT" /></Grid.Col>
                </Grid>

                <Grid mt="lg">
                    {/* --- LEFT COLUMN (PAGE 1) --- */}
                    <Grid.Col span={{ base: 12, md: 7 }}>
                        <Stack>
                            <AttributesSection attributes={{
                                power: { intelligence: character.attributes.priorities.mental, wits: character.attributes.priorities.mental, resolve: character.attributes.priorities.mental },
                                finesse: { strength: character.attributes.priorities.physical, dexterity: character.attributes.priorities.physical, stamina: character.attributes.priorities.physical },
                                resistance: { presence: character.attributes.priorities.social, manipulation: character.attributes.priorities.social, composure: character.attributes.priorities.social }
                            }} />
                            <SkillsSection skills={character.skills.points} specialties={character.specialties.specialties} />
                            {/* Merits Section would go here */}
                        </Stack>
                    </Grid.Col>

                    {/* --- RIGHT COLUMN (PAGE 2) --- */}
                    <Grid.Col span={{ base: 12, md: 5 }}>
                        <Stack>
                            <Paper withBorder p="md">
                                <Stack>
                                    <StatusTrack label="HEALTH" count={health} />
                                    <StatusTrack label="WILLPOWER" count={willpower} />
                                    <StatusTrack label="GLAMOUR" count={10} />
                                    <StatusTrack label="CLARITY" count={7} />
                                </Stack>
                            </Paper>
                            <Paper withBorder p="md">
                                <Text>Size: 5</Text>
                                <Text>Speed: {speed}</Text>
                                <Text>Defense: {defense}</Text>
                                <Text>Initiative: {initiative}</Text>
                            </Paper>
                            {/* Aspirations, Conditions, etc. would go here */}
                        </Stack>
                    </Grid.Col>
                </Grid>

                <Button fullWidth mt="xl" onClick={handlePrint}>Print Character Sheet</Button>
            </Paper>
        </Container>
    );
};