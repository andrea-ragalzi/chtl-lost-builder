import { Box, Title, Group, Text, ActionIcon, Stack, TextInput, Flex } from '@mantine/core';
import { IconTrash, IconPlus } from '@tabler/icons-react';
import { useAppSelector, useAppDispatch } from '../../../shared/hooks/hooks';
import {
    addPledge,
    removePledge,
    updatePledge,
    type PledgeItem
} from '../../../shared/stores/pledgeSlice';
import React, { useState } from 'react';
import type { RootState } from '../../../app/store'; // Assumi questo path per RootState

// Componente per una singola riga di Pledge
const PledgeRow: React.FC<{ pledge: PledgeItem }> = ({ pledge }) => {
    const dispatch = useAppDispatch();

    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updatePledge({ id: pledge.id, type: e.target.value }));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updatePledge({ id: pledge.id, description: e.target.value }));
    };

    const handleRemove = () => {
        if (window.confirm("Sei sicuro di voler rimuovere questo Pegno? (Rimosso/Speso/Rotto)")) {
            dispatch(removePledge(pledge.id));
        }
    };

    return (
        <Group wrap="nowrap" gap="xs" style={{ width: '100%', alignItems: 'center' }}>
            {/* Campo TYPE */}
            <TextInput
                value={pledge.type}
                onChange={handleTypeChange}
                placeholder="Tipo"
                style={{ width: '20%' }}
                size="sm"
                variant="filled"
            />

            {/* Campo NOTES / DESCRIPTION */}
            <TextInput
                value={pledge.description}
                onChange={handleDescriptionChange}
                placeholder="Dettagli del Patto..."
                style={{ flexGrow: 1 }}
                size="sm"
                variant="filled"
            />

            {/* Pulsante Rimuovi */}
            <ActionIcon
                size="sm"
                variant="subtle"
                color="red"
                onClick={handleRemove}
                title="Rimuovi Pegno (Speso o Adempiuto)"
            >
                <IconTrash size={16} />
            </ActionIcon>
        </Group>
    );
};


export const PledgeTrack: React.FC = () => {
    const dispatch = useAppDispatch();
    // **ATTENZIONE:** Modifica il path dello state se necessario (es. state.character.pledges.list)
    const allPledges = useAppSelector((state: RootState) => state.character.pledges.list);

    // Stato locale per l'aggiunta rapida
    const [newType, setNewType] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const handleAddPledge = () => {
        if (!newDescription.trim()) {
            alert("La descrizione del Pegno non può essere vuota.");
            return;
        }
        dispatch(addPledge({
            type: newType.trim() || 'Servizio',
            description: newDescription.trim()
        }));
        // Resetta i campi
        setNewType('');
        setNewDescription('');
    };

    return (
        <Box>
            <Title order={3} mb="md" style={{ borderBottom: '2px solid green', paddingBottom: '4px' }}>
                Pledges ({allPledges.length})
            </Title>

            {/* Intestazioni */}
            <Group wrap="nowrap" gap="xs" mb="xs" style={{ width: '100%', paddingRight: '36px' }}>
                <Text fw={700} style={{ width: '20%' }}>TYPE</Text>
                <Text fw={700} style={{ flexGrow: 1 }}>NOTES</Text>
            </Group>

            {/* Lista dei Pegni Attivi */}
            <Stack gap="xs">
                {allPledges.length === 0 ? (
                    <Text c="dimmed" size="sm">Nessun Pegno Attivo (Pledge Point: 0)</Text>
                ) : (
                    allPledges.map(pledge => (
                        <PledgeRow key={pledge.id} pledge={pledge} />
                    ))
                )}
            </Stack>

            {/* Campo di Aggiunta Rapida (sotto la lista) */}
            <Flex gap="xs" mt="md" align="center" style={{ width: '100%' }}>
                <TextInput
                    value={newType}
                    onChange={(e) => setNewType(e.currentTarget.value)}
                    placeholder="Tipo (es. Favor)"
                    style={{ width: '20%' }}
                    size="sm"
                />
                <TextInput
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.currentTarget.value)}
                    placeholder="Aggiungi un nuovo Pledge / Dettagli del Patto..."
                    style={{ flexGrow: 1 }}
                    size="sm"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddPledge();
                    }}
                />
                <ActionIcon
                    size="lg"
                    color="green"
                    variant="filled"
                    onClick={handleAddPledge}
                    title="Aggiungi Pledge"
                >
                    <IconPlus size={24} />
                </ActionIcon>
            </Flex>
        </Box>
    );
};