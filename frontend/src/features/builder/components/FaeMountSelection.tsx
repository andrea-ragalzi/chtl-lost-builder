import { Box, Title, ActionIcon, Button, Stack, Textarea, Group, Text, Flex } from '@mantine/core';
import { IconTrash, IconPlus, IconX } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../shared/hooks/hooks';
import type { RootState } from '../../../app/store';
import {
    addFaeMount,
    removeFaeMount,
    updateFaeMount,
    type FaeMountItem
} from '../../../shared/stores/faeMountSlice';

// --- Riga Singola Fae Mount Modificabile (Elementi Esistenti) ---

const FaeMountBuilderRow: React.FC<{ mount: FaeMountItem }> = ({ mount }) => {
    const dispatch = useAppDispatch();

    const handleUpdate = (value: string) => {
        dispatch(updateFaeMount({ id: mount.id, description: value }));
    };

    const handleRemove = () => {
        if (window.confirm("Sei sicuro di voler rimuovere questa Cavalcatura Fae?")) {
            dispatch(removeFaeMount(mount.id));
        }
    };

    // Usa la prima parte della descrizione come titolo per la riga
    const mountTitle = mount.description.substring(0, 40).trim() || 'Cavalcatura Fae';

    return (
        <Stack gap="xs" p="sm" style={{ border: '1px solid var(--mantine-color-gray-3)', borderRadius: '4px' }}>
            <Group justify="space-between" align="center">
                <Text fw={700} size="sm">{mountTitle}</Text>
                <ActionIcon
                    size="md"
                    variant="subtle"
                    color="red"
                    onClick={handleRemove}
                    title="Rimuovi Cavalcatura"
                >
                    <IconTrash size={20} />
                </ActionIcon>
            </Group>
            <Textarea
                placeholder="Descrizione, Statistiche e Abilità della Cavalcatura Fae..."
                value={mount.description}
                onChange={(e) => handleUpdate(e.currentTarget.value)}
                rows={3}
                label="Descrizione Completa"
            />
        </Stack>
    );
};

// --- Riga Aggiunta (Sempre Visibile) ---

const FaeMountAddRow: React.FC = () => {
    const dispatch = useAppDispatch();
    const [newDescription, setNewDescription] = useState('');

    const resetFields = () => {
        setNewDescription('');
    };

    const handleAddMount = () => {
        if (!newDescription.trim()) return;

        dispatch(addFaeMount({
            description: newDescription.trim()
        }));

        resetFields();
    };

    const isConfirmDisabled = !newDescription.trim();
    // Mostra Annulla solo se c'è testo da cancellare
    const isCancelVisible = newDescription.trim().length > 0;

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
            <Text fw={500} size="md" c="dimmed">Aggiungi Nuova Cavalcatura Fae</Text>

            <Textarea
                placeholder="Descrivi la Cavalcatura Fae che vuoi aggiungere..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.currentTarget.value)}
                rows={3}
                label="Descrizione"
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
                        Annulla
                    </Button>
                )}
                <Button
                    leftSection={<IconPlus size={16} />}
                    onClick={handleAddMount}
                    disabled={isConfirmDisabled}
                >
                    Conferma Aggiunta
                </Button>
            </Flex>
        </Stack>
    );
};


// --- Sezione Fae Mounts Principale (Contenitore) ---

export const FaeMountSelection: React.FC = () => {
    // Il path dello stato è stato corretto in base all'architettura a slice separati
    const mounts = useAppSelector((state: RootState) => state.character.faeMounts); 

    return (
        <Box>
            <Title order={3} mb="sm">FAE MOUNT</Title>
            <Stack gap="md" mb="md">
                {mounts.length === 0 && (
                    <Text c="dimmed" size="sm">Nessuna Cavalcatura Fae tracciata.</Text>
                )}
                {/* Visualizza le Cavalcature esistenti */}
                {mounts.map((mount: FaeMountItem) => (
                    <FaeMountBuilderRow key={mount.id} mount={mount} />
                ))}
            </Stack>

            {/* Visualizza sempre la riga di aggiunta in fondo */}
            <FaeMountAddRow />
        </Box>
    );
};