import { Box, Title, Group, Text, ActionIcon, Stack, Checkbox, TextInput } from '@mantine/core';
import { IconCirclePlus, IconTrash } from '@tabler/icons-react';
// Assumi che i tuoi hooks includano la definizione corretta di RootState
import { useAppSelector, useAppDispatch } from '../../../shared/hooks/hooks';
import {
    addDebt,
    removeDebt,
    toggleDebtRepaid,
    updateDebtDescription,
    type GoblinDebtItem
} from '../../../shared/stores/goblinDebtSlice';
import React from 'react';
import type { RootState } from '../../../app/store';
import { loseClarity } from '../../../shared/stores/claritySlice';

// Componente per una singola riga di Debito (Non richiede modifiche)
const DebtRow: React.FC<{ debt: GoblinDebtItem }> = ({ debt }) => {
    const dispatch = useAppDispatch();
    const allDebts = useAppSelector((state: RootState) => state.character.goblinDebt.debts);

    const handleRemove = () => {
        // Regola 1: Non si può archiviare un debito che non è ancora ripagato.
        if (!debt.isRepaid) {
             alert("Non puoi archiviare un debito ATTTIVO. Segnalo come 'Ripagato' (spunta) prima di rimuoverlo.");
             return;
        }

        if (window.confirm("Sei sicuro di voler archiviare questo Debito?")) {
            
            // 1. Calcola i debiti attivi che *rimarrebbero*
            // Filtriamo quelli NON ripagati E che NON sono quello corrente.
            const remainingActiveDebts = allDebts.filter(d => !d.isRepaid && d.id !== debt.id);

            // 2. LOGICA CHIAREZZA: Se questo era l'ultimo debito attivo...
            if (remainingActiveDebts.length === 0) {
                dispatch(loseClarity());
                console.warn("Clarity lost due to final Goblin Debt repayment.");
            }
            
            // 3. Rimuovi il debito (Archiviazione)
            dispatch(removeDebt(debt.id));
        }
    };

    const handleToggle = () => {
        dispatch(toggleDebtRepaid(debt.id));
        // Aggiungere qui la logica di perdita di Chiarezza se necessario.
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateDebtDescription({ id: debt.id, description: e.target.value }));
    };

    return (
        <Group wrap="nowrap" gap="xs" style={{ width: '100%', alignItems: 'center' }}>
            {/* Casella di Spunta (indica se è stato ripagato) */}
            <Checkbox
                checked={debt.isRepaid}
                onChange={handleToggle}
                color="red"
                size="md"
                aria-label="Mark as Repaid"
            />

            {/* Campo di testo per la Descrizione */}
            <TextInput
                value={debt.description}
                onChange={handleDescriptionChange}
                placeholder="Details of the obligation..."
                style={{ flexGrow: 1 }}
                size="sm"
                variant="filled"
                // Aggiungi stile per mostrare lo stato "Ripagato"
                styles={{ input: { textDecoration: debt.isRepaid ? 'line-through' : 'none', opacity: debt.isRepaid ? 0.6 : 1 } }}
            />

            {/* Pulsante Rimuovi (Archiviazione) */}
            <ActionIcon
                size="sm"
                variant="subtle"
                color="red"
                onClick={handleRemove}
                title="Permanently remove debt (GM use)"
            >
                <IconTrash size={16} />
            </ActionIcon>
        </Group>
    );
};


export const GoblinDebtTrack = () => {
    const dispatch = useAppDispatch();

    // --- CORREZIONE QUI ---
    // Usiamo RootState e assumiamo il percorso corretto per i Debiti Goblin
    const allDebts = useAppSelector((state: RootState) => state.character.goblinDebt.debts);
    // -----------------------

    // Il tipo di 'allDebts' ora è GoblinDebtItem[], quindi possiamo mappare e filtrare con sicurezza.
    const activeDebtsCount = allDebts.filter(d => !d.isRepaid).length;

    const handleAddDebt = () => {
        dispatch(addDebt()); // Aggiunge un debito con testo di default
    };

    return (
        <Box>
            <Title order={3} mb="md">Goblin Debts</Title>

            <Group justify="space-between" mb="sm">
                <Text fw={700}>Active Debts: {activeDebtsCount}</Text>

                {/* Pulsante per aggiungere Debito manualmente */}
                <ActionIcon
                    size="lg"
                    color="red"
                    variant="light"
                    onClick={handleAddDebt}
                    title="Add new Goblin Debt manually"
                >
                    <IconCirclePlus size={24} />
                </ActionIcon>
            </Group>

            {/* Lista dei Debiti */}
            <Stack gap="xs">
                {allDebts.length === 0 ? (
                    <Text c="dimmed" size="sm">No Goblin Debts currently owed.</Text>
                ) : (
                    allDebts.map(debt => (
                        <DebtRow key={debt.id} debt={debt} />
                    ))
                )}
            </Stack>

            {/* Promemoria Regola Chiarezza */}
            <Text size="xs" c="red" mt="md" style={{ fontStyle: 'italic' }}>
                *REMINDER: If active debts count drops from 1 to 0, the character loses 1 point of Clarity.
            </Text>
        </Box>
    );
};