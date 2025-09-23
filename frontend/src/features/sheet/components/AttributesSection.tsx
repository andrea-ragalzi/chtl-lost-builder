import { Paper, Title, Stack, Grid } from '@mantine/core';
import { DotRating } from './DotRating';

interface AttributesProps {
    attributes: {
        power: { intelligence: number; wits: number; resolve: number };
        finesse: { strength: number; dexterity: number; stamina: number };
        resistance: { presence: number; manipulation: number; composure: number };
    };
}

export const AttributesSection = ({ attributes }: AttributesProps) => (
    <Paper withBorder p="md">
        <Title order={4} ta="center" tt="uppercase">Attributes</Title>
        <Grid mt="sm">
            {/* Modifica qui: usa l'oggetto responsivo per lo span */}
            <Grid.Col span={{ base: 12, md: 4 }}>
                <Title order={6}>POWER</Title>
                <Stack gap="xs" mt="xs">
                    <DotRating label="Intelligence" rating={attributes.power.intelligence} />
                    <DotRating label="Wits" rating={attributes.power.wits} />
                    <DotRating label="Resolve" rating={attributes.power.resolve} />
                </Stack>
            </Grid.Col>
            {/* Modifica qui: usa l'oggetto responsivo per lo span */}
            <Grid.Col span={{ base: 12, md: 4 }}>
                <Title order={6}>FINESSE</Title>
                <Stack gap="xs" mt="xs">
                    <DotRating label="Strength" rating={attributes.finesse.strength} />
                    <DotRating label="Dexterity" rating={attributes.finesse.dexterity} />
                    <DotRating label="Stamina" rating={attributes.finesse.stamina} />
                </Stack>
            </Grid.Col>
            {/* Modifica qui: usa l'oggetto responsivo per lo span */}
            <Grid.Col span={{ base: 12, md: 4 }}>
                <Title order={6}>RESISTANCE</Title>
                <Stack gap="xs" mt="xs">
                    <DotRating label="Presence" rating={attributes.resistance.presence} />
                    <DotRating label="Manipulation" rating={attributes.resistance.manipulation} />
                    <DotRating label="Composure" rating={attributes.resistance.composure} />
                </Stack>
            </Grid.Col>
        </Grid>
    </Paper>
);