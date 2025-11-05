import { Stack, TextInput, ActionIcon, Group, Text, Button, Fieldset } from '@mantine/core';
import { IconPlus, IconTrash, IconEdit } from '@tabler/icons-react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/hooks';
import { addPledge, removePledge, updatePledge } from '../../../shared/stores/pledgeSlice';

export const PledgeTrack = () => {
    const dispatch = useAppDispatch();
    const pledges = useAppSelector((state) => state.character.pledges.list);
    const [newType, setNewType] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editType, setEditType] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const handleAdd = () => {
        if (newDescription.trim()) {
            dispatch(addPledge({
                type: newType.trim() || 'Service',
                description: newDescription.trim()
            }));
            setNewType('');
            setNewDescription('');
        }
    };

    const handleRemove = (id: string) => {
        dispatch(removePledge(id));
    };

    const handleEdit = (id: string, type: string, description: string) => {
        setEditingId(id);
        setEditType(type);
        setEditDescription(description);
    };

    const handleSaveEdit = () => {
        if (editingId && editDescription.trim()) {
            dispatch(updatePledge({
                id: editingId,
                type: editType.trim(),
                description: editDescription.trim()
            }));
            setEditingId(null);
            setEditType('');
            setEditDescription('');
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditType('');
        setEditDescription('');
    };

    return (
        <Fieldset legend="Pledges" mb="md" style={{ overflow: 'hidden' }}>
            <Group wrap="nowrap" gap="xs" mb="xs">
                <Text fw={700} size="xs" style={{ width: '25%' }}>TYPE</Text>
                <Text fw={700} size="xs" style={{ flex: 1 }}>DESCRIPTION</Text>
            </Group>

            <Stack gap="xs">
                {pledges.map((pledge) => (
                    <Group key={pledge.id} wrap="nowrap" gap="xs">
                        {editingId === pledge.id ? (
                            <>
                                <TextInput
                                    value={editType}
                                    onChange={(e) => setEditType(e.target.value)}
                                    placeholder="Type"
                                    style={{ width: '25%' }}
                                    size="sm"
                                />
                                <TextInput
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
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
                                <Text size="sm" style={{ width: '25%' }}>{pledge.type}</Text>
                                <Text size="sm" style={{ flex: 1 }}>{pledge.description}</Text>
                                <Group gap="xs">
                                    <ActionIcon
                                        size="sm"
                                        variant="subtle"
                                        onClick={() => handleEdit(pledge.id, pledge.type, pledge.description)}
                                    >
                                        <IconEdit size={16} />
                                    </ActionIcon>
                                    <ActionIcon
                                        size="sm"
                                        variant="subtle"
                                        color="red"
                                        onClick={() => handleRemove(pledge.id)}
                                    >
                                        <IconTrash size={16} />
                                    </ActionIcon>
                                </Group>
                            </>
                        )}
                    </Group>
                ))}
            </Stack>

            <Group mt="md" wrap="nowrap" gap="xs">
                <TextInput
                    placeholder="Type..."
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    style={{ width: '25%' }}
                    size="sm"
                />
                <TextInput
                    placeholder="Add pledge description..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
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
        </Fieldset>
    );
};