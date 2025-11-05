import { Stack, TextInput, ActionIcon, Group, Text, Button, Checkbox, Fieldset } from '@mantine/core';
import { IconPlus, IconTrash, IconEdit } from '@tabler/icons-react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import {
    addDebt,
    removeDebt,
    toggleDebtRepaid,
    updateDebtDescription,
} from '../../../shared/stores/goblinDebtSlice';
import { loseClarity } from '../../../shared/stores/claritySlice';
import type { RootState } from '../../../app/store';

export const GoblinDebtTrack = () => {
    const dispatch = useAppDispatch();
    const allDebts = useAppSelector((state: RootState) => state.character.goblinDebt.debts);
    const [newDebt, setNewDebt] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editText, setEditText] = useState('');

    const handleAdd = () => {
        if (newDebt.trim()) {
            dispatch(addDebt(newDebt.trim()));
            setNewDebt('');
        }
    };

    const handleRemove = (id: string, isRepaid: boolean) => {
        if (!isRepaid) {
            alert("Non puoi archiviare un debito ATTIVO. Segnalo come 'Ripagato' (spunta) prima di rimuoverlo.");
            return;
        }

        if (window.confirm("Sei sicuro di voler archiviare questo Debito?")) {
            const remainingActiveDebts = allDebts.filter(d => !d.isRepaid && d.id !== id);

            if (remainingActiveDebts.length === 0) {
                dispatch(loseClarity());
                console.warn("Clarity lost due to final Goblin Debt repayment.");
            }

            dispatch(removeDebt(id));
        }
    };

    const handleToggle = (id: string) => {
        dispatch(toggleDebtRepaid(id));
    };

    const handleEdit = (id: string, description: string) => {
        setEditingId(id);
        setEditText(description);
    };

    const handleSaveEdit = () => {
        if (editingId && editText.trim()) {
            dispatch(updateDebtDescription({ id: editingId, description: editText.trim() }));
            setEditingId(null);
            setEditText('');
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditText('');
    };

    return (
        <Fieldset legend="Goblin Debts" mb="md" style={{ overflow: 'hidden' }}>


            <Stack gap="xs">
                {allDebts.length === 0 ? (
                    <Text c="dimmed" size="sm">No Goblin Debts currently owed.</Text>
                ) : (
                    allDebts.map((debt) => (
                        <Group key={debt.id} wrap="nowrap" justify="space-between">
                            {editingId === debt.id ? (
                                <>
                                    <TextInput
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        style={{ flex: 1 }}
                                        size="sm"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSaveEdit();
                                            if (e.key === 'Escape') handleCancelEdit();
                                        }}
                                    />
                                    <Group gap="xs">
                                        <Button size="xs" onClick={handleSaveEdit}>Save</Button>
                                        <Button size="xs" variant="subtle" onClick={handleCancelEdit}>Cancel</Button>
                                    </Group>
                                </>
                            ) : (
                                <>
                                    <Group gap="xs" style={{ flex: 1 }} wrap="nowrap">
                                        <Checkbox
                                            checked={debt.isRepaid}
                                            onChange={() => handleToggle(debt.id)}
                                        />
                                        <Text
                                            size="sm"
                                            style={{
                                                flex: 1,
                                                textDecoration: debt.isRepaid ? 'line-through' : 'none',
                                                opacity: debt.isRepaid ? 0.6 : 1
                                            }}
                                        >
                                            {debt.description}
                                        </Text>
                                    </Group>
                                    <Group gap="xs">
                                        <ActionIcon
                                            size="sm"
                                            variant="subtle"
                                            onClick={() => handleEdit(debt.id, debt.description)}
                                        >
                                            <IconEdit size={16} />
                                        </ActionIcon>
                                        <ActionIcon
                                            size="sm"
                                            variant="subtle"
                                            color="red"
                                            onClick={() => handleRemove(debt.id, debt.isRepaid)}
                                        >
                                            <IconTrash size={16} />
                                        </ActionIcon>
                                    </Group>
                                </>
                            )}
                        </Group>
                    ))
                )}
            </Stack>

            <Group mt="md" wrap="nowrap">
                <TextInput
                    placeholder="Add goblin debt..."
                    value={newDebt}
                    onChange={(e) => setNewDebt(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAdd();
                    }}
                    style={{ flex: 1 }}
                    size="sm"
                />
                <ActionIcon onClick={handleAdd} variant="filled" size="lg">
                    <IconPlus size={18} />
                </ActionIcon>
            </Group>

            <Text size="xs" c="dimmed" mt="md" style={{ fontStyle: 'italic' }}>
                *Reminder: If active debts drop from 1 to 0, the character loses 1 point of Clarity.
            </Text>
        </Fieldset>
    );
};