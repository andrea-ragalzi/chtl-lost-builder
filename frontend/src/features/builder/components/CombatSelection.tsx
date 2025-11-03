import { Box, Title, Group, Stack, TextInput, ActionIcon, Button, Text, Flex, useMantineTheme } from '@mantine/core';
import { IconTrash, IconPlus, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { addCombatItem, removeCombatItem, updateCombatItem, type CombatItem } from '../../../shared/stores/combatSlice';
import type { RootState } from '../../../app/store';

// --- Single Editable Combat Row (Existing Items) ---

const CombatBuilderRow: React.FC<{ item: CombatItem }> = ({ item }) => {
    const dispatch = useAppDispatch();
    const theme = useMantineTheme();

    const handleUpdate = <K extends keyof CombatItem>(field: K, value: CombatItem[K]) => {
        dispatch(updateCombatItem({ id: item.id, [field]: value }));
    };

    const handleRemove = () => {
        if (window.confirm(`Are you sure you want to remove the attack "${item.weaponAttack || 'Untitled Attack'}"?`)) {
            dispatch(removeCombatItem(item.id));
        }
    };

    return (
        <Group
            // wrap="nowrap"  // Rimosso
            gap="xs"
            align="center"
            p="sm"
            style={{
                // Aggiunto stile responsive
                [`@media (maxWidth: ${theme.breakpoints.md}px)`]: {
                    flexDirection: 'column', // Impila gli elementi verticalmente su schermi piccoli
                    alignItems: 'stretch',   // Falli allargare per riempire la larghezza
                },
            }}
        >
            <TextInput
                value={item.weaponAttack}
                onChange={(e) => handleUpdate('weaponAttack', e.currentTarget.value)}
                placeholder="Sword, Pistol, Bite"
                label="Weapon/Attack"
                size="sm"
                style={{
                    // flexBasis: '25%', // Rimosso
                    flexGrow: 1,         // Aggiunto
                }}
            />
            <TextInput
                value={item.dicePool}
                onChange={(e) => handleUpdate('dicePool', e.currentTarget.value)}
                placeholder="DEX + Firearms + 1"
                label="Dice Pool"
                size="sm"
                style={{
                    // flexBasis: '20%', // Rimosso
                    flexGrow: 1,         // Aggiunto
                }}
            />
            <TextInput
                value={item.damage}
                onChange={(e) => handleUpdate('damage', e.currentTarget.value)}
                placeholder="4L, 2B"
                label="Damage"
                size="sm"
                style={{
                    // flexBasis: '10%', // Rimosso
                    flexGrow: 1,         // Aggiunto
                }}
            />
            <TextInput
                value={item.range}
                onChange={(e) => handleUpdate('range', e.currentTarget.value)}
                placeholder="Melee, 10/20"
                label="Range"
                size="sm"
                style={{
                    // flexBasis: '10%', // Rimosso
                    flexGrow: 1,         // Aggiunto
                }}
            />
            <TextInput
                value={item.initiative}
                onChange={(e) => handleUpdate('initiative', e.currentTarget.value)}
                placeholder="+0, -2"
                label="Initiative"
                size="sm"
                style={{
                    // flexBasis: '10%', // Rimosso
                    flexGrow: 1,         // Aggiunto
                }}
            />
            <TextInput
                value={item.size}
                onChange={(e) => handleUpdate('size', e.currentTarget.value)}
                placeholder="1, 3"
                label="Size"
                size="sm"
                style={{
                    // flexBasis: '10%', // Rimosso
                    flexGrow: 1,         // Aggiunto
                }}
            />
            <ActionIcon
                size="md"
                variant="subtle"
                color="red"
                onClick={handleRemove}
                title="Remove Attack"
                mt={20} // Aesthetic alignment with labels
            >
                <IconTrash size={20} />
            </ActionIcon>
        </Group>
    );
};


// --- New Combat Item Add Row (Always Visible) ---

const CombatAddRow: React.FC = () => {
    const dispatch = useAppDispatch();
    const theme = useMantineTheme();

    // State for the new item being entered
    const [newWeaponAttack, setNewWeaponAttack] = useState('');
    const [newDicePool, setNewDicePool] = useState('');
    const [newDamage, setNewDamage] = useState('');
    const [newRange, setNewRange] = useState('');
    const [newInitiative, setNewInitiative] = useState('');
    const [newSize, setNewSize] = useState('');

    const resetFields = () => {
        setNewWeaponAttack('');
        setNewDicePool('');
        setNewDamage('');
        setNewRange('');
        setNewInitiative('');
        setNewSize('');
    };

    const handleAddCombatItem = () => {
        if (!newWeaponAttack.trim()) return;

        dispatch(addCombatItem({
            weaponAttack: newWeaponAttack.trim(),
            dicePool: newDicePool.trim(),
            damage: newDamage.trim(),
            range: newRange.trim(),
            initiative: newInitiative.trim(),
            size: newSize.trim(),
        }));

        resetFields();
    };

    const isConfirmDisabled = !newWeaponAttack.trim();
    const isCancelVisible = newWeaponAttack.trim() || newDicePool.trim() || newDamage.trim() || newRange.trim() || newInitiative.trim() || newSize.trim();

    return (
        <Stack
            gap="xs"
            p="sm"
            style={{
                border: '2px dashed var(--mantine-color-gray-5)',
                borderRadius: '4px',
                marginTop: '15px'
            }}
        >
            <Text fw={500} size="md" c="dimmed">Add New Attack</Text>

            <Group
                // wrap="nowrap"  // Rimosso
                gap="xs"
                style={{
                    // Aggiunto stile responsive
                    [`@media (maxWidth: ${theme.breakpoints.md}px)`]: {
                        flexDirection: 'column', // Impila gli elementi verticalmente su schermi piccoli
                        alignItems: 'stretch',   // Falli allargare per riempire la larghezza
                    },
                }}
            >
                <TextInput
                    value={newWeaponAttack}
                    onChange={(e) => setNewWeaponAttack(e.currentTarget.value)}
                    placeholder="Weapon/Attack"
                    label="Weapon/Attack"
                    size="sm"
                    style={{
                        // flexBasis: '25%', // Rimosso
                        flexGrow: 1,         // Aggiunto
                    }}
                />
                <TextInput
                    value={newDicePool}
                    onChange={(e) => setNewDicePool(e.currentTarget.value)}
                    placeholder="Dice Pool"
                    label="Dice Pool"
                    size="sm"
                    style={{
                        // flexBasis: '20%', // Rimosso
                        flexGrow: 1,         // Aggiunto
                    }}
                />
                <TextInput
                    value={newDamage}
                    onChange={(e) => setNewDamage(e.currentTarget.value)}
                    placeholder="Damage"
                    label="Damage"
                    size="sm"
                    style={{
                        // flexBasis: '10%', // Rimosso
                        flexGrow: 1,         // Aggiunto
                    }}
                />
                <TextInput
                    value={newRange}
                    onChange={(e) => setNewRange(e.currentTarget.value)}
                    placeholder="Range"
                    label="Range"
                    size="sm"
                    style={{
                        // flexBasis: '10%', // Rimosso
                        flexGrow: 1,         // Aggiunto
                    }}
                />
                <TextInput
                    value={newInitiative}
                    onChange={(e) => setNewInitiative(e.currentTarget.value)}
                    placeholder="Initiative Mod"
                    label="Initiative"
                    size="sm"
                    style={{
                        // flexBasis: '10%', // Rimosso
                        flexGrow: 1,         // Aggiunto
                    }}
                />
                <TextInput
                    value={newSize}
                    onChange={(e) => setNewSize(e.currentTarget.value)}
                    placeholder="Size"
                    label="Size"
                    size="sm"
                    style={{
                        // flexBasis: '10%', // Rimosso
                        flexGrow: 1,         // Aggiunto
                    }}
                />
            </Group>

            <Flex justify="flex-end" mt="xs">
                {isCancelVisible && (
                    <Button
                        variant="subtle"
                        leftSection={<IconX size={16} />}
                        onClick={resetFields}
                        color="red"
                        mr="xs"
                    >
                        Cancel
                    </Button>
                )}
                <Button
                    leftSection={<IconPlus size={16} />}
                    onClick={handleAddCombatItem}
                    disabled={isConfirmDisabled}
                >
                    Confirm Add
                </Button>
            </Flex>
        </Stack>
    );
};


// --- Main Combat Builder Section ---

export const CombatSelection: React.FC = () => {
    // Corrected state path: state.character.combat
    const combatItems = useAppSelector((state: RootState) => state.character.combat);

    return (
        <Box>
            <Title order={3} mb="sm">COMBAT</Title>

            <Stack gap="md" mb="md">
                {combatItems.length === 0 && (
                    <Text c="dimmed" size="sm">No attacks tracked.</Text>
                )}
                {/* Display existing Combat Items */}
                {combatItems.map((item: CombatItem) => (
                    <CombatBuilderRow key={item.id} item={item} />
                ))}
            </Stack>

            {/* Always display the Add Row at the bottom */}
            <CombatAddRow />
        </Box>
    );
};