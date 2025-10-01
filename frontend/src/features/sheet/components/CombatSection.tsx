// src/features/sheet/tracking/combat/CombatSheetSection.tsx
import { Box, Title, Stack, Text, Grid, Badge } from '@mantine/core';
import React from 'react';
import { useAppSelector } from '../../../shared/hooks/hooks';
import type { RootState } from '../../../app/store';
import { type CombatItem } from '../../../shared/stores/combatSlice'; 

// --- Single Read-Only Combat Item Display ---

const CombatSheetRow: React.FC<{ item: CombatItem }> = ({ item }) => {
    
    // NOTA: Qui potresti aggiungere la logica interattiva per il Dice Roller in futuro.
    
    return (
        <Grid columns={12} align="center" py={4} px="xs" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
            
            {/* Weapon/Attack Name (Full Width on Small Screens) */}
            <Grid.Col span={{ base: 12, sm: 4 }}>
                <Text fw={600} size="sm" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.weaponAttack || 'Untitled Attack'}
                </Text>
            </Grid.Col>

            {/* Dice Pool (Clickable Area for Dice Roll) */}
            <Grid.Col span={{ base: 6, sm: 3 }}>
                <Badge variant="light" color="blue" fullWidth size="lg" style={{ cursor: 'pointer' }} title={`Roll Dice: ${item.dicePool}`}>
                    {item.dicePool || 'N/A'}
                </Badge>
            </Grid.Col>

            {/* Damage, Range, Initiative, Size (Fixed Width Columns) */}
            
            <Grid.Col span={{ base: 3, sm: 1 }}>
                <Text size="sm" ta="center" title="Damage">{item.damage || '-'}</Text>
            </Grid.Col>
            
            <Grid.Col span={{ base: 3, sm: 2 }}>
                <Text size="sm" ta="center" title="Range">{item.range || 'Melee'}</Text>
            </Grid.Col>
            
            <Grid.Col span={1} hiddenFrom="sm"> {/* Spacer for small screens */}
                {/* Empty */}
            </Grid.Col>

            <Grid.Col span={{ base: 3, sm: 1 }}>
                <Text size="sm" ta="center" title="Initiative">{item.initiative || '0'}</Text>
            </Grid.Col>
            
            <Grid.Col span={{ base: 3, sm: 1 }}>
                <Text size="sm" ta="center" title="Size">{item.size || '1'}</Text>
            </Grid.Col>

        </Grid>
    );
};


// --- Main Combat Sheet Section (Container) ---

export const CombatSection: React.FC = () => {
    // Access the combat slice from the state
    const combatItems = useAppSelector((state: RootState) => state.character.combat); 

    const labels = [
        { label: 'Weapon/Attack', span: { base: 12, sm: 4 } },
        { label: 'Dice Pool', span: { base: 6, sm: 3 } },
        { label: 'Dmg', span: { base: 3, sm: 1 }, align: 'center' as const },
        { label: 'Range', span: { base: 3, sm: 2 }, align: 'center' as const },
        { label: 'Init.', span: { base: 3, sm: 1 }, align: 'center' as const },
        { label: 'Size', span: { base: 3, sm: 1 }, align: 'center' as const },
    ];
    
    return (
        <Box>
            <Title order={3} mb="sm">COMBAT</Title>

            {combatItems.length === 0 ? (
                <Text c="dimmed" size="sm">No combat attacks defined. Use the Builder section to add them.</Text>
            ) : (
                <Stack gap="xs">
                    {/* Header Row */}
                    <Grid columns={12} align="center" style={{ borderBottom: '2px solid var(--mantine-color-dark-4)' }} pb={4}>
                        {labels.map((col, index) => (
                            <Grid.Col key={index} span={col.span} ta={col.align || 'left'} pb={0}>
                                <Text fw={700} size="xs" c="dark.3">{col.label}</Text>
                            </Grid.Col>
                        ))}
                    </Grid>

                    {/* Combat Rows */}
                    {combatItems.map((item: CombatItem) => (
                        <CombatSheetRow key={item.id} item={item} />
                    ))}
                </Stack>
            )}
        </Box>
    );
};