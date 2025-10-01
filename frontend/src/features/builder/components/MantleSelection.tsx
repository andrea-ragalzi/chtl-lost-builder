import { Box, Title, Group, Stack, TextInput, ActionIcon, Button, Flex, Text } from '@mantine/core';
import { IconTrash, IconPlus, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import type { RootState } from '../../../app/store';
import { MeritInput } from './MeritInput'; // Assuming MeritInput is available
import {
    addMantle,
    removeMantle,
    updateMantle,
    type MantleItem
} from '../../../shared/stores/mantleSlice';

// --- 1. Single Editable Mantle Row (For Existing Items) ---

const MantleBuilderRow: React.FC<{ mantle: MantleItem }> = ({ mantle }) => {
    const dispatch = useAppDispatch();

    const handleUpdate = <K extends keyof MantleItem>(field: K, value: MantleItem[K]) => {
        dispatch(updateMantle({ id: mantle.id, [field]: value }));
    };

    const handleRemove = () => {
        if (window.confirm(`Are you sure you want to remove the Mantle "${mantle.court || 'No Court'}"?`)) {
            dispatch(removeMantle(mantle.id));
        }
    };

    return (
        <Stack gap="xs" p="sm" style={{ border: '1px solid var(--mantine-color-gray-3)', borderRadius: '4px' }}>
            <Group justify="flex-end">
                <ActionIcon
                    size="md"
                    variant="subtle"
                    color="red"
                    onClick={handleRemove}
                    title="Remove Mantle"
                >
                    <IconTrash size={20} /> {/* Added Trash icon */}
                </ActionIcon>
            </Group>

            <Group grow wrap="nowrap" gap="xs">
                <TextInput
                    value={mantle.court}
                    onChange={(e) => handleUpdate('court', e.currentTarget.value)}
                    placeholder="Court Name"
                    label="Court"
                    size="sm"
                />
                <MeritInput
                    type="number"
                    label="Level"
                    placeholder="1-5"
                    min={0}
                    max={5}
                    value={mantle.level}
                    onChange={(value) => handleUpdate('level', value)}
                />
            </Group>
            <MeritInput
                type="textarea"
                label="Benefit"
                placeholder="Effect of the Mantle at this level..."
                value={mantle.benefit}
                onChange={(value) => handleUpdate('benefit', value)}
                rows={2}
            />
            <MeritInput
                type="textarea"
                label="Drawback"
                placeholder="Mantle's penalty/drawback..."
                value={mantle.drawback}
                onChange={(value) => handleUpdate('drawback', value)}
                rows={2}
            />
        </Stack>
    );
};

// --- 2. New Mantle Add Row (Always Visible) ---

const MantleAddRow: React.FC = () => {
    const dispatch = useAppDispatch();
    
    // State for the new item being entered
    const [newCourt, setNewCourt] = useState('');
    const [newLevel, setNewLevel] = useState<number>(1);
    const [newBenefit, setNewBenefit] = useState('');
    const [newDrawback, setNewDrawback] = useState('');

    const resetFields = () => {
        setNewCourt('');
        setNewLevel(1);
        setNewBenefit('');
        setNewDrawback('');
    };

    const handleAddMantle = () => {
        if (!newCourt.trim()) return;

        dispatch(addMantle({
            court: newCourt.trim(),
            level: newLevel,
            benefit: newBenefit.trim(),
            drawback: newDrawback.trim()
        }));

        resetFields(); // Reset fields after adding
    };

    const isConfirmDisabled = !newCourt.trim();
    // Show Cancel button if ANY field has content (or if level is not default 1)
    const isCancelVisible = newCourt.trim() || newBenefit.trim() || newDrawback.trim() || newLevel !== 1;

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
            <Text fw={500} size="md" c="dimmed">Add New Mantle</Text>
            
            <Group grow wrap="nowrap" gap="xs">
                <TextInput
                    value={newCourt}
                    onChange={(e) => setNewCourt(e.currentTarget.value)}
                    placeholder="Court Name"
                    label="Court"
                    size="sm"
                />
                <MeritInput
                    type="number"
                    label="Level"
                    placeholder="1-5"
                    min={0}
                    max={5}
                    value={newLevel}
                    onChange={setNewLevel}
                />
            </Group>
            <MeritInput
                type="textarea"
                label="Benefit"
                placeholder="Effect of the Mantle at this level..."
                value={newBenefit}
                onChange={setNewBenefit}
                rows={2}
            />
            <MeritInput
                type="textarea"
                label="Drawback"
                placeholder="Mantle's penalty/drawback..."
                value={newDrawback}
                onChange={setNewDrawback}
                rows={2}
            />
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
                    onClick={handleAddMantle}
                    disabled={isConfirmDisabled}
                >
                    Confirm Add
                </Button>
            </Flex>
        </Stack>
    );
};


// --- 3. Main Mantle Builder Section ---

export const MantleSelection: React.FC = () => {
    // NOTE: Assuming the state path is correct based on your root reducer structure
    const mantles = useAppSelector((state: RootState) => state.character.mantles);

    return (
        <Box>
            <Title order={3} mb="sm">MANTLE (Builder)</Title>
            
            <Stack gap="md" mb="md">
                {mantles.length === 0 && (
                    <Text c="dimmed" size="sm">No Mantles tracked.</Text>
                )}
                {/* Display existing Mantles */}
                {mantles.map((mantle: MantleItem) => (
                    <MantleBuilderRow key={mantle.id} mantle={mantle} />
                ))}
            </Stack>

            {/* Always display the Add Row at the bottom */}
            <MantleAddRow />
        </Box>
    );
};
