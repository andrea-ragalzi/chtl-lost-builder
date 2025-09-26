import { Paper, Title, Grid, Text } from '@mantine/core';
import { useAppSelector, useAppDispatch } from '../../../shared/hooks/hooks';
import { DotRating } from './DotRating';
import { HealthTrack } from './HealthTrack'; // Importa il componente HealthTrack
import { setMaxHealth } from '../../../shared/stores/healthTrackSlice';

export const DerivedTraits = () => {
    // Leggi gli attributi e le abilità dallo store
    const { attributes, skills } = useAppSelector((state) => state.character);
    const primaryAttributes = attributes.individual;
    const skillPoints = skills.points;
    const dispatch = useAppDispatch();

    // Calcola i tratti derivati in base alle formule
    const baseSize = 5; // Dimensione base per gli umani
    const health = primaryAttributes.stamina + baseSize; // Calcola la salute correttamente
    dispatch(setMaxHealth(health));

    const willpower = primaryAttributes.resolve + primaryAttributes.composure;
    const initiative = primaryAttributes.dexterity + primaryAttributes.wits;
    const speed = primaryAttributes.strength + 5;
    const defense = Math.min(primaryAttributes.wits, primaryAttributes.dexterity) + (skillPoints.athletics || 0);
    const armor = 0; // Armatura non è un attributo, ma un valore fisso iniziale

    return (
        <Paper withBorder p="md">
            <Title order={4} ta="center" mb="sm">Derived Traits</Title>
            <Grid>
                <Grid.Col span={6}>
                    <Text fw={500}>Health:</Text>
                    <HealthTrack health={health} /> {/* Usa il componente HealthTrack */}
                </Grid.Col>
                <Grid.Col span={6}>
                    <Text fw={500}>Willpower:</Text>
                    <DotRating label='' rating={willpower} max={10} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Text fw={500}>Initiative:</Text>
                    <Text>{initiative}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Text fw={500}>Speed:</Text>
                    <Text>{speed}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Text fw={500}>Defense:</Text>
                    <Text>{defense}</Text>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Text fw={500}>Armor:</Text>
                    <Text>{armor}</Text>
                </Grid.Col>
            </Grid>
        </Paper>
    );
};