import { Box, Title, Group, Stack, TextInput, ActionIcon, Button, Flex, Text } from '@mantine/core';
import { IconTrash, IconPlus, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import type { RootState } from '../../../app/store';
import { MeritInput } from './MeritInput';
import {
    addHollow,
    removeHollow,
    updateHollow,
    type HollowItem
} from '../../../shared/stores/hollowSlice';

// --- Riga Singola Hollow Modificabile (Elementi Esistenti) ---

const HollowBuilderRow: React.FC<{ hollow: HollowItem }> = ({ hollow }) => {
    const dispatch = useAppDispatch();

    const handleUpdate = <K extends keyof HollowItem>(field: K, value: HollowItem[K]) => {
        dispatch(updateHollow({ id: hollow.id, [field]: value }));
    };

    const handleRemove = () => {
        if (window.confirm(`Sei sicuro di voler rimuovere questo Rifugio (${hollow.size || 'Senza Dimensione'})?`)) {
            dispatch(removeHollow(hollow.id));
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
                    title="Rimuovi Rifugio"
                >
                    <IconTrash size={20} />
                </ActionIcon>
            </Group>
            
            <Group grow wrap="nowrap" gap="xs">
                <MeritInput
                    type="number"
                    label="Sicurezza"
                    placeholder="0-5 Punti"
                    min={0}
                    max={5}
                    value={hollow.security}
                    onChange={(value) => handleUpdate('security', value)}
                />
                <TextInput
                    value={hollow.size}
                    onChange={(e) => handleUpdate('size', e.currentTarget.value)}
                    placeholder="Dimensione (es. Tana, Palazzo)"
                    label="Dimensione"
                    size="sm"
                />
            </Group>
            <MeritInput
                type="textarea"
                label="Descrizione / Poteri"
                placeholder="Dettagli del rifugio e poteri speciali..."
                value={hollow.description}
                onChange={(value) => handleUpdate('description', value)}
                rows={3}
            />
        </Stack>
    );
};


// --- Riga Aggiunta (Sempre Visibile) ---

const HollowAddRow: React.FC = () => {
    const dispatch = useAppDispatch();
    
    // State for the new item being entered
    const [newSize, setNewSize] = useState('');
    const [newSecurity, setNewSecurity] = useState<number>(1);
    const [newDescription, setNewDescription] = useState('');

    const resetFields = () => {
        setNewSize('');
        setNewSecurity(1); // Reset al default
        setNewDescription('');
    };

    const handleAddHollow = () => {
        if (!newSize.trim()) return;

        dispatch(addHollow({
            security: newSecurity,
            size: newSize.trim(),
            description: newDescription.trim()
        }));
        
        resetFields();
    };

    const isConfirmDisabled = !newSize.trim();
    // Mostra Annulla se almeno un campo (che non sia il default) è stato modificato
    const isCancelVisible = newSize.trim() || newDescription.trim() || newSecurity !== 1;

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
            <Text fw={500} size="md" c="dimmed">Aggiungi Nuovo Rifugio</Text>
            
            <Group grow wrap="nowrap" gap="xs">
                <MeritInput
                    type="number"
                    label="Sicurezza"
                    placeholder="0-5 Punti"
                    min={0}
                    max={5}
                    value={newSecurity}
                    onChange={setNewSecurity}
                />
                <TextInput
                    value={newSize}
                    onChange={(e) => setNewSize(e.currentTarget.value)}
                    placeholder="Dimensione (es. Tana, Palazzo)"
                    label="Dimensione"
                    size="sm"
                />
            </Group>
            <MeritInput
                type="textarea"
                label="Descrizione / Poteri"
                placeholder="Dettagli del rifugio e poteri speciali..."
                value={newDescription}
                onChange={setNewDescription}
                rows={3}
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
                    onClick={handleAddHollow}
                    disabled={isConfirmDisabled}
                >
                    Conferma Aggiunta
                </Button>
            </Flex>
        </Stack>
    );
};


// --- Sezione Hollows Principale (Contenitore) ---

export const HollowSelection: React.FC = () => {
    // Nota: Ho corretto il path dello stato assumendo l'architettura a slice separati come in FaeMount
    const hollows = useAppSelector((state: RootState) => state.character.hollows);
    
    return (
        <Box>
            <Title order={3} mb="sm">HOLLOW</Title>
            <Stack gap="md" mb="md">
                {hollows.length === 0 && (
                    <Text c="dimmed" size="sm">No Hollow tracked.</Text>
                )}
                {/* Visualizza i Rifugi esistenti */}
                {hollows.map((hollow: HollowItem) => (
                    <HollowBuilderRow key={hollow.id} hollow={hollow} />
                ))}
            </Stack>
            
            {/* Visualizza sempre la riga di aggiunta in fondo */}
            <HollowAddRow />
        </Box>
    );
};