import { Stack, TextInput, ActionIcon, Group, Text, Button, Fieldset } from '@mantine/core';
import { IconPlus, IconTrash, IconEdit } from '@tabler/icons-react';
import { useState } from 'react';

interface SimpleListProps {
    title: string;
    items: string[];
    onAdd?: (text: string) => void;
    onRemove?: (index: number) => void;
    onUpdate?: (index: number, text: string) => void;
}

export const SimpleList = ({ title, items, onAdd, onRemove, onUpdate }: SimpleListProps) => {
    const [newItem, setNewItem] = useState('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editText, setEditText] = useState('');

    const handleAdd = () => {
        if (newItem.trim() && onAdd) {
            onAdd(newItem.trim());
            setNewItem('');
        }
    };

    const handleEdit = (index: number) => {
        setEditingIndex(index);
        setEditText(items[index]);
    };

    const handleSaveEdit = () => {
        if (editingIndex !== null && editText.trim() && onUpdate) {
            onUpdate(editingIndex, editText.trim());
            setEditingIndex(null);
            setEditText('');
        }
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditText('');
    };

    const isReadOnly = !onAdd && !onRemove && !onUpdate;

    return (
        <Fieldset legend={title} mb="md">
            <Stack gap="xs">
                {items.length === 0 ? (
                    <Text c="dimmed" size="sm">No items.</Text>
                ) : (
                    items.map((item, index) => (
                        <Group key={index} wrap="nowrap" justify="space-between">
                            {editingIndex === index && onUpdate ? (
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
                                    <Text size="sm" style={{ flex: 1 }}>{item}</Text>
                                    {!isReadOnly && (
                                        <Group gap="xs">
                                            {onUpdate && (
                                                <ActionIcon
                                                    size="sm"
                                                    variant="subtle"
                                                    onClick={() => handleEdit(index)}
                                                >
                                                    <IconEdit size={16} />
                                                </ActionIcon>
                                            )}
                                            {onRemove && (
                                                <ActionIcon
                                                    size="sm"
                                                    variant="subtle"
                                                    color="red"
                                                    onClick={() => onRemove(index)}
                                                >
                                                    <IconTrash size={16} />
                                                </ActionIcon>
                                            )}
                                        </Group>
                                    )}
                                </>
                            )}
                        </Group>
                    ))
                )}
            </Stack>

            {onAdd && (
                <Group mt="md" wrap="nowrap">
                    <TextInput
                        placeholder={`Add ${title.toLowerCase()}...`}
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
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
            )}
        </Fieldset>
    );
};
