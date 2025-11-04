import { Stack, TextInput, ActionIcon, Group, Paper, Text, Button, Checkbox } from '@mantine/core';
import { IconPlus, IconTrash, IconEdit } from '@tabler/icons-react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { addCondition, toggleCondition, removeCondition, updateCondition } from '../../../shared/stores/conditionSlice';

export const ConditionsTrack = () => {
    const dispatch = useAppDispatch();
    const conditions = useAppSelector((state) => state.character.conditions.list);
    const [newCondition, setNewCondition] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editText, setEditText] = useState('');

    const handleAdd = () => {
        if (newCondition.trim()) {
            dispatch(addCondition({ name: newCondition.trim() }));
            setNewCondition('');
        }
    };

    const handleRemove = (id: string) => {
        dispatch(removeCondition({ id }));
    };

    const handleToggle = (id: string) => {
        dispatch(toggleCondition({ id }));
    };

    const handleEdit = (id: string, name: string) => {
        setEditingId(id);
        setEditText(name);
    };

    const handleSaveEdit = () => {
        if (editingId && editText.trim()) {
            dispatch(updateCondition({ id: editingId, name: editText.trim() }));
            setEditingId(null);
            setEditText('');
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditText('');
    };

    return (
        <Paper p="md" mb="md" withBorder>
            <Text fw={700} size="sm" mb="sm">Conditions</Text>

            <Stack gap="xs">
                {conditions.map((condition) => (
                    <Group key={condition.id} wrap="nowrap" justify="space-between">
                        {editingId === condition.id ? (
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
                                        checked={!condition.isActive}
                                        onChange={() => handleToggle(condition.id)}
                                    />
                                    <Text
                                        size="sm"
                                        style={{
                                            flex: 1,
                                            textDecoration: !condition.isActive ? 'line-through' : 'none',
                                            opacity: !condition.isActive ? 0.6 : 1
                                        }}
                                    >
                                        {condition.name}
                                    </Text>
                                </Group>
                                <Group gap="xs">
                                    <ActionIcon
                                        size="sm"
                                        variant="subtle"
                                        onClick={() => handleEdit(condition.id, condition.name)}
                                    >
                                        <IconEdit size={16} />
                                    </ActionIcon>
                                    <ActionIcon
                                        size="sm"
                                        variant="subtle"
                                        color="red"
                                        onClick={() => handleRemove(condition.id)}
                                    >
                                        <IconTrash size={16} />
                                    </ActionIcon>
                                </Group>
                            </>
                        )}
                    </Group>
                ))}
            </Stack>

            <Group mt="md" wrap="nowrap">
                <TextInput
                    placeholder="Add condition..."
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
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
        </Paper>
    );
};