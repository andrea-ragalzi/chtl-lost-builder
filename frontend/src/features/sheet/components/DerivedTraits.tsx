import { Paper, Title, Grid, Text } from '@mantine/core';
import { useAppSelector } from '../../../shared/hooks/hooks';
import { HealthTrack } from './HealthTrack';
import { WillpowerTrack } from './WillpowerTrack'; // Importa il componente WillpowerTrack

export const DerivedTraits = () => {
    // Leggi gli attributi e le abilità dallo store
    const { attributes, skills } = useAppSelector((state) => state.character);
    const individualAttributes = attributes.individual;
    const individualSkills = skills.points;

    // Calcola i tratti derivati in base alle formule
    const baseSize = 5;
    const health = individualAttributes.stamina + baseSize;
    const initiative = individualAttributes.dexterity + individualAttributes.composure;
    const speed = individualAttributes.strength + individualAttributes.dexterity + 5;
    const defense = Math.min(individualAttributes.wits, individualAttributes.dexterity) + individualSkills.athletics;
    const armor = 0;

    return (
        <Paper withBorder p="md">
            <Title order={4} ta="center" mb="sm">Derived Traits</Title>
            <Grid>
                <Grid.Col span={6}>
                    <Text fw={500}>Health:</Text>
                    <HealthTrack health={health} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Text fw={500}>Willpower:</Text>
                    <WillpowerTrack />
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