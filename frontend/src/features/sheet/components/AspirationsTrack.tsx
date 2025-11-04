import { Stack, TextInput, ActionIcon, Group, Paper, Text, Button, Badge, Select } from '@mantine/core';
import { IconPlus, IconTrash, IconEdit } from '@tabler/icons-react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { addAspiration, removeAspiration, updateAspiration, type AspirationsDuration } from '../../../shared/stores/aspirationsSlice';

const DURATION_COLORS: Record<AspirationsDuration, string> = {
    short: 'green',
    medium: 'yellow',
    long: 'red'
};

const DURATION_LABELS: Record<AspirationsDuration, string> = {
    short: 'Short',
    medium: 'Medium',
    long: 'Long'
};

export const AspirationsTrack = () => {
    const dispatch = useAppDispatch();
    const aspirations = useAppSelector((state) => state.character.aspirations.list);
    const [newDescription, setNewDescription] = useState('');
    const [newDuration, setNewDuration] = useState<AspirationsDuration>('short');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editText, setEditText] = useState('');
    const [editDuration, setEditDuration] = useState<AspirationsDuration>('short');

    const handleAdd = () => {
        if (newDescription.trim()) {
            dispatch(addAspiration({
                description: newDescription.trim(),
                duration: newDuration
            }));
            setNewDescription('');
            setNewDuration('short');
        }
    };

    const handleRemove = (id: string) => {
        dispatch(removeAspiration(id));
    };

    const handleEdit = (id: string, description: string, duration: AspirationsDuration) => {
        setEditingId(id);
        setEditText(description);
        setEditDuration(duration);
    };

    const handleSaveEdit = () => {
        if (editingId && editText.trim()) {
            dispatch(updateAspiration({
                id: editingId,
                description: editText.trim(),
                duration: editDuration
            }));
            setEditingId(null);
            setEditText('');
            setEditDuration('short');
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditText('');
        setEditDuration('short');
    };

    return (
        <Paper p="md" mb="md" withBorder>
            <Text fw={700} size="sm" mb="sm">Aspirations</Text>

            <Stack gap="xs">
                {aspirations.length === 0 ? (
                    <Text c="dimmed" size="sm">No aspirations set.</Text>
                ) : (
                    aspirations.map((aspiration) => (
                        <Group key={aspiration.id} wrap="nowrap" justify="space-between" align="center">
                            {editingId === aspiration.id ? (
                                <>
                                    <Select
                                        value={editDuration}
                                        onChange={(value) => setEditDuration(value as AspirationsDuration)}
                                        data={[
                                            { value: 'short', label: 'Short' },
                                            { value: 'medium', label: 'Medium' },
                                            { value: 'long', label: 'Long' }
                                        ]}
                                        style={{ width: '100px' }}
                                        size="sm"
                                    />
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
                                    <Badge
                                        color={DURATION_COLORS[aspiration.duration]}
                                        size="sm"
                                        style={{ minWidth: '60px' }}
                                    >
                                        {DURATION_LABELS[aspiration.duration]}
                                    </Badge>
                                    <Text size="sm" style={{ flex: 1 }}>
                                        {aspiration.description}
                                    </Text>
                                    <Group gap="xs">
                                        <ActionIcon
                                            size="sm"
                                            variant="subtle"
                                            onClick={() => handleEdit(aspiration.id, aspiration.description, aspiration.duration)}
                                        >
                                            <IconEdit size={16} />
                                        </ActionIcon>
                                        <ActionIcon
                                            size="sm"
                                            variant="subtle"
                                            color="red"
                                            onClick={() => handleRemove(aspiration.id)}
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

            <Group mt="md" wrap="nowrap" align="flex-end">
                <Select
                    label="Duration"
                    value={newDuration}
                    onChange={(value) => setNewDuration(value as AspirationsDuration)}
                    data={[
                        { value: 'short', label: 'Short' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'long', label: 'Long' }
                    ]}
                    style={{ width: '120px' }}
                    size="sm"
                />
                <TextInput
                    label="Description"
                    placeholder="Add aspiration..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAdd();
                    }}
                    style={{ flex: 1 }}
                    size="sm"
                />
                <ActionIcon onClick={handleAdd} variant="filled" size="lg" style={{ marginBottom: '2px' }}>
                    <IconPlus size={18} />
                </ActionIcon>
            </Group>
        </Paper>
    );
};