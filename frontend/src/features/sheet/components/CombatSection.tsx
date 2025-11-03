import { Box, Title, Text, Table, Stack, Grid, Paper } from '@mantine/core';
import React from 'react';
import { useAppSelector } from '../../../shared/hooks/hooks';
import type { RootState } from '../../../app/store';
import type { CombatItem } from '../../../shared/stores/combatSlice';



const HEADER_WIDTH = 120;

const COMBAT_COLUMNS_METADATA = {
    'weaponAttack': { label: 'Weapon/Attack', desktopSpan: 2 },
    'dicePool': { label: 'Dice Pool', desktopSpan: 4 },
    'damage': { label: 'Damage', desktopSpan: 1 },
    'range': { label: 'Range', desktopSpan: 2 },
    'initiative': { label: 'Initiative', desktopSpan: 1 },
    'size': { label: 'Size', desktopSpan: 1 }
} as const;


export const CombatSection: React.FC = () => {
    const { attributes, skills } = useAppSelector((state) => state.character);
    const individualAttributes = attributes.individual;
    const individualSkills = skills.points;
    const combatItems = useAppSelector((state: RootState) => state.character.combat);


    const initiative = individualAttributes.dexterity + individualAttributes.composure;
    const speed = individualAttributes.strength + individualAttributes.dexterity + 5;
    const defense = Math.min(individualAttributes.wits, individualAttributes.dexterity) + individualSkills.athletics;
    const armor = 0;

    if (combatItems.length === 0) {
        return (
            <Box>
                <Title order={3} mb="sm">COMBAT</Title>
                <Text c="dimmed" size="sm" pt="md">No attacks tracked. Add new attacks in the Builder.</Text>
            </Box>
        );
    }

    const rows = combatItems.map((item: CombatItem) => (
        <Table.Tr key={item.id}>
            <Table.Td>{item.weaponAttack}</Table.Td>
            <Table.Td>{item.dicePool}</Table.Td>
            <Table.Td>{item.damage}</Table.Td>
            <Table.Td>{item.range}</Table.Td>
            <Table.Td>{item.initiative}</Table.Td>
            <Table.Td>{item.size}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Box>
            <Box w="100%" mb="md">
                <Grid gutter="xs">
                    <Grid.Col span={{ base: 6, xs: 3 }} py={0}>
                        <Paper p="xs" withBorder style={{ overflow: 'hidden' }}>
                            <Text fw={500} mb="xs" size="sm">Initiative: {initiative}</Text>
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={{ base: 6, xs: 3 }} py={0}>
                        <Paper p="xs" withBorder style={{ overflow: 'hidden' }}>
                            <Text fw={500} mb="xs" size="sm">Speed: {speed}</Text>

                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={{ base: 6, xs: 3 }} py={0}>
                        <Paper p="xs" withBorder style={{ overflow: 'hidden' }}>
                            <Text fw={500} mb="xs" size="sm">Defense: {defense}</Text>
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={{ base: 6, xs: 3 }} py={0}>
                        <Paper p="xs" withBorder style={{ overflow: 'hidden' }}>
                            <Text fw={500} mb="xs" size="sm">Armor: {armor}</Text>
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Box>
            {/* Desktop Layout (Horizontal Table) - Visible from “sm” upwards */}
            <Table
                layout="fixed"
                style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
                withTableBorder
                striped
                highlightOnHover
                visibleFrom='sm'>
                <Table.Thead>
                    <Table.Tr>
                        {Object.values(COMBAT_COLUMNS_METADATA).map((column) => (
                            <Table.Th key={column.label} style={{ width: `${(column.desktopSpan / 12) * 100}%` }}>{column.label}</Table.Th>
                        ))}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>


            {/* Mobile Layout (Vertical Table Stack) - Hidden from “sm” upwards */}
            <Stack>
                {combatItems.map((item: CombatItem) => (
                    <Table
                        variant="vertical"
                        layout='fixed'
                        style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
                        withTableBorder
                        key={item.id}
                        hiddenFrom='sm'>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Th w={HEADER_WIDTH}>{COMBAT_COLUMNS_METADATA.weaponAttack.label}</Table.Th>
                                <Table.Td>{item.weaponAttack}</Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th w={HEADER_WIDTH}>{COMBAT_COLUMNS_METADATA.dicePool.label}</Table.Th>
                                <Table.Td>{item.dicePool}</Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th w={HEADER_WIDTH}>{COMBAT_COLUMNS_METADATA.damage.label}</Table.Th>
                                <Table.Td>{item.damage}</Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th w={HEADER_WIDTH}>{COMBAT_COLUMNS_METADATA.range.label}</Table.Th>
                                <Table.Td>{item.range}</Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th w={HEADER_WIDTH}>{COMBAT_COLUMNS_METADATA.initiative.label}</Table.Th>
                                <Table.Td>{item.initiative}</Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th w={HEADER_WIDTH}>{COMBAT_COLUMNS_METADATA.size.label}</Table.Th>
                                <Table.Td>{item.size}</Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                ))}
            </Stack>
        </Box>
    );
}